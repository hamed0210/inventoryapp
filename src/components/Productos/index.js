import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './productos.module.css'
import MenuTab from 'components/MenuTab'
import Form from 'components/Form'
import Consultas from 'components/Consultas'
import Message from 'components/Message'
import {
	dataFormProductos,
	dataFormEditProductos,
	dataConsultasProductos,
	dataConsultasCategorias,
} from 'components/DataForms'
import {
	obtenerProductosAccion,
	nuevoProductoAccion,
	eliminarProductoAccion,
	editarProductoAccion,
} from 'redux/productosDucks'
import {
	obtenerCategoriasAccion,
	eliminarCategoriaAccion,
	nuevaCategoriaAccion,
	editarCategoriaAccion,
} from 'redux/categoriasDucks'

const Productos = ({ history }) => {
	const dispatch = useDispatch()
	const productos = useSelector((store) => store.productos.array)
	const productosMsg = useSelector((store) => store.productos.message)
	const productosActionSuccess = useSelector((store) => store.productos.success)

	const categorias = useSelector((store) => store.categorias.array)
	const categoriasMsg = useSelector((store) => store.categorias.message)
	const categoriasMsgConsultas = useSelector(
		(store) => store.categorias.messageConsultas
	)
	const categoriasActionSuccess = useSelector(
		(store) => store.categorias.success
	)
	const [components, setComponents] = useState('Nuevos')
	const [totalProductos, setTotalProductos] = useState(0)
	const [totalAgotandose, setTotalAgotandose] = useState(0)
	const [totalAgotados, setTotalAgotados] = useState(0)
	const [totalItems, setTotalItems] = useState(0)

	useEffect(() => {
		const fetchData = () => {
			dispatch(obtenerCategoriasAccion(history))
		}
		fetchData()
	}, [dispatch, history])

	useEffect(() => {
		let cant_items = 0
		let cant_agotandose = 0
		let cant_agotados = 0
		if (productos) {
			setTotalProductos(productos.length)
			productos.map((el) => {
				if (el.stock > 0 && el.stock <= 10) cant_agotandose += 1
				if (el.stock === 0) cant_agotados += 1
				return (cant_items += el.stock)
			})
			setTotalItems(cant_items)
			setTotalAgotandose(cant_agotandose)
			setTotalAgotados(cant_agotados)
		}
	}, [productos])

	/*
		funcion enviada al componente menutab para pintar el componente deseado dependiendo del valor
	 */
	const handleClickTab = (e) => {
		setComponents(e)
		e === 'Consultas' && dispatch(obtenerProductosAccion(history))
	}

	const renderProps = () => {
		if (components === 'Nuevos')
			return (
				/*
				  dataLabel: prop que contiene los atributos necesarios para llenar los inputs.
					dataHeader:  prop que contiene un array con strings con los nombres necesarios para llenar los th 						de la tabla en un componente de consultas.
					dataSelect: prop que contiene los datos para llenar un input tipo select.
					dispatc"...": prop que contiene los action de redux para usar un useDispath en un componente deseado.
				 */
				<Form
					dataLabel={dataFormProductos}
					dataHeader={dataConsultasCategorias}
					dataSelect={categorias}
					dispatchNew={nuevoProductoAccion}
					dispatchNewSelect={nuevaCategoriaAccion}
					dispatchDeleteSelect={eliminarCategoriaAccion}
					dispatchObtenerSelect={obtenerCategoriasAccion}
					dispatchEditSelect={editarCategoriaAccion}
					msgSelectProps={categoriasMsg}
					msgSelectConsultasProps={categoriasMsgConsultas}
					successSelectProps={categoriasActionSuccess}
				/>
			)
		if (components === 'Consultas')
			return (
				<>
					<div className={Styles.container}>
						<div className={Styles.data_container}>
							<span className={Styles.title_data}>Total productos</span>
							<span className={Styles.data}>{totalProductos}</span>
						</div>
						<div className={Styles.data_container}>
							<span className={Styles.title_data}>Agotandose</span>
							<span className={Styles.data}>{totalAgotandose}</span>
						</div>
						<div className={Styles.data_container}>
							<span className={Styles.title_data}>Agotados</span>
							<span className={Styles.data}>{totalAgotados}</span>
						</div>
						<div className={Styles.data_container}>
							<span className={Styles.title_data}>Total items</span>
							<span className={Styles.data}>{totalItems}</span>
						</div>
					</div>
					<Consultas
						dataHeader={dataConsultasProductos}
						dataFormEdit={dataFormEditProductos}
						dataSelect={categorias}
						data={productos}
						dispatchEdit={editarProductoAccion}
						dispatchDelete={eliminarProductoAccion}
					/>
				</>
			)
	}

	return (
		<>
			<MenuTab handleProps={handleClickTab} />
			{renderProps()}
			{productosMsg !== '' && (
				<Message
					msgProps={productosMsg}
					successProps={productosActionSuccess}
				/>
			)}
		</>
	)
}

export default withRouter(Productos)
