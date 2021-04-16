import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './formEditarConsultas.module.css'
import useButtonLoader from 'hooks/useButtonLoader'

const FormEditarConsultas = ({
	history,
	dataFormEdit,
	dataSelect,
	data,
	dispatchEdit,
	handleVerEditarCerrar,
}) => {
	const dispatch = useDispatch()
	const [buttonLoad, loading, setLoading] = useButtonLoader()
	const [datos, setDatos] = useState(data)

	const handleInputChange = (e) => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		})
	}

	const handleCerrarEditar = () => {
		handleVerEditarCerrar()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(dispatchEdit(datos, history, setLoading, handleVerEditarCerrar))
	}

	return (
		<div
			className={
				datos.medidas && datos.stock
					? `${Styles.container} ${Styles.container_productos}`
					: Styles.container
			}
		>
			<form className={Styles.form} onSubmit={handleSubmit}>
				<div className={Styles.inputGroup_container}>
					{
						/*
						 recorremos dataFormEdit el cual contiene los atributos para pintar los inputs y labels
						*/
						dataFormEdit.inputs.map((el, index) => {
							/*
								convertimos datos en un array el cual es un objeto para poder recorrerlo y pintar los valores de los inputs   
							*/
							return Object.keys(datos).map((element, i) => {
								/*
								los datos en dataFormEdit estan ordenados de igual forma a como esta ordenado los resultados de las peticiones a la api y los pintamos igualando sus posiciones en el arreglo
								*/
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
														disabled={loading}
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
																	disabled={loading}
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
																	disabled={loading}
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
									if (el.name === 'stock')
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
													min='0'
													value={datos[element]}
													disabled
												/>
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
												min='0'
												value={datos[element]}
												disabled={loading}
											/>
										</div>
									)
								} else {
									return null
								}
							})
						})
					}
				</div>
				<div className={`${Styles.btns_container}`}>
					<button
						className={`btn btn_success ${Styles.btn}`}
						type='submit'
						ref={buttonLoad}
					>
						Enviar
					</button>
					<button
						onClick={handleCerrarEditar}
						className={`btn btn_cancel ${Styles.btn}`}
						type='button'
						disabled={loading}
					>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	)
}

export default withRouter(FormEditarConsultas)
