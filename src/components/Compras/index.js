import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './compras.module.css'
import Message from 'components/Message'
import ProductosAdd from 'components/ProductosAddComprasVentas'
import { obtenerProveedoresAccion } from 'redux/ProveedoresDucks'
import { obtenerProductosAccion } from 'redux/productosDucks'
import FormVentasCompras from 'components/FormVentasCompras'

import { nuevaCompraAccion } from 'redux/comprasDucks'

const Compras = ({ history }) => {
	const dispatch = useDispatch()
	const comprasMsg = useSelector((store) => store.compras.message)
	const comprasActionSuccess = useSelector((store) => store.compras.success)
	const proveedores = useSelector((store) => store.proveedores.array)
	const productos = useSelector((store) => store.productos.array)

	const [loading, setLoading] = useState(false)
	const [productosList, setProductosList] = useState([])
	const [productoBorrado, setProductoBorrado] = useState('')

	useEffect(() => {
		dispatch(obtenerProveedoresAccion(history))
		dispatch(obtenerProductosAccion(history))
	}, [dispatch, history])

	return (
		<div className={Styles.container}>
			<div className={Styles.form_container}>
				<FormVentasCompras
					productos={{ productosList, setProductosList }}
					setProductoBorrado={setProductoBorrado}
					dispatchNew={nuevaCompraAccion}
					titleSelect={'Proveedor'}
					dataSelect={proveedores}
					setLoadingProps={setLoading}
				/>
			</div>
			<ProductosAdd
				data={productos}
				addProductosForm={{ productosList, setProductosList }}
				productoBorrado={{ productoBorrado, setProductoBorrado }}
				inputDisabled={loading}
			/>
			{comprasMsg !== '' && (
				<Message msgProps={comprasMsg} successProps={comprasActionSuccess} />
			)}
		</div>
	)
}

export default withRouter(Compras)
