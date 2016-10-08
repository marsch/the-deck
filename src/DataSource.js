import React from 'react'
import superagent from 'superagent'
import superagentOauth from '@zalando/superagent-oauth2-client'
import omit from 'lodash.omit'
const OAuth = require('@zalando/oauth2-client-js')

const provider = function(config) {
  return new OAuth.Provider({
    id: 'grid-passport',
    authorization_url: config.AUTH.LOGIN_ENDPOINT
  })
}

const oauthConfig = function(config) {
  return {
    redirect_uri: `${window.location.origin}/success?originPath=${window.location.pathname}`,
    client_id: config.AUTH.CLIENT_ID,
    scope: ['content_management', 'website_management', 'share', 'update_profile'].join(',')
  }
}


class DataSource extends React.Component {
  constructor(...args) {
    super(...args)
    console.log('DataSource Props: ', this.props)
    this.provider = provider(this.props.config)
    this.oauthConfig = oauthConfig(this.props.config)
    this.state = {
      loading: true,
      result: [],
      path: this.props.path
    }

    if(location.pathname === '/success') {
      this.provider.parse(window.location.hash.substr(1));
    }

    this.query = this.query.bind(this)

    this.fetchState()
  }

  componentWillReceiveProps(nextProps) {
    console.log('receiving props', nextProps.path, this.props.path)
    if(this.props.path !== nextProps.path) {
      this.setState({
        path: nextProps.path,
        loading: true,
        result: []
      }, () => {
        this.fetchState()
      })

    }
  }

  fetchState() {
    if(this.state.path && this.state.path.length > 0) {
      this.get(this.state.path)
    }
  }

  getApi() {
    return superagentOauth(superagent)
  }

  get(path) {
    console.log("fetching", path)
    this.query(path)
        .then((response) => {
          console.log(response)
          const nstate = {
            totalCount: 1,
            loading: false,
            result: response.body
          }
          if(typeof response.body == 'array') {
            nstate.totalCount = response.body.length
          }
          if(response.header['x-total-count']) {
            nstate.totalCount = response.header['x-total-count']
          }
          this.setState(nstate)
        })
        .catch(console.log)
  }

  query(path) {
    const request = this.getApi()
    return request
        .get(this.props.config.API.ENDPOINT + path)
        .oauth(this.provider, this.oauthConfig)
        .exec()
  }

  getChildContext() {
    return {result: this.state, apiGet: this.query}
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

DataSource.childContextTypes = {
  result: React.PropTypes.object,
  apiGet: React.PropTypes.any
}

export default DataSource
