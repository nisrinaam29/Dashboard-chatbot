import nookies from "nookies"

export const setToken = (token) => {
    nookies.set(null, 'token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        // httpOnly: true
      })
}
