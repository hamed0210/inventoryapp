import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import MenuTab from 'components/MenuTab'
import Form from 'components/Form'
import Consultas from 'components/Consultas'
import {
	dataFormProductos,
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
	const productosMsgConsultas = useSelector(
		(store) => store.productos.messageConsultas
	)
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

	useEffect(() => {
		const fetchData = () => {
			dispatch(obtenerCategoriasAccion(history))
		}
		fetchData()
	}, [dispatch, history])

	const handleClickTab = (e) => {
		setComponents(e)
		e === 'Consultas' && dispatch(obtenerProductosAccion(history))
	}

	const renderProps = () => {
		if (components === 'Nuevos')
			return (
				<Form
					dataLabel={dataFormProductos}
					dataHeader={dataConsultasCategorias}
					dataSelect={categorias}
					dispatchNew={nuevoProductoAccion}
					dispatchNewSelect={nuevaCategoriaAccion}
					dispatchDeleteSelect={eliminarCategoriaAccion}
					dispatchObtenerSelect={obtenerCategoriasAccion}
					dispatchEditSelect={editarCategoriaAccion}
					messageProps={productosMsg}
					successProps={productosActionSuccess}
					msgSelectProps={categoriasMsg}
					msgSelectConsultasProps={categoriasMsgConsultas}
					successSelectProps={categoriasActionSuccess}
				/>
			)
		if (components === 'Consultas')
			return (
				<Consultas
					dataHeader={dataConsultasProductos}
					dataFormEdit={dataFormProductos}
					dataSelect={categorias}
					data={productos}
					dispatchEdit={editarProductoAccion}
					dispatchDelete={eliminarProductoAccion}
					messageProps={productosMsgConsultas}
					successProps={productosActionSuccess}
				/>
			)
	}

	return (
		<>
			<MenuTab handleProps={handleClickTab} />
			{renderProps()}
		</>
	)
}

export default withRouter(Productos)
