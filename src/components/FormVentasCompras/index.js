import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './formVentasCompras.module.css'
import useButtonLoader from 'hooks/useButtonLoader'
import addProductToListData from 'helpers/addProductToListData'

const FormVentasCompras = ({
	history,
	productos,
	setProductoBorrado,
	dispatchNew,
	dispathObtenerProductos,
	dataSelect,
	titleSelect,
	setLoadingProps,
	type,
}) => {
	const dispatch = useDispatch()
	const id_user = useSelector((store) => store.login.user.id)
	const elementForm = useRef(null)

	const [buttonLoad, loading, setLoading] = useButtonLoader()
	const [resetForm, setResetForm] = useState(false)
	const [showFormError, setShowFormError] = useState(false)
	const [showPrecioError, setShowPrecioError] = useState(false)
	const [precioVentaError, setPrecioVentaError] = useState(0)
	const [selectError, setSelectError] = useState('')
	const [cantidad, setCantidad] = useState(0)
	const [precio, setPrecio] = useState(0)
	const [total, setTotal] = useState(0)
	const [datos, setDatos] = useState({})

	useEffect(() => {
		setTotal(cantidad * precio)
		if (total !== 0) datos.precio_total = total
	}, [datos, cantidad, precio, total])

	useEffect(() => {
		sumarTotal()
		setShowFormError(false)
		if (productos.productosList.length === 0) {
			setCantidad(0)
			setPrecio(0)
			setTotal(0)
		}
	}, [productos])

	useEffect(() => {
		let datosProductos = []
		const selectvalue = document.querySelector(`.${Styles.input_select}`).value
		const selectName = document.querySelector(`.${Styles.input_select}`).name
		const productoList = document.querySelectorAll('.productos')
		const cantidadList = document.querySelectorAll(`.${Styles.input_cantidad}`)
		const precioList = document.querySelectorAll(`.${Styles.input_precio}`)
		const precioTotal = document.querySelector(`.${Styles.input_total}`).value

		for (let i = 0; i < productoList.length; i++) {
			datosProductos.push({
				producto: productoList[i].getAttribute('data-codigo'),
				cantidad: cantidadList[i].value,
				precio: precioList[i].value,
			})
		}

		type === 'compra' && setDatos({ id_comprador: id_user })
		type === 'venta' && setDatos({ id_vendedor: id_user })

		if (cantidadList.length !== 0) {
			type === 'compra' &&
				setDatos({
					id_comprador: id_user,
					[selectName]: selectvalue,
					productos: JSON.stringify(datosProductos),
					precio_total: precioTotal,
				})
			type === 'venta' &&
				setDatos({
					id_vendedor: id_user,
					[selectName]: selectvalue,
					productos: JSON.stringify(datosProductos),
					precio_total: precioTotal,
				})
		}

		if (resetForm) {
			setPrecio(0)
			setCantidad(0)
			setTotal(0)
			type === 'compra' && setDatos({ id_comprador: id_user })
			type === 'venta' && setDatos({ id_vendedor: id_user })
			productos.setProductosList([])
			elementForm.current.reset()
			setResetForm(false)
			setSelectError('')
			dispatch(dispathObtenerProductos())
		}
	}, [resetForm, productos, type, id_user, dispatch, dispathObtenerProductos])

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
		Number(e.target.value)
			? setSelectError('')
			: setSelectError(`Por favor ${e.target.value.toLowerCase()}`)
	}

	const handleInputChange = (item, e) => {
		if (e.target.name === 'cantidad')
			if (type === 'Venta')
				if (item.stock - e.target.value < 0) e.target.value = item.stock

		if (e.target.name === 'precio_unidad')
			if (item.precio_venta < e.target.value) {
				setPrecioVentaError(item.precio_venta)
				setShowPrecioError(true)
			} else {
				setPrecioVentaError(0)
				setShowPrecioError(false)
			}

		sumarTotal()
		addProductToListData(datos, setDatos, Styles)
	}

	const handleBorrar = (item, e) => {
		let productosListEditado = productos.productosList.filter(
			(el) => el.codigo !== item.codigo
		)

		productos.setProductosList(productosListEditado)
		setProductoBorrado(item.codigo)

		let valueCantidad = e.target.parentNode.firstChild.value
		let valuePrecio = e.target.parentNode.childNodes[1].value

		valueCantidad && handleRestar(valueCantidad, valuePrecio)

		addProductToListData(datos, setDatos, Styles, item.codigo)
	}

	const handleRestar = (cantidadProps, precioProps) => {
		setCantidad(cantidad - cantidadProps)
		setPrecio(precio - precioProps)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const selectvalue = document.querySelector(`.${Styles.input_select}`).value

		if (!showPrecioError)
			Number(selectvalue)
				? datos.productos
					? dispatch(
							dispatchNew(
								datos,
								history,
								setLoading,
								setLoadingProps,
								setResetForm
							)
					  )
					: setShowFormError(true)
				: setSelectError(`Por favor ${selectvalue.toLowerCase()}`)
	}

	return (
		<form className={Styles.form} onSubmit={handleSubmit} ref={elementForm}>
			{showFormError && (
				<span className={Styles.form_error}>Por favor agregar productos</span>
			)}
			<div className={Styles.inputGroup_container}>
				<div className={Styles.inputGroup}>
					<label
						className={Styles.label}
						htmlFor={`id_${titleSelect.toLowerCase()}`}
					>
						{titleSelect}
					</label>
					<div className={Styles.select_container}>
						<span className={Styles.select_error}>{selectError}</span>
						<select
							onChange={handleSelectChange}
							className={Styles.input_select}
							name={`id_${titleSelect.toLowerCase()}`}
							id={`id_${titleSelect.toLowerCase()}`}
							required
							disabled={loading}
						>
							<option>Seleccione {titleSelect}</option>
							{dataSelect &&
								dataSelect.map((element, index) => {
									return (
										<option key={index} value={element.codigo || element.id}>
											{element.nombre}
										</option>
									)
								})}
						</select>
					</div>
				</div>
				<span className={Styles.preductos_label}>Productos</span>
				<div className={Styles.productos_container}>
					{showPrecioError && (
						<span className={Styles.error_productos}>
							{`Precio de compra es mayor al precio de venta ${precioVentaError}, esto generara
							perdidas`}
						</span>
					)}
					{productos.productosList.length !== 0 ? (
						productos.productosList.map((el, index) => {
							return (
								<div
									key={index}
									data-codigo={el.codigo}
									className={`productos ${Styles.inputGroup}`}
								>
									<span className={Styles.producto_name}>
										{el.descripcion
											? `${el.nombre} ${el.descripcion}`
											: el.nombre}
									</span>
									<div className={Styles.producto_inputs_container}>
										<div className={Styles.producto_inputs}>
											<span className={Styles.label_cantidad}>Cantidad</span>
											{type === 'Venta' ? (
												<input
													onChange={(e) => handleInputChange(el, e)}
													className={Styles.input_cantidad}
													type='number'
													name='cantidad'
													placeholder='Cantidad'
													required
													min='1'
													max={el.stock}
													defaultValue='1'
													disabled={loading}
												/>
											) : (
												<input
													onChange={(e) => handleInputChange(el, e)}
													className={Styles.input_cantidad}
													type='number'
													name='cantidad'
													placeholder='Cantidad'
													required
													min='1'
													defaultValue='1'
													disabled={loading}
												/>
											)}
										</div>
										<div className={Styles.producto_inputs}>
											<span
												className={Styles.label_precio}
											>{`Precio ${type}`}</span>
											<input
												onChange={(e) => handleInputChange(el, e)}
												className={Styles.input_precio}
												type='number'
												name='precio_unidad'
												placeholder='Precio unidad'
												required
												min='1'
												defaultValue={type === 'venta' && el.precio_venta}
												disabled={type === 'venta' ? true : loading}
											/>
										</div>
										<span
											onClick={(e) => handleBorrar(el, e)}
											className={Styles.btn_icon}
											disabled={loading}
										>
											<i className='fas fa-times'></i>
										</span>
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
						// onChange={handleInputChange}
						className={Styles.input_total}
						type='number'
						id='precio_total'
						name='precio_total'
						required
						value={total}
						disabled
						// readOnly
					/>
				</div>
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
	)
}

export default withRouter(FormVentasCompras)
