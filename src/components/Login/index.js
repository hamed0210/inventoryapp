import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './login.module.css'
import { iniciarSesionAccion } from 'redux/loginDucks'
import useButtonLoader from 'hooks/useButtonLoader'

const Login = ({ history }) => {
	const dispatch = useDispatch()
	const loginStore = useSelector((store) => store.login)
	const [buttonLoad, loading, setLoading] = useButtonLoader('Entrar')
	const [datos, setDatos] = useState({
		email: '',
		pass: '',
	})

	const handlePassword = (e) => {
		const icon = e.target
		const inputPassword = icon.parentNode.previousSibling
		const iconClass = icon.classList

		if (iconClass.contains('fa-eye')) {
			iconClass.remove('fa-eye')
			iconClass.add('fa-eye-slash')
			inputPassword.type = 'text'
		} else {
			iconClass.remove('fa-eye-slash')
			iconClass.add('fa-eye')
			inputPassword.type = 'password'
		}
	}

	const handleInputChange = (e) => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(iniciarSesionAccion(datos, history, setLoading))
	}

	return (
		<div className={Styles.container}>
			<div className={Styles.login_container}>
				<div className={Styles.login}>
					{loginStore.message && (
						<div className={`${Styles.error_container}`}>
							<span className={Styles.error}>{loginStore.message}</span>
						</div>
					)}
					<h2 className={Styles.title}>Login</h2>
					<form onSubmit={handleSubmit} className={Styles.form} action=''>
						<div className={Styles.inputGroup}>
							<input
								onChange={handleInputChange}
								className={`${Styles.input} ${Styles.input_email}`}
								type='text'
								name='email'
								id='email'
								placeholder='Correo electronico'
								required
								autoFocus
								disabled={loading}
							/>
							<div className={Styles.input_password_container}>
								<input
									onChange={handleInputChange}
									className={Styles.input}
									type='password'
									name='pass'
									id='pass'
									placeholder='Contraseña'
									required
									disabled={loading}
								/>
								<span onClick={handlePassword} className={Styles.icon}>
									<i className={`fas fa-eye`} />
								</span>
							</div>
						</div>
						<button
							className={`btn btn_success ${Styles.btn}`}
							type='submit'
							ref={buttonLoad}
						>
							Entrar
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Login)
