// Dependencies
import { useEffect, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Cookies from 'js-cookie'

// Components
import Header from '../components/Header'
import Signature from '../components/Signature'
import SignatureSkeleton from '../components/SignatureSkeleton'

// Create Home Page Functional Component
function Home({ router }) {
  // Define State
  const [signatures, setSignatures] = useState(null)
  const [signatureSubmitted, setSignatureSubmitted] = useState({})
  const [pageCount, setPageCount] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [authInfo, setAuthInfo] = useState({})

  // Find existing signature if `id` exists and set default limits
  const existing = signatures ? signatures.find(s => s.id == authInfo.id) : null
  const page = parseInt(router.query.page) || 1
  const limit = parseInt(router.query.limit) || 5

  // Set params for both previous and next pages
  const previousParams = {
    ...(router.query.limit && { limit: router.query.limit }),
    ...((page - 1 >= 1 && { page: page - 1}) || (page - 1 === 1 && null))
  }

  const nextParams = {
    ...(router.query.limit && { limit: router.query.limit }),
    ...(page + 1 <= pageCount && { page: page + 1})
  }


  // Build parameters for next and previous pages
  const esc = encodeURIComponent
  const buildParams = (params) => Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&')

  const nextPageLink = `/?${buildParams(nextParams)}`
  const previousPageLink = `/?${buildParams(previousParams)}`

  // When the page loads or the `page` variable changes
  useEffect(() => {
    // Set auth information in state based on cookies
    const token = Cookies.get('token')
    const login = Cookies.get('login')
    const id = Cookies.get('id')

    setAuthInfo({token, login, id})

    // Fetch signatures from the API and set them in state
    async function fetchData() {
      const response = await fetch(
        `/api/guestbook/list.js?page=${page}&limit=${limit}`
      )

      const { guestbook, pageCount } = await response.json()

      setSignatures([...guestbook])
      setPageCount(pageCount)
      setLoaded(true)
    }

    fetchData()

    // If the page query is larger than the available page count, get the maximum page available
    if (router.query.page > pageCount) {
      router.replace({pathname: router.pathname, query: Object.assign({}, router.query, {page: pageCount})}, { shallow: true})
    }
  }, [page])

  // Handle the submit event, sending a `PATCH` method to the `/sign.js` API endpoint to handle submitting to the database.
  const handleSubmit = async e => {
    e.preventDefault()
    let signature = e.target.signature.value
    e.target.signature.value = ''

    const res = await fetch(`/api/guestbook/sign.js`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        signature,
        id: authInfo.id,
        user: authInfo.login
      })
    })

    if (res.status === 200) {
      setSignatureSubmitted({status: true})

      if (existing) {
        const updatedSignatures = signatures.map(s => {
          if (s.id === existing.id) s.signature = signature
          return s
        })

        setSignatures(updatedSignatures)
      } else {
        const newSignature = await res.json()
        const updatedSignatures = [newSignature, ...signatures.slice(0, 4)]
        setSignatures(updatedSignatures)
      }
    } else {
      setSignatureSubmitted({status: false, message: res.message})
    }
  }

  // Handle the delete event, sending a `DELETE` method to the `/api/guestbook/delete.js` API endpoint
  const handleDelete = async () => {
    const res = await fetch(
      `/api/guestbook/delete.js?id=${authInfo.id}&page=${page}&limit=${limit}`,
      {
        method: 'DELETE'
      }
    )

    if (res.status === 200) {
      const data = await res.json()
      setSignatures([...data.guestbook])
    }
  }


  // Return the UI to render
  return (
    <>
      <Head>
        <title>GitHub Guestbook</title>
        <link
          rel="stylesheet"
          href="https://css.zeit.sh/v1.css"
          type="text/css"
        />
      </Head>
      <Header authInfo={authInfo} />
      {authInfo.token && (
        <>
          <h3>
            Hello, {authInfo.login},{' '}
            {!!existing
              ? 'want to update your signature?'
              : 'want to sign the guestbook?'}
          </h3>
          <form onSubmit={handleSubmit}>
            <input id="signature" name="signature" />
            <button type="submit">Sign</button>
          </form>
          <span>{ signatureSubmitted && (signatureSubmitted.status === true ? '' : signatureSubmitted.message) }</span>
        </>
      )}
      <h2>Signatures</h2>
      <div className="signatures-list">
        { loaded }
        { loaded && signatures ? <>{ signatures.length ? signatures.map(g => (
          <Signature
            id={g.id}
            loggedInId={authInfo.id}
            signature={g.signature}
            user={g.user}
            updated={g.updated}
            key={g.id}
            handleDelete={handleDelete}
            />
        )) : "No signatures, why not sign above?"}</> : <SignatureSkeleton /> }
      </div>

      <nav>
        {previousParams.page && (
          <Link prefetch href={previousPageLink}>
            <a>Previous</a>
          </Link>
        )}
        {nextParams.page && (
          <Link prefetch href={nextPageLink}>
            <a className="next">Next</a>
          </Link>
        )}
      </nav>

      {/*
        Provide Styling for the Home page
      */}
      <style jsx>{`
        .signatures-list {
          margin-left: 0;
        }

        ul li::before {
          content: '';
        }

        form {
          display: flex;
          width: 100%;
        }

        input {
          flex-grow: 100;
          margin-right: 20px;
        }

        nav {
          display: flex;
          justify-content: space-between;
        }

        .next {
          margin-left: auto;
        }
      `}</style>
    </>
  )
}

// Export the Home page component using the HOC `withRouter` from Next.js
// More information on `withRouter`: https://nextjs.org/docs#using-a-higher-order-component
export default withRouter(Home)
