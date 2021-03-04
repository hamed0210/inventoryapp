import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import './reset.css'
import App from './App'
import generateStore from 'redux/store'

const store = generateStore()

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
