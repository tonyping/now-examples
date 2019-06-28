// Dependencies
import Router from 'next/router'
import { setCookie } from 'nookies'
import { useEffect } from 'react'

Login.getInitialProps = async ctx => {
  const options = {
    maxAge: 30 * 24 * 60 * 60,
    path: '/'
  }

  if (ctx.query.id) {
    await setCookie(ctx, 'id', ctx.query.id, options)
    await setCookie(ctx, 'login', ctx.query.login, options)
    await setCookie(ctx, 'token', ctx.query.token, options)
  } 

  return {}
}

function Login() {
  useEffect(() => {
    Router.push('/')
  }, [])

  return null
}

export default Login