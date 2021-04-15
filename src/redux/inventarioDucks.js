import axios from 'axios'

import { getLocalStorage, removeLocalStorage } from 'helpers'
import { cerrarSesionAccion } from 'redux/loginDucks'

// Constantes
const URI = process.env.REACT_APP_URI
const PORT = process.env.REACT_APP_PORT

const dataInicial = {
	array: [],
	message: '',
	success: false,
	count: 0,
	offset: 0,
}

// Types
const OBTENER_INVENTARIO_EXITO = 'OBTENER_INVENTARIO_EXITO'
const OBTENER_INVENTARIO_ERROR = 'OBTENER_INVENTARIO_ERROR'
const EDITAR_INVENTARIO_EXITO = 'EDITAR_INVENTARIO_EXITO'
const EDITAR_INVENTARIO_ERROR = 'EDITAR_INVENTARIO_ERROR'
// const NUEVA_VENTA_EXITO = 'NUEVA_VENTA_EXITO'
// const NUEVA_VENTA_ERROR = 'NUEVA_VENTA_ERROR'
// const ELIMINAR_VENTA_EXITO = 'ELIMINAR_VENTA_EXITO'
// const ELIMINAR_VENTA_MESSAGE_EXITO = 'ELIMINAR_VENTA_MESSAGE_EXITO'
// const ELIMINAR_VENTA_ERROR = 'ELIMINAR_VENTA_ERROR'

// Reducer
export default function ventasReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_INVENTARIO_EXITO:
			return {
				...state,
				array: action.payload,
			}
		case OBTENER_INVENTARIO_ERROR:
			return {
				...state,
				message: action.payload.message,
			}
		case EDITAR_INVENTARIO_EXITO:
			return {
				...state,
				array: action.payload.array,
				message: action.payload.message,
				success: true,
			}
		case EDITAR_INVENTARIO_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		// case NUEVA_VENTA_EXITO:
		// 	return {
		// 		...state,
		// 		message: action.payload.message,
		// 		success: true,
		// 	}
		// case NUEVA_VENTA_ERROR:
		// 	return {
		// 		...state,
		// 		message: action.payload.message,
		// 		success: false,
		// 	}
		// case ELIMINAR_VENTA_EXITO:
		// 	return {
		// 		...state,
		// 		array: action.payload.array,
		// 		message: action.payload.message,
		// 		success: true,
		// 	}
		// case ELIMINAR_VENTA_MESSAGE_EXITO:
		// 	return {
		// 		...state,
		// 		message: action.payload.message,
		// 		success: true,
		// 	}
		// case ELIMINAR_VENTA_ERROR:
		// 	return {
		// 		...state,
		// 		message: action.payload.message,
		// 		success: false,
		// 	}
		default:
			return state
	}
}

//Acciones

export const obtenerInventarioAccion = (history) => async (dispath) => {
	const token = getLocalStorage()
	try {
		const result = await axios.get(`${URI}${PORT}/api/inventario`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})

		result.data.data.forEach((el) => {
			el['codigo'] = el['codigo_compra']
				? el['codigo_compra']
				: el['codigo_venta']
			delete el['codigo_compra']
			delete el['codigo_venta']
		})

		dispath({
			type: OBTENER_INVENTARIO_EXITO,
			payload: result.data.data,
		})
	} catch (error) {
		if (error.request.status === 401) {
			removeLocalStorage()
			const message = 'La sesion a caducado, inicia sesion nuevamente'
			dispath(cerrarSesionAccion(history, message))
		}
		if (error.message === 'Network Error') {
			dispath({
				type: OBTENER_INVENTARIO_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else
			dispath({
				type: OBTENER_INVENTARIO_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})
		setTimeout(() => {
			dispath({
				type: OBTENER_INVENTARIO_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const editarInventarioAccion = (
	data,
	history,
	setLoading,
	setVerEditarForm,
	setResetForm
) => async (dispath, getState) => {
	const token = getLocalStorage()
	try {
		setLoading(true)

		const result = await axios.put(
			`${URI}${PORT}/api/inventario/${data.codigo}`,
			data,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		)

		result.data.data['codigo'] = result.data.data['codigo_compra']
			? result.data.data['codigo_compra']
			: result.data.data['codigo_venta']
		delete result.data.data['codigo_compra']
		delete result.data.data['codigo_venta']

		const inventraioEditado = getState().inventario.array.map((el) => {
			return el.id === result.data.data.id ? (el = result.data.data) : el
		})

		dispath({
			type: EDITAR_INVENTARIO_EXITO,
			payload: {
				array: inventraioEditado,
				message: result.data.message,
			},
		})

		setLoading(false)
		setResetForm(true)
		setVerEditarForm(false)

		setTimeout(() => {
			dispath({
				type: EDITAR_INVENTARIO_ERROR,
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
		}
		if (error.message === 'Network Error') {
			dispath({
				type: EDITAR_INVENTARIO_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else
			dispath({
				type: EDITAR_INVENTARIO_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})

		setLoading(false)

		setTimeout(() => {
			dispath({
				type: EDITAR_INVENTARIO_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

// export const obtenerInventarioConsultasAccion = (history) => async (
// 	dispath,
// 	getState
// ) => {
// 	const token = getLocalStorage()
// 	const { offset } = getState().inventario

// 	try {
// 		const result = await axios.get(
// 			`${URI}${PORT}/api/inventario_consults?offset=${offset}`,
// 			{
// 				headers: {
// 					authorization: `Bearer ${token}`,
// 				},
// 			}
// 		)

// 		// result.data.data.forEach((el) => {
// 		// 	el['productos'] = JSON.parse(el['productos']).map((element) => {
// 		// 		return `${element.producto} `
// 		// 	})
// 		// })

// 		dispath({
// 			type: OBTENER_INVENTARIO_EXITO,
// 			payload: result.data.data,
// 		})
// 	} catch (error) {
// 		if (error.request.status === 401) {
// 			removeLocalStorage()
// 			const message = 'La sesion a caducado, inicia sesion nuevamente'
// 			dispath(cerrarSesionAccion(history, message))
// 		}
// 		if (error.message === 'Network Error') {
// 			dispath({
// 				type: OBTENER_INVENTARIO_ERROR,
// 				payload: {
// 					message: 'Error de conexión con el servidor',
// 				},
// 			})
// 		} else
// 			dispath({
// 				type: OBTENER_INVENTARIO_ERROR,
// 				payload: {
// 					message: JSON.parse(error.request.response).message,
// 				},
// 			})
// 		setTimeout(() => {
// 			dispath({
// 				type: OBTENER_INVENTARIO_ERROR,
// 				payload: {
// 					message: '',
// 				},
// 			})
// 		}, 5000)
// 		console.log(error.request)
// 	}
// }

// export const siguienteInventarioAccion = (history) => async (
// 	dispath,
// 	getState
// ) => {
// 	const token = getLocalStorage()
// 	let { offset } = getState().inventario
// 	offset = offset + 10
// 	try {
// 		const result = await axios.get(
// 			`${URI}${PORT}/api/inventario?offset=${offset}`,
// 			{
// 				headers: {
// 					authorization: `Bearer ${token}`,
// 				},
// 			}
// 		)

// 		dispath({
// 			type: OBTENER_INVENTARIO_EXITO,
// 			payload: result.data.data,
// 		})
// 	} catch (error) {
// 		if (error.request.status === 401) {
// 			removeLocalStorage()
// 			const message = 'La sesion a caducado, inicia sesion nuevamente'
// 			dispath(cerrarSesionAccion(history, message))
// 		}
// 		if (error.message === 'Network Error') {
// 			dispath({
// 				type: OBTENER_INVENTARIO_ERROR,
// 				payload: {
// 					message: 'Error de conexión con el servidor',
// 				},
// 			})
// 		} else
// 			dispath({
// 				type: OBTENER_INVENTARIO_ERROR,
// 				payload: {
// 					message: JSON.parse(error.request.response).message,
// 				},
// 			})
// 		setTimeout(() => {
// 			dispath({
// 				type: OBTENER_INVENTARIO_ERROR,
// 				payload: {
// 					message: '',
// 				},
// 			})
// 		}, 5000)
// 		console.log(error.request)
// 	}
// }

// export const nuevaVentaAccion = (data, history) => async (dispath) => {
// 	const token = getLocalStorage()

// 	try {
// 		const result = await axios.post(`${URI}${PORT}/api/ventas`, data, {
// 			headers: {
// 				authorization: `Bearer ${token}`,
// 			},
// 		})
// 		dispath({
// 			type: NUEVA_VENTA_EXITO,
// 			payload: {
// 				message: result.data.message,
// 			},
// 		})
// 		setTimeout(() => {
// 			dispath({
// 				type: NUEVA_VENTA_EXITO,
// 				payload: {
// 					message: '',
// 				},
// 			})
// 		}, 5000)
// 	} catch (error) {
// 		if (error.request.status === 401) {
// 			removeLocalStorage()
// 			const message = 'La sesion a caducado, inicia sesion nuevamente'
// 			dispath(cerrarSesionAccion(history, message))
// 			return history.push('/login')
// 		}
// 		dispath({
// 			type: NUEVA_VENTA_ERROR,
// 			payload: {
// 				message: JSON.parse(error.request.response).message,
// 			},
// 		})
// 		setTimeout(() => {
// 			dispath({
// 				type: NUEVA_VENTA_ERROR,
// 				payload: {
// 					message: '',
// 				},
// 			})
// 		}, 5000)
// 		console.log(error.request)
// 	}
// }

// export const editarVentaAccion = (data, history) => async (
// 	dispath,
// 	getState
// ) => {
// 	const token = getLocalStorage()
// 	try {
// 		const result = await axios.delete(
// 			`${URI}${PORT}/api/ventas/${data.codido}`,
// 			data,
// 			{
// 				headers: {
// 					authorization: `Bearer ${token}`,
// 				},
// 			}
// 		)

// 		const ventaEditado = getState().ventas.array.map((el) => {
// 			return el.codigo === result.data.data.codigo
// 				? (el = result.data.data)
// 				: el
// 		})

// 		dispath({
// 			type: ELIMINAR_VENTA_EXITO,
// 			payload: {
// 				array: ventaEditado,
// 				message: result.data.message,
// 			},
// 		})
// 		setTimeout(() => {
// 			dispath({
// 				type: ELIMINAR_VENTA_MESSAGE_EXITO,
// 				payload: {
// 					message: '',
// 				},
// 			})
// 		}, 5000)
// 	} catch (error) {
// 		if (error.request.status === 401) {
// 			removeLocalStorage()
// 			const message = 'La sesion a caducado, inicia sesion nuevamente'
// 			dispath(cerrarSesionAccion(history, message))
// 			return history.push('/login')
// 		}
// 		dispath({
// 			type: ELIMINAR_VENTA_ERROR,
// 			payload: {
// 				message: JSON.parse(error.request.response).message,
// 			},
// 		})
// 		setTimeout(() => {
// 			dispath({
// 				type: ELIMINAR_VENTA_ERROR,
// 				payload: {
// 					message: '',
// 				},
// 			})
// 		}, 5000)
// 		console.log(error.request)
// 	}
// }

// export const eliminarVentaAccion = (data, history) => async (dispath) => {
// 	const token = getLocalStorage()
// 	try {
// 		const result = await axios.delete(`${URI}${PORT}/api/ventas/${data.item}`, {
// 			headers: {
// 				authorization: `Bearer ${token}`,
// 			},
// 		})
// 		dispath({
// 			type: ELIMINAR_VENTA_EXITO,
// 			payload: {
// 				array: data.data,
// 				message: result.data.message,
// 			},
// 		})
// 		setTimeout(() => {
// 			dispath({
// 				type: ELIMINAR_VENTA_MESSAGE_EXITO,
// 				payload: {
// 					message: '',
// 				},
// 			})
// 		}, 5000)
// 	} catch (error) {
// 		if (error.request.status === 401) {
// 			removeLocalStorage()
// 			const message = 'La sesion a caducado, inicia sesion nuevamente'
// 			dispath(cerrarSesionAccion(history, message))
// 			return history.push('/login')
// 		}
// 		dispath({
// 			type: ELIMINAR_VENTA_ERROR,
// 			payload: {
// 				message: JSON.parse(error.request.response).message,
// 			},
// 		})
// 		setTimeout(() => {
// 			dispath({
// 				type: ELIMINAR_VENTA_ERROR,
// 				payload: {
// 					message: '',
// 				},
// 			})
// 		}, 5000)
// 		console.log(error.request)
// 	}
// }
