import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './form.module.css'
import FormSelectInput from './FormSelectInput'
import Input from 'components/Form/Input'
import SelectInputConsultas from 'components/Consultas/SelectInputConsultas'

const Form = ({
	history,
	dataLabel,
	dataHeader = '',
	data,
	dispatchNew,
	dispatchNewSelect = '',
	dispatchDelete = '',
	dispatchObtenerSelect = '',
	messageProps,
	successProps,
	msgSelectProps = '',
	msgSelectConsultasProps = '',
	successSelectProps = '',
}) => {
	const dispatch = useDispatch()
	const id_user = useSelector((store) => store.login.user.persona.id)
	const [datos, setDatos] = useState({
		creado_por: id_user,
	})
	const [selectInputAdd, setSelectInputAdd] = useState(false)
	const [selectInputs, setSelectInputs] = useState(false)

	const handleSelectAddCancel = () => {
		setSelectInputAdd(false)
	}

	const handleSelectCancel = () => {
		setSelectInputs(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(dispatchNew(datos, history))
		//e.target.reset()
	}

	const handleMessage = () => {
		if (messageProps !== '') {
			if (successProps)
				return (
					<div className={`${Styles.message_success_container}`}>
						<span className={Styles.message_success}>{messageProps}</span>
					</div>
				)
			if (!successProps)
				return (
					<div className={`${Styles.error_container}`}>
						<span className={Styles.error}>{messageProps}</span>
					</div>
				)
		}
	}

	return (
		<div className={Styles.container}>
			{handleMessage()}
			<form className={Styles.form} onSubmit={handleSubmit}>
				<div className={Styles.inputGroup_container}>
					<Input
						dataLabel={dataLabel}
						data={data}
						setSelectInputAdd={setSelectInputAdd}
						setSelectInputs={setSelectInputs}
						datosInput={{ datos, setDatos }}
						dispatchObtenerSelect={dispatchObtenerSelect}
					/>
				</div>
				<span className={Styles.separator}></span>
				<button className={`btn btn_success ${Styles.btn}`} type='submit'>
					Enviar
				</button>
			</form>
			{selectInputAdd ? (
				<FormSelectInput
					handleProps={handleSelectAddCancel}
					msgSelectProps={msgSelectProps}
					successProps={successSelectProps}
					dispatchNewSelect={dispatchNewSelect}
				/>
			) : null}
			{selectInputs ? (
				<SelectInputConsultas
					dataHeader={dataHeader}
					data={data}
					dispatchDelete={dispatchDelete}
					messageProps={msgSelectConsultasProps}
					successProps={successSelectProps}
					handleProps={handleSelectCancel}
				/>
			) : null}
		</div>
	)
}

export default withRouter(Form)
