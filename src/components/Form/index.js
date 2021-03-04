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
	dataSelect,
	dispatchNew,
	dispatchNewSelect = '',
	dispatchDeleteSelect = '',
	dispatchObtenerSelect = '',
	dispatchEditSelect = '',
	msgSelectProps = '',
	msgSelectConsultasProps = '',
	successSelectProps = '',
}) => {
	const dispatch = useDispatch()
	const id_user = useSelector((store) => store.login.user.persona.id)
	const [datos, setDatos] = useState({
		creado_por: id_user,
	})

	/*
		estados para poder pintar los componentes de crear una nueva opcion para el input tipo select y para ver todos las opciones de este y poder editar o eliminar
	*/
	const [selectInputAdd, setSelectInputAdd] = useState(false)
	const [selectInputs, setSelectInputs] = useState(false)

	const handleVerSelectAddCerrar = () => {
		setSelectInputAdd(false)
	}

	const handleVerSelectCerrar = () => {
		setSelectInputs(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(dispatchNew(datos, history))
		//e.target.reset()
	}

	return (
		<div className={Styles.container}>
			<form className={Styles.form} onSubmit={handleSubmit}>
				<div className={Styles.inputGroup_container}>
					<Input
						dataLabel={dataLabel}
						dataSelect={dataSelect}
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
					handleCerrarForm={handleVerSelectAddCerrar}
					msgSelectProps={msgSelectProps}
					successProps={successSelectProps}
					dispatchNewSelect={dispatchNewSelect}
				/>
			) : null}
			{selectInputs ? (
				<SelectInputConsultas
					dataHeader={dataHeader}
					data={dataSelect}
					dispatchDelete={dispatchDeleteSelect}
					dispatchEdit={dispatchEditSelect}
					messageProps={msgSelectConsultasProps}
					successProps={successSelectProps}
					handleCerrarConsultas={handleVerSelectCerrar}
				/>
			) : null}
		</div>
	)
}

export default withRouter(Form)
