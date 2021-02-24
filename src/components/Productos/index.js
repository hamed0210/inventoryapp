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
					dispatc"...": prop que contiene los action de redux para usar un useDispath en un componente 										deseado. 
					msgProps: prop que contiene el mensaje que sera mostrado dependido el resultado al intentar crear 					un elemento 
					successProps: prop que contiene un buleano para pintar el mensage como error o completado 											dependiendo de este
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
					msgProps={productosMsg}
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
