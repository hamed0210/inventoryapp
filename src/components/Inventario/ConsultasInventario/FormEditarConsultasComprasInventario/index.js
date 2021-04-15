import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './formEditarConsultasComprasInventario.module.css'
import useButtonLoader from 'hooks/useButtonLoader'
import addProductToListData from 'helpers/addProductToListData'
import { editarInventarioAccion } from 'redux/inventarioDucks'

const FormEditarConsultasComprasInventario = ({
	history,
	data,
	dataEditar,
	dataSelect,
	setVerEditarForm,
}) => {
	const dispatch = useDispatch()
	const [buttonLoad, loading, setLoading] = useButtonLoader()
	const [resetForm, setResetForm] = useState(false)
	const [cantidad, setCantidad] = useState(0)
	const [precio, setPrecio] = useState(0)
	const [total, setTotal] = useState(0)
	const [datos, setDatos] = useState([])

	useEffect(() => {
		if (cantidad !== 0) setTotal(cantidad * precio)
		if (total !== 0) datos.precio_total = total
	}, [datos, cantidad, precio, total])

	useEffect(() => {
		setDatos(data)
		setTotal(data.precio_total)
	}, [data])

	useEffect(() => {
		if (resetForm) {
			setPrecio(0)
			setCantidad(0)
			setTotal(0)
			document.querySelector(`.${Styles.form}`).reset()
			setDatos([])
			setResetForm(false)
		}
	}, [resetForm])

	const sumarTotal = () => {
		const nameCantidad = document.getElementsByName('cantidad')
		const namePrecio = document.getElementsByName('precio_unidad')

		let arrayCantidad = []
		let arrayPrecio = []

		if (nameCantidad.length !== 0 && nameCantidad.length !== 0) {
			nameCantidad.forEach((el) => {
				arrayCantidad.push(Number(el.value))
			})

			namePrecio.forEach((el) => {
				arrayPrecio.push(Number(el.value))
			})

			const sumaReduce = (acumulado, newNumero) => acumulado + newNumero

			setCantidad(arrayCantidad.reduce(sumaReduce))
			setPrecio(arrayPrecio.reduce(sumaReduce))
		}
	}

	const handleSelectChange = (e) => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		})
	}

	const handleInputChange = (item, e) => {
		if (e.target.name === 'cantidad')
			if (item.stock - e.target.value < 0) e.target.value = item.stock
		sumarTotal()
		addProductToListData(datos, setDatos, Styles)
	}

	const handleCerrarEditar = () => {
		setVerEditarForm(false)
		setResetForm(true)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		dispatch(
			editarInventarioAccion(
				datos,
				history,
				setLoading,
				setVerEditarForm,
				setResetForm
			)
		)
	}

	return (
		<div className={Styles.container}>
			<form className={Styles.form} onSubmit={handleSubmit}>
				<div className={Styles.inputGroup_container}>
					<div className={Styles.inputGroup}>
						<label
							className={Styles.label}
							htmlFor={
								dataEditar.tipo === 'Compra' ? 'id_proveedor' : 'id_cliente'
							}
						>
							{dataEditar.tipo === 'Compra' ? 'Proveedor' : 'Cliente'}
						</label>
						<div className={Styles.select_container}>
							<span className={Styles.select_error}></span>
							<select
								onChange={handleSelectChange}
								className={Styles.input_select}
								name={
									dataEditar.tipo === 'Compra' ? 'id_proveedor' : 'id_cliente'
								}
								id={
									dataEditar.tipo === 'Compra' ? 'id_proveedor' : 'id_cliente'
								}
								required
								disabled={loading}
							>
								{dataSelect &&
									dataSelect.map((element, index) => {
										return element.id === datos.id_proveedor ||
											element.id === datos.id_cliente ? (
											<option key={index} value={element.id} selected>
												{element.nombre}
											</option>
										) : (
											<option key={index} value={element.id}>
												{element.nombre}
											</option>
										)
									})}
							</select>
						</div>
					</div>
					<span className={Styles.preductos_label}>Productos</span>
					<div className={Styles.productos_container}>
						{datos.length !== 0 ? (
							datos.productos &&
							JSON.parse(datos.productos).map((el, index) => {
								return (
									<div
										key={index}
										data-codigo={el.producto}
										className={`productos ${Styles.inputGroup}`}
									>
										<span className={Styles.producto_name}>
											{dataEditar.productos.length ===
											JSON.parse(datos.productos).length
												? dataEditar.productos[index].includes(',')
													? dataEditar.productos[index].replace(',', '')
													: dataEditar.productos[index]
												: dataEditar.productos[index]}
										</span>
										<div className={Styles.producto_inputs_container}>
											<div className={Styles.producto_inputs}>
												<span className={Styles.label_cantidad}>Cantidad</span>
												<input
													onChange={(e) => handleInputChange(el, e)}
													className={Styles.input_cantidad}
													type='number'
													name='cantidad'
													placeholder='Cantidad'
													required
													min='1'
													disabled={loading}
													value={el.cantidad}
												/>
											</div>
											<div className={Styles.producto_inputs}>
												<span
													className={Styles.label_precio}
												>{`Precio ${dataEditar.tipo}`}</span>
												<input
													onChange={(e) => handleInputChange(el, e)}
													className={Styles.input_precio}
													type='number'
													name='precio_unidad'
													placeholder='Precio unidad'
													required
													min='0'
													value={el.precio}
													disabled={
														dataEditar.tipo === 'Venta' ? true : loading
													}
												/>
											</div>
										</div>
									</div>
								)
							})
						) : (
							<div className={Styles.inputGroup}>
								<span>Agregar productos</span>
							</div>
						)}
					</div>
					<div className={Styles.inputGroup}>
						<label className={Styles.label} htmlFor='precio_total'>
							Total
						</label>
						<input
							className={Styles.input_total}
							type='number'
							id='precio_total'
							name='precio_total'
							required
							value={total}
							disabled
						/>
					</div>
				</div>
				<span className={Styles.separator}></span>
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
						className={`btn ${Styles.btn_cancelar}`}
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

export default withRouter(FormEditarConsultasComprasInventario)
