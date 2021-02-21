import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

import './index.css'
import './reset.css'
import App from './App'
import generateStore from 'redux/store'

const history = createBrowserHistory()
const store = generateStore()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
