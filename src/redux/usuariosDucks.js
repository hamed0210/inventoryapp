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
const OBTENER_USUARIOS_EXITO = 'OBTENER_USUARIOS_EXITO'
const NUEVO_USUARIO_EXITO = 'NUEVO_USUARIO_EXITO'
const NUEVO_USUARIO_ERROR = 'NUEVO_USUARIO_ERROR'
const ELIMINAR_USUARIO_EXITO = 'ELIMINAR_USUARIO_EXITO'
const ELIMINAR_USUARIO_MESSAGE_EXITO = 'ELIMINAR_USUARIO_MESSAGE_EXITO'
const ELIMINAR_USUARIO_ERROR = 'ELIMINAR_USUARIO_ERROR'

// Reducer
export default function usuariosReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_USUARIOS_EXITO:
			return {
				...state,
				array: action.payload,
			}
		case NUEVO_USUARIO_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case NUEVO_USUARIO_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		case ELIMINAR_USUARIO_EXITO:
			return {
				...state,
				array: action.payload.array,
				messageConsultas: action.payload.message,
				success: true,
			}
		case ELIMINAR_USUARIO_MESSAGE_EXITO:
			return {
				...state,
				messageConsultas: action.payload.message,
				success: true,
			}
		case ELIMINAR_USUARIO_ERROR:
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

export const obtenerUsuariosAccion = (history) => async (dispath) => {
	const token = getLocalStorage()
	try {
		const result = await axios.get(`${URI}${PORT}/api/users`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		result.data.data.map((el) => {
			el['id'] = el['persona'].id
			el['nombres'] = el['persona'].nombres
			el['apellidos'] = el['persona'].apellidos
			el['cel'] = el['persona'].cel
			el['dir'] = el['persona'].dir
			el['ciudad'] = el['persona'].ciudad
			return delete el['persona']
		})
		dispath({
			type: OBTENER_USUARIOS_EXITO,
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

export const nuevoUsuarioAccion = (data, history) => async (dispath) => {
	const token = getLocalStorage()

	try {
		const result = await axios.post(`${URI}${PORT}/api/users`, data, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		dispath({
			type: NUEVO_USUARIO_EXITO,
			payload: {
				message: result.data.message,
			},
		})
		setTimeout(() => {
			dispath({
				type: NUEVO_USUARIO_EXITO,
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
			type: NUEVO_USUARIO_ERROR,
			payload: {
				message: JSON.parse(error.request.response).message,
			},
		})
		setTimeout(() => {
			dispath({
				type: NUEVO_USUARIO_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const eliminarUsuarioAccion = (data, history) => async (dispath) => {
	const token = getLocalStorage()
	try {
		const result = await axios.delete(`${URI}${PORT}/api/users/${data.item}`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		dispath({
			type: ELIMINAR_USUARIO_EXITO,
			payload: {
				array: data.data,
				message: result.data.message,
			},
		})
		setTimeout(() => {
			dispath({
				type: ELIMINAR_USUARIO_MESSAGE_EXITO,
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
			type: ELIMINAR_USUARIO_ERROR,
			payload: {
				message: JSON.parse(error.request.response).message,
			},
		})
		setTimeout(() => {
			dispath({
				type: ELIMINAR_USUARIO_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}
