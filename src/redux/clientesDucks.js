import axios from 'axios'

import { getLocalStorage, removeLocalStorage } from 'helpers'
import { cerrarSesionAccion } from 'redux/loginDucks'

// Constantes
const URI = process.env.REACT_APP_URI
const PORT = process.env.REACT_APP_PORT

const dataInicial = {
	array: [],
	message: '',
	messageConsultas: '',
	success: false,
}

// Types
const OBTENER_CLIENTES_EXITO = 'OBTENER_CLIENTES_EXITO'
const NUEVO_CLIENTE_EXITO = 'NUEVO_CLIENTE_EXITO'
const NUEVO_CLIENTE_ERROR = 'NUEVO_CLIENTE_ERROR'
const ELIMINAR_CLIENTE_EXITO = 'ELIMINAR_CLIENTE_EXITO'
const ELIMINAR_CLIENTE_MESSAGE_EXITO = 'ELIMINAR_CLIENTE_MESSAGE_EXITO'
const ELIMINAR_CLIENTE_ERROR = 'ELIMINAR_CLIENTE_ERROR'

// Reducer
export default function clientesReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_CLIENTES_EXITO:
			return {
				...state,
				array: action.payload,
				message: '',
			}
		case NUEVO_CLIENTE_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case NUEVO_CLIENTE_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		case ELIMINAR_CLIENTE_EXITO:
			return {
				...state,
				array: action.payload.array,
				messageConsultas: action.payload.message,
				success: true,
			}
		case ELIMINAR_CLIENTE_MESSAGE_EXITO:
			return {
				...state,
				messageConsultas: action.payload.message,
				success: true,
			}
		case ELIMINAR_CLIENTE_ERROR:
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

export const obtenerClientesAccion = (history) => async (dispath) => {
	const token = getLocalStorage()
	try {
		const result = await axios.get(`${URI}${PORT}/api/clientes`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		dispath({
			type: OBTENER_CLIENTES_EXITO,
			payload: result.data.data,
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

export const nuevoClienteAccion = (data, history) => async (dispath) => {
	const token = getLocalStorage()

	try {
		const result = await axios.post(`${URI}${PORT}/api/clientes`, data, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		dispath({
			type: NUEVO_CLIENTE_EXITO,
			payload: {
				message: result.data.message,
			},
		})
		setTimeout(() => {
			dispath({
				type: NUEVO_CLIENTE_EXITO,
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
			type: NUEVO_CLIENTE_ERROR,
			payload: {
				message: JSON.parse(error.request.response).message,
			},
		})
		setTimeout(() => {
			dispath({
				type: NUEVO_CLIENTE_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const editarClienteAccion = (data, history) => async (
	dispath,
	getState
) => {
	const token = getLocalStorage()
	try {
		const result = await axios.put(
			`${URI}${PORT}/api/clientes/${data.id}`,
			data,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		)

		const clienteEditado = getState().clientes.array.map((el) => {
			return el.id === result.data.data.id ? (el = result.data.data) : el
		})

		dispath({
			type: ELIMINAR_CLIENTE_EXITO,
			payload: {
				array: clienteEditado,
				message: result.data.message,
				// message: `cliente con id ${data.id} editado correctamente`,
			},
		})
		setTimeout(() => {
			dispath({
				type: ELIMINAR_CLIENTE_MESSAGE_EXITO,
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
			type: ELIMINAR_CLIENTE_ERROR,
			payload: {
				message: JSON.parse(error.request.response).message,
			},
		})
		setTimeout(() => {
			dispath({
				type: ELIMINAR_CLIENTE_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const eliminarClienteAccion = (data, history) => async (dispath) => {
	const token = getLocalStorage()
	try {
		const result = await axios.delete(
			`${URI}${PORT}/api/clientes/${data.item}`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		)
		dispath({
			type: ELIMINAR_CLIENTE_EXITO,
			payload: {
				array: data.data,
				// message: 'cliente eliminado correctamente',
				message: result.data.message,
			},
		})
		setTimeout(() => {
			dispath({
				type: ELIMINAR_CLIENTE_MESSAGE_EXITO,
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
			type: ELIMINAR_CLIENTE_ERROR,
			payload: {
				message: JSON.parse(error.request.response).message,
			},
		})
		setTimeout(() => {
			dispath({
				type: ELIMINAR_CLIENTE_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}
