var conf = {
  type: 'react-app',
  webpack: {
    extra: {
      module: {
        loaders: [
          {
            test: /config.js$/,
            loader: 'string-replace',
            query: {
              search: '__APP_CLIENT_ID__',
              replace: process.env.APP_CLIENT_ID
            }
          }
        ]
      }
    }
  }
}

console.log('confg', conf)

module.exports = conf
