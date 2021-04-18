import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './form.module.css'
import FormSelectInput from './FormSelectInput'
import Input from 'components/Form/Input'
import SelectInputConsultas from 'components/Consultas/SelectInputConsultas'
import useButtonLoader from 'hooks/useButtonLoader'

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
	const [buttonLoad, loading, setLoading] = useButtonLoader()
	const [resetForm, setResetForm] = useState(false)
	const [showSelectError, setShowSelectError] = useState(false)
	const id_user = useSelector((store) => store.login.user.id)
	const [datos, setDatos] = useState({
		creado_por: id_user,
	})

	/*
		estados para poder pintar los componentes de crear una nueva opcion para el input tipo select y para ver todos las opciones de este y poder editar o eliminar
	*/
	const [selectInputAdd, setSelectInputAdd] = useState(false)
	const [selectInputs, setSelectInputs] = useState(false)

	useEffect(() => {
		if (resetForm) {
			document.querySelector(`.${Styles.form}`).reset()
			setResetForm(false)
		}
	}, [resetForm])

	const handleVerSelectAddCerrar = () => {
		setSelectInputAdd(false)
	}

	const handleVerSelectCerrar = () => {
		setSelectInputs(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const selectInput = document.querySelector(`select`)

		selectInput && selectInput.value.includes('Seleccione')
			? setShowSelectError(true)
			: dispatch(dispatchNew(datos, history, setLoading, setResetForm))
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
						inputDisabled={loading}
						showSelectError={showSelectError}
						setShowSelectError={setShowSelectError}
					/>
				</div>
				<span className={Styles.separator}></span>
				<button
					className={`btn btn_success ${Styles.btn}`}
					type='submit'
					ref={buttonLoad}
				>
					Enviar
				</button>
			</form>
			{selectInputAdd ? (
				<FormSelectInput
					handleCerrarForm={handleVerSelectAddCerrar}
					msgSelectProps={msgSelectProps}
					successProps={successSelectProps}
					dispatchNewSelect={dispatchNewSelect}
					dispatchObtenerSelect={dispatchObtenerSelect}
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
