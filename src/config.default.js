const config = {
  AUTH: {
    CLIENT_ID: ' YOUR CLIENT ID HERE ',
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
