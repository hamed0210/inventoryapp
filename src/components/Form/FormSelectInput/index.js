import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './formSelectInput.module.css'
import useButtonLoader from 'hooks/useButtonLoader'

function FormSelectInput({
	history,
	handleCerrarForm,
	dispatchNewSelect,
	dispatchObtenerSelect,
	msgSelectProps,
	successProps,
}) {
	const dispatch = useDispatch()

	const [buttonLoad, loading, setLoading] = useButtonLoader()
	const [resetForm, setResetForm] = useState(false)
	const [datos, setDatos] = useState()

	useEffect(() => {
		if (resetForm) {
			document.querySelector(`.${Styles.form}`).reset()
			setResetForm(false)
			dispatch(dispatchObtenerSelect())
		}
	}, [resetForm, dispatchObtenerSelect, dispatch])

	const handleInputChange = (e) => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		})
	}

	const handleCancel = () => {
		handleCerrarForm()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(dispatchNewSelect(datos, history, setLoading, setResetForm))
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
						disabled={loading}
					/>
				</div>
				<div className={Styles.btns}>
					<button
						className={`btn btn_success ${Styles.btn}`}
						type='submit'
						ref={buttonLoad}
					>
						Enviar
					</button>
					<button
						onClick={handleCancel}
						className={`btn btn_cancel ${Styles.btn}`}
						type='button'
						disabled={loading}
					>
						cancelar
					</button>
				</div>
			</form>
		</div>
	)
}

export default withRouter(FormSelectInput)
