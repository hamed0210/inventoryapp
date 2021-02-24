import axios from 'axios'

import { getLocalStorage, removeLocalStorage } from 'helpers'
import { cerrarSesionAccion } from 'redux/loginDucks'

// Constantes
// const URI =
// 	process.env.NODE_ENV === 'development'
// 		? process.env.REACT_APP_URI_LOCAL
// 		: process.env.REACT_APP_URI
const URI = process.env.REACT_APP_URI
const PORT = process.env.REACT_APP_PORT

const dataInicial = {
	array: [],
	message: '',
	messageConsultas: '',
	success: false,
}

// Types
const OBTENER_PRODUCTOS_EXITO = 'OBTENER_PRODUCTOS_EXITO'
const NUEVO_PRODUCTO_EXITO = 'NUEVO_PRODUCTO_EXITO'
const NUEVO_PRODUCTO_ERROR = 'NUEVO_PRODUCTO_ERROR'
const ELIMINAR_PRODUCTO_EXITO = 'ELIMINAR_PRODUCTO_EXITO'
const ELIMINAR_PRODUCTO_MESSAGE_EXITO = 'ELIMINAR_PRODUCTO_MESSAGE_EXITO'
const ELIMINAR_PRODUCTO_ERROR = 'ELIMINAR_PRODUCTO_ERROR'

// Reducer
export default function productosReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_PRODUCTOS_EXITO:
			return {
				...state,
				array: action.payload.data,
			}
		case NUEVO_PRODUCTO_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case NUEVO_PRODUCTO_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		case ELIMINAR_PRODUCTO_EXITO:
			return {
				...state,
				array: action.payload.array,
				messageConsultas: action.payload.message,
				success: true,
			}
		case ELIMINAR_PRODUCTO_MESSAGE_EXITO:
			return {
				...state,
				messageConsultas: action.payload.message,
				success: true,
			}
		case ELIMINAR_PRODUCTO_ERROR:
			return {
				...state,
				messageConsultas: action.payload.message,
				success: false,
			}
		default:
			return state
	}
}

//Acciones

export const obtenerProductosAccion = (history) => async (dispath) => {
	const token = getLocalStorage()
	try {
		const result = await axios.get(`${URI}${PORT}/api/productos`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})

		/*
			Recorremos el resultado de la peticion para cambiar codigo de campo foraneo con el nombre de la categoria
		 */
		result.data.data.map((el) => {
			el['categoria'] = el['category'].nombre
			return delete el['category']
		})
		dispath({
			type: OBTENER_PRODUCTOS_EXITO,
			payload: {
				data: result.data.data,
			},
		})
	} catch (error) {
		if (error.request.status === 401) {
			removeLocalStorage()
			const message = 'La sesion a caducado, inicia sesion nuevamente'
			dispath(cerrarSesionAccion(history, message))
		}
		console.log(error.request)
	}
}

export const nuevoProductoAccion = (data, history) => async (dispath) => {
	const token = getLocalStorage()

	try {
		const result = await axios.post(`${URI}${PORT}/api/productos`, data, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		dispath({
			type: NUEVO_PRODUCTO_EXITO,
			payload: {
				message: result.data.message,
			},
		})
		setTimeout(() => {
			dispath({
				type: NUEVO_PRODUCTO_EXITO,
				payload: {
					message: '',
				},
			})
		}, 5000)
	} catch (error) {
		if (error.request.status === 401) {
			removeLocalStorage()
			const message = 'La sesion a caducado, inicia sesion nuevamente'
			dispath(cerrarSesionAccion(history, message))
			return history.push('/login')
		}
		dispath({
			type: NUEVO_PRODUCTO_ERROR,
			payload: {
				message: JSON.parse(error.request.response).message,
			},
		})
		setTimeout(() => {
			dispath({
				type: NUEVO_PRODUCTO_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const editarProductoAccion = (data, history) => async (
	dispath,
	getState
) => {
	const token = getLocalStorage()
	try {
		const result = await axios.put(
			`${URI}${PORT}/api/productos/${data.codigo}`,
			data,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		)

		const productoEditado = getState().productos.array.map((el) => {
			return el.codigo === result.data.data.codigo
				? (el = result.data.data)
				: el
		})

		dispath({
			type: ELIMINAR_PRODUCTO_EXITO,
			payload: {
				array: productoEditado,
				message: result.data.message,
			},
		})
		setTimeout(() => {
			dispath({
				type: ELIMINAR_PRODUCTO_MESSAGE_EXITO,
				payload: {
					message: '',
				},
			})
		}, 5000)
	} catch (error) {
		if (error.request.status === 401) {
			removeLocalStorage()
			const message = 'La sesion a caducado, inicia sesion nuevamente'
			dispath(cerrarSesionAccion(history, message))
			return history.push('/login')
		}
		dispath({
			type: ELIMINAR_PRODUCTO_ERROR,
			payload: {
				message: JSON.parse(error.request.response).message,
			},
		})
		setTimeout(() => {
			dispath({
				type: ELIMINAR_PRODUCTO_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const eliminarProductoAccion = (data, history) => async (dispath) => {
	const token = getLocalStorage()
	try {
		const result = await axios.delete(
			`${URI}${PORT}/api/productos/${data.item}`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		)
		dispath({
			type: ELIMINAR_PRODUCTO_EXITO,
			payload: {
				array: data.data,
				message: result.data.message,
			},
		})
		setTimeout(() => {
			dispath({
				type: ELIMINAR_PRODUCTO_MESSAGE_EXITO,
				payload: {
					message: '',
				},
			})
		}, 5000)
	} catch (error) {
		if (error.request.status === 401) {
			removeLocalStorage()
			const message = 'La sesion a caducado, inicia sesion nuevamente'
			dispath(cerrarSesionAccion(history, message))
			return history.push('/login')
		}
		dispath({
			type: ELIMINAR_PRODUCTO_ERROR,
			payload: {
				message: JSON.parse(error.request.response).message,
			},
		})
		setTimeout(() => {
			dispath({
				type: ELIMINAR_PRODUCTO_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}
