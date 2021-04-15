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
}

// Types
const OBTENER_COMPRAS_EXITO = 'OBTENER_COMPRAS_EXITO'
const OBTENER_COMPRAS_ERROR = 'OBTENER_COMPRAS_ERROR'
const OBTENER_COMPRA_EXITO = 'OBTENER_COMPRA_EXITO'
const OBTENER_COMPRA_ERROR = 'OBTENER_COMPRA_ERROR'
const NUEVA_COMPRA_EXITO = 'NUEVA_COMPRA_EXITO'
const NUEVA_COMPRA_ERROR = 'NUEVA_COMPRA_ERROR'
const ELIMINAR_COMPRA_EXITO = 'ELIMINAR_COMPRA_EXITO'
const ELIMINAR_COMPRA_MESSAGE_EXITO = 'ELIMINAR_COMPRA_MESSAGE_EXITO'
const ELIMINAR_COMPRA_ERROR = 'ELIMINAR_COMPRA_ERROR'

// Reducer
export default function comprasReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_COMPRAS_EXITO:
			return {
				...state,
				array: action.payload,
			}
		case OBTENER_COMPRAS_ERROR:
			return {
				...state,
				message: action.payload.message,
			}
		case OBTENER_COMPRA_EXITO:
			return {
				...state,
				array: action.payload,
			}
		case OBTENER_COMPRA_ERROR:
			return {
				...state,
				message: action.payload.message,
			}
		case NUEVA_COMPRA_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case NUEVA_COMPRA_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		case ELIMINAR_COMPRA_EXITO:
			return {
				...state,
				array: action.payload.array,
				message: action.payload.message,
				success: true,
			}
		case ELIMINAR_COMPRA_MESSAGE_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case ELIMINAR_COMPRA_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		default:
			return state
	}
}

//Acciones

export const obtenerComprasAccion = (history) => async (dispath) => {
	const token = getLocalStorage()
	try {
		const result = await axios.get(`${URI}${PORT}/api/compras`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		dispath({
			type: OBTENER_COMPRAS_EXITO,
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
				type: OBTENER_COMPRAS_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else
			dispath({
				type: OBTENER_COMPRAS_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})
		setTimeout(() => {
			dispath({
				type: OBTENER_COMPRAS_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const obtenerCompraAccion = (history, data) => async (dispath) => {
	const token = getLocalStorage()
	try {
		const result = await axios.get(`${URI}${PORT}/api/compras/${data}`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		dispath({
			type: OBTENER_COMPRA_EXITO,
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
				type: OBTENER_COMPRA_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else
			dispath({
				type: OBTENER_COMPRA_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})
		setTimeout(() => {
			dispath({
				type: OBTENER_COMPRA_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const nuevaCompraAccion = (
	data,
	history,
	setLoading,
	setLoadingTable,
	setResetForm
) => async (dispath) => {
	const token = getLocalStorage()

	try {
		setLoading(true)
		setLoadingTable(true)

		const result = await axios.post(`${URI}${PORT}/api/compras`, data, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		dispath({
			type: NUEVA_COMPRA_EXITO,
			payload: {
				message: result.data.message,
			},
		})

		setLoading(false)
		setLoadingTable(false)
		setResetForm(true)

		setTimeout(() => {
			dispath({
				type: NUEVA_COMPRA_EXITO,
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
		if (error.message === 'Network Error') {
			dispath({
				type: NUEVA_COMPRA_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else
			dispath({
				type: NUEVA_COMPRA_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})
		setLoading(false)
		setLoadingTable(false)
		setResetForm(false)

		setTimeout(() => {
			dispath({
				type: NUEVA_COMPRA_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const editarCompraAccion = (
	data,
	history,
	setLoading,
	handleVerEditarCerrar
) => async (dispath, getState) => {
	const token = getLocalStorage()
	try {
		setLoading(true)

		const result = await axios.delete(
			`${URI}${PORT}/api/compras/${data.codido}`,
			data,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		)

		const compraEditado = getState().compras.array.map((el) => {
			return el.codigo === result.data.data.codigo
				? (el = result.data.data)
				: el
		})

		dispath({
			type: ELIMINAR_COMPRA_EXITO,
			payload: {
				array: compraEditado,
				message: result.data.message,
			},
		})

		setLoading(false)
		handleVerEditarCerrar()

		setTimeout(() => {
			dispath({
				type: ELIMINAR_COMPRA_MESSAGE_EXITO,
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
		if (error.message === 'Network Error') {
			dispath({
				type: ELIMINAR_COMPRA_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else
			dispath({
				type: ELIMINAR_COMPRA_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})

		setLoading(false)
		handleVerEditarCerrar()

		setTimeout(() => {
			dispath({
				type: ELIMINAR_COMPRA_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const eliminarCompraAccion = (
	data,
	history,
	setLoading,
	setVerEliminar
) => async (dispath) => {
	const token = getLocalStorage()
	try {
		setLoading(true)

		const result = await axios.delete(
			`${URI}${PORT}/api/compras/${data.item}`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		)
		dispath({
			type: ELIMINAR_COMPRA_EXITO,
			payload: {
				array: data.data,
				message: result.data.message,
			},
		})

		setLoading(false)
		setVerEliminar(false)

		setTimeout(() => {
			dispath({
				type: ELIMINAR_COMPRA_MESSAGE_EXITO,
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
		if (error.message === 'Network Error') {
			dispath({
				type: ELIMINAR_COMPRA_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else
			dispath({
				type: ELIMINAR_COMPRA_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})

		setLoading(false)
		setVerEliminar(false)

		setTimeout(() => {
			dispath({
				type: ELIMINAR_COMPRA_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}
