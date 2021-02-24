import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './formEditarConsultas.module.css'

const FormEditarConsultas = ({
	history,
	dataFormEdit,
	dataSelect,
	data,
	dispatchEdit,
	handleVerEditarCerrar,
}) => {
	const dispatch = useDispatch()
	const [datos, setDatos] = useState(data)

	const handleInputChange = (e) => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		})
	}

	console.log(datos)

	const handleCerrarEditar = () => {
		handleVerEditarCerrar()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(dispatchEdit(datos, history))
		handleVerEditarCerrar()
		//e.target.reset()
	}

	return (
		<div className={Styles.container}>
			<form className={Styles.form} onSubmit={handleSubmit}>
				<div className={Styles.inputGroup_container}>
					{dataFormEdit.inputs.map((el, index) => {
						return Object.keys(datos).map((element, i) => {
							if (index === i) {
								if (el.type === 'select')
									return (
										<div key={index} className={Styles.inputGroup}>
											<label className={Styles.label} htmlFor={el.htmlFor}>
												{el.label}
											</label>
											<div className={Styles.select_container}>
												<select
													onChange={handleInputChange}
													className={Styles.input_select}
													name={el.name}
													id={el.id}
													required={el.required}
												>
													{dataSelect &&
														dataSelect.map((elementSelect, index) => {
															return elementSelect.nombre ===
																datos.categoria ? (
																<option
																	key={index}
																	value={elementSelect.codigo}
																	selected
																>
																	{elementSelect.nombre}
																</option>
															) : (
																<option
																	key={index}
																	value={elementSelect.codigo}
																>
																	{elementSelect.nombre}
																</option>
															)
														})}
												</select>
											</div>
										</div>
									)
								if (el.type === 'radio')
									return (
										<div key={index} className={Styles.inputGroup}>
											<label className={Styles.label} htmlFor={el.htmlFor}>
												{el.label}
											</label>
											<div className={Styles.radio_container}>
												{el.label_radio.map((elementRadio, index) => {
													return elementRadio.label === datos.role ? (
														<div key={index} className={Styles.radio_item}>
															<input
																onChange={handleInputChange}
																className={Styles.radio_input}
																type='radio'
																id={elementRadio.for}
																name={el.name}
																defaultChecked
																value={elementRadio.label}
															/>
															<label
																className={Styles.radio_label}
																htmlFor={elementRadio.for}
															>
																{elementRadio.label}
															</label>
														</div>
													) : (
														<div key={index} className={Styles.radio_item}>
															<input
																onChange={handleInputChange}
																className={Styles.radio_input}
																type='radio'
																id={elementRadio.for}
																name={el.name}
																value={elementRadio.label}
															/>
															<label
																className={Styles.radio_label}
																htmlFor={elementRadio.for}
															>
																{elementRadio.label}
															</label>
														</div>
													)
												})}
											</div>
										</div>
									)
								return (
									<div key={index} className={Styles.inputGroup}>
										<label className={Styles.label} htmlFor={el.htmlFor}>
											{el.label}
										</label>
										<input
											key={i}
											onChange={handleInputChange}
											className={Styles.input}
											type={el.type}
											id={el.id}
											name={el.name}
											required={el.required}
											autoFocus={el.autoFocus}
											min='0'
											value={datos[element]}
										/>
									</div>
								)
							} else {
								return null
							}
						})
					})}
				</div>
				<div className={`${Styles.btns_container}`}>
					<button
						className={`btn btn_success ${Styles.btn_enviar}`}
						type='submit'
					>
						Enviar
					</button>
					<button
						onClick={handleCerrarEditar}
						className={`btn ${Styles.btn_cancelar}`}
						type='button'
					>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	)
}

export default withRouter(FormEditarConsultas)
