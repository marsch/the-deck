
const config = {
  AUTH: {
    CLIENT_ID: "__APP_CLIENT_ID__",
    ENDPOINT: 'https://passport.thegrid.io/api',
    LOGIN_ENDPOINT: 'https://passport.thegrid.io/login/authorize',
    LOGIN_EMAIL_ENDPOINT: 'https://passport.thegrid.io/api/auth/login',
    TOKEN_ENDPOINT: 'https://passport.thegrid.io/login/authorize/token'
  },
  API: {
    ENDPOINT: 'https://api.thegrid.io'
  },
  PASSPORT: {
    BASE: 'https://passport.thegrid.io',
    LOGOUT: 'account/logout',
    TOKEN: 'api/auth/token'
  }
}

export default config
