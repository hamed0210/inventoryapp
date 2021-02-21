import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './formSelectInput.module.css'

function FormSelectInput({
	history,
	handleProps,
	dispatchNewSelect,
	msgSelectProps,
	successProps,
}) {
	const dispatch = useDispatch()
	const [datos, setDatos] = useState({})

	const handleInputChange = (e) => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		})
	}

	const handleCancel = () => {
		handleProps()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(dispatchNewSelect(datos, history))
	}

	const handleMessage = () => {
		if (msgSelectProps !== '') {
			if (successProps)
				return (
					<div className={`${Styles.message_success_container}`}>
						<span className={Styles.message_success}>{msgSelectProps}</span>
					</div>
				)
			if (!successProps)
				return (
					<div className={`${Styles.error_container}`}>
						<span className={Styles.error}>{msgSelectProps}</span>
					</div>
				)
		}
	}

	return (
		<div className={Styles.container}>
			{handleMessage()}
			<form className={Styles.form} onSubmit={handleSubmit}>
				<div className={Styles.inputGroup}>
					<label className={Styles.label} htmlFor='nombre'>
						Categoría
					</label>
					<input
						onChange={handleInputChange}
						className={Styles.input}
						type='text'
						id='nombre'
						name='nombre'
						placeholder='Escriba nombre de la categoría'
						required
					/>
				</div>
				<div className={Styles.btns}>
					<button className={`btn btn_success ${Styles.btn}`} type='submit'>
						Enviar
					</button>
					<button
						onClick={handleCancel}
						className={`btn ${Styles.btn_cancelar}`}
						type='button'
					>
						cancelar
					</button>
				</div>
			</form>
		</div>
	)
}

export default withRouter(FormSelectInput)
