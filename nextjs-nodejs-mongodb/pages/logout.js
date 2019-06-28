// Dependencies
import Router from 'next/router'
import { destroyCookie } from 'nookies'
import { useEffect } from 'react'

Logout.getInitialProps = async ctx => {
  destroyCookie(ctx, 'token')
  destroyCookie(ctx, 'id')
  destroyCookie(ctx, 'login')

  return {}
}

function Logout() {
  useEffect(() => {
    Router.push('/')
  }, [])

  return null
}

export default Logout