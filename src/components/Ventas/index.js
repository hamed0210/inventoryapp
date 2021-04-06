import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './ventas.module.css'
import Message from 'components/Message'
import ProductosAdd from 'components/ProductosAddComprasVentas'
import { obtenerClientesAccion } from 'redux/clientesDucks'
import { obtenerProductosAccion } from 'redux/productosDucks'
import FormVentasCompras from 'components/FormVentasCompras'

import {
	// obtenerVentasAccion,
	nuevaVentaAccion,
	// eliminarVentaAccion,
	// editarVentaAccion,
} from 'redux/ventasDucks'

const Ventas = ({ history }) => {
	const dispatch = useDispatch()
	const clientes = useSelector((store) => store.clientes.array)
	const productos = useSelector((store) => store.productos.array)
	const ventasMsg = useSelector((store) => store.ventas.message)
	const ventasActionSuccess = useSelector((store) => store.ventas.success)

	const [loading, setLoading] = useState(false)
	const [productosList, setProductosList] = useState([])
	const [productoBorrado, setProductoBorrado] = useState('')

	useEffect(() => {
		dispatch(obtenerClientesAccion(history))
		dispatch(obtenerProductosAccion(history))
	}, [dispatch, history])

	return (
		<div className={Styles.container}>
			<div className={Styles.form_container}>
				<FormVentasCompras
					productos={{ productosList, setProductosList }}
					setProductoBorrado={setProductoBorrado}
					dispatchNew={nuevaVentaAccion}
					dispathObtenerProductos={obtenerProductosAccion}
					titleSelect={'Cliente'}
					dataSelect={clientes}
					setLoadingProps={setLoading}
					type={'venta'}
				/>
			</div>
			<ProductosAdd
				data={productos}
				addProductosForm={{ productosList, setProductosList }}
				productoBorrado={{ productoBorrado, setProductoBorrado }}
				inputDisabled={loading}
			/>
			{ventasMsg !== '' && (
				<Message msgProps={ventasMsg} successProps={ventasActionSuccess} />
			)}
		</div>
	)
}

export default withRouter(Ventas)
