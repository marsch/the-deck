module.exports = {
  type: 'react-app',
  webpack: {
    define: {
      __APP_CLIENT_ID__: `${process.env.APP_CLIENT_ID}`
    }
  }

}
