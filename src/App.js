import './App.css'
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

import React from 'react'
import { Router, browserHistory } from 'react-router'
import routes from './routes'


let App = React.createClass({
  render() {
    return <Router routes={routes} history={browserHistory} />
  }
})

export default App
