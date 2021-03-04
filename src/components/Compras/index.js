import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './compras.module.css'
import Message from 'components/Message'
import ProductosAdd from 'components/ProductosAddComprasVentas'
import { obtenerProveedoresAccion } from 'redux/ProveedoresDucks'
import { obtenerProductosAccion } from 'redux/productosDucks'
import { nuevaCompraAccion } from 'redux/comprasDucks'

const Compras = ({ history }) => {
	const dispatch = useDispatch()
	const id_user = useSelector((store) => store.login.user.persona.id)
	const comprasMsg = useSelector((store) => store.compras.message)
	const comprasActionSuccess = useSelector((store) => store.compras.success)
	const proveedores = useSelector((store) => store.proveedores.array)
	const productos = useSelector((store) => store.productos.array)

	const [productosList, setProductosList] = useState([])
	const [productoBorrado, setProductoBorrado] = useState('')
	const [cantidad, setCantidad] = useState(0)
	const [precio, setPrecio] = useState(0)
	const [total, setTotal] = useState(0)
	const [datos, setDatos] = useState({
		id_comprador: id_user,
	})

	useEffect(() => {
		setTotal(cantidad * precio)
		if (total !== 0) datos.precio_total = total
		dispatch(obtenerProveedoresAccion(history))
		dispatch(obtenerProductosAccion(history))
	}, [dispatch, history, datos, cantidad, precio, total])

	const sumarTotal = () => {
		const nameCantidad = document.getElementsByName('cantidad')
		const namePrecio = document.getElementsByName('precio_unidad')

		let arrayCantidad = []
		let arrayPrecio = []

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

	const handleInputChange = (e) => {
		sumarTotal()

		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		})
	}

	const handleBorrar = (item, e) => {
		let productosListEditado = productosList.filter(
			(el) => el.codigo !== item.codigo
		)
		setProductosList(productosListEditado)
		setProductoBorrado(item.codigo)

		const valueCantidad = e.target.parentNode.firstChild.value
		const valuePrecio = e.target.parentNode.childNodes[1].value

		valueCantidad && setCantidad(cantidad - valueCantidad)
		valuePrecio && setPrecio(precio - valuePrecio)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(nuevaCompraAccion(datos, history))
		//e.target.reset()
	}

	return (
		<div className={Styles.container}>
			<div className={Styles.form_container}>
				<form className={Styles.form} onSubmit={handleSubmit}>
					<div className={Styles.inputGroup_container}>
						<div className={Styles.inputGroup}>
							<label className={Styles.label} htmlFor='id_proveedor'>
								Proveedor
							</label>
							<select
								onChange={handleInputChange}
								className={Styles.input_select}
								name='id_proveedor'
								id='id_proveedor'
								required
							>
								<option>Selecione Proveedor</option>
								{proveedores &&
									proveedores.map((element, index) => {
										return (
											<option key={index} value={element.codigo || element.id}>
												{element.nombre}
											</option>
										)
									})}
							</select>
						</div>
						<span className={Styles.preductos_label}>Productos</span>
						<div className={Styles.productos_container}>
							{productosList.length !== 0 ? (
								productosList.map((el, index) => {
									return (
										<div key={index} className={Styles.inputGroup}>
											<span className={Styles.producto_name}>
												{`${el.nombre} ${el.descripcion}`}
											</span>
											<div className={Styles.producto_inputs}>
												<input
													onChange={handleInputChange}
													className={Styles.input_cantidad}
													type='number'
													name='cantidad'
													placeholder='Cantidad'
													required
													min='0'
												/>
												<input
													onChange={handleInputChange}
													className={Styles.input_precio}
													type='number'
													name='precio_unidad'
													placeholder='Precio unidad'
													required
													min='0'
												/>
												<span
													onClick={(e) => handleBorrar(el, e)}
													className={Styles.btn_icon}
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
								className={Styles.input}
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
					<button className={`btn btn_success ${Styles.btn}`} type='submit'>
						Enviar
					</button>
				</form>
			</div>
			<ProductosAdd
				data={productos}
				addProductosForm={{ productosList, setProductosList }}
				productoBorrado={{ productoBorrado, setProductoBorrado }}
			/>
			{comprasMsg !== '' && (
				<Message msgProps={comprasMsg} successProps={comprasActionSuccess} />
			)}
		</div>
	)
}

export default withRouter(Compras)
