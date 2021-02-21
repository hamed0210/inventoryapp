import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import axios from 'axios'

import Styles from 'App.module.css'
import Header from './components/Header'
import Main from './components/Main'
import Login from 'components/Login'
import Preloader from 'components/Preloader'
import { getLocalStorage, removeLocalStorage } from 'helpers'

function App({ history }) {
	const userStore = useSelector((store) => store.login)
	const [loadingState, setLoadingState] = useState(false)

	useEffect(() => {
		const cargarUsuario = async () => {
			const token = getLocalStorage()
			if (token) {
				try {
					const result = await axios.get(
						`${process.env.REACT_APP_URI}${process.env.REACT_APP_PORT}/api/check`,
						{
							headers: {
								authorization: `Bearer ${token}`,
							},
						}
					)
					userStore.user = result.data.user
					if (userStore.user.id) setLoadingState(true)
				} catch (error) {
					if (error.request.status === 401) {
						setLoadingState(null)
						removeLocalStorage()
						userStore.message = 'La sesion a caducado, inicia sesion nuevamente'
						history.push('/login')
					}
					console.log(error)
				}
			} else {
				setLoadingState(null)
				history.push('/login')
			}
		}
		cargarUsuario()
	}, [history, userStore])

	return loadingState !== false ? (
		<main className={Styles.conatiner_body}>
			<Switch>
				{userStore.user.id ? (
					<>
						<Header />
						<Main />
					</>
				) : (
					<Route exact path='/login'>
						<Login />
					</Route>
				)}
			</Switch>
		</main>
	) : (
		<Preloader />
	)
}

export default withRouter(App)
