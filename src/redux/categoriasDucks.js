import axios from 'axios'

import { cerrarSesionAccion } from 'redux/loginDucks'
import { getLocalStorage, removeLocalStorage } from 'helpers'

// Constantes
const URI = process.env.REACT_APP_URI
const PORT = process.env.REACT_APP_PORT

const dataInicial = {
	array: [],
	message: '',
}

// Types
const OBTENER_CATEGORIAS_EXITO = 'OBTENER_CATEGORIAS_EXITO'
const NUEVA_CATEGORIA_EXITO = 'NUEVA_CATEGORIA_EXITO'
const NUEVA_CATEGORIA_ERROR = 'NUEVA_CATEGORIA_ERROR'
const ELIMINAR_CATEGORIA_EXITO = 'ELIMINAR_CATEGORIA_EXITO'
const ELIMINAR_CATEGORIA_MESSAGE_EXITO = 'ELIMINAR_CATEGORIA_MESSAGE_EXITO'
const ELIMINAR_CATEGORIA_ERROR = 'ELIMINAR_CATEGORIA_ERROR'

// Reducer
export default function categoriasReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_CATEGORIAS_EXITO:
			return {
				...state,
				array: action.payload.data,
			}
		case NUEVA_CATEGORIA_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case NUEVA_CATEGORIA_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		case ELIMINAR_CATEGORIA_EXITO:
			return {
				...state,
				array: action.payload.array,
				messageConsultas: action.payload.message,
				success: true,
			}
		case ELIMINAR_CATEGORIA_MESSAGE_EXITO:
			return {
				...state,
				messageConsultas: action.payload.message,
				success: true,
			}
		case ELIMINAR_CATEGORIA_ERROR:
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

export const obtenerCategoriasAccion = (history) => async (dispath) => {
	const token = getLocalStorage()
	try {
		const result = await axios.get(`${URI}${PORT}/api/categorias`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		dispath({
			type: OBTENER_CATEGORIAS_EXITO,
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

export const nuevaCategoriaAccion = (data, history) => async (dispath) => {
	const token = getLocalStorage()

	try {
		const result = await axios.post(`${URI}${PORT}/api/categorias`, data, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		dispath({
			type: NUEVA_CATEGORIA_EXITO,
			payload: {
				message: result.data.message,
			},
		})
		setTimeout(() => {
			dispath({
				type: NUEVA_CATEGORIA_EXITO,
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
			type: NUEVA_CATEGORIA_ERROR,
			payload: {
				message: JSON.parse(error.request.response).message,
			},
		})
		setTimeout(() => {
			dispath({
				type: NUEVA_CATEGORIA_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const eliminarCategoriaAccion = (data, history) => async (dispath) => {
	const token = getLocalStorage()
	try {
		const result = await axios.delete(
			`${URI}${PORT}/api/categorias/${data.item}`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		)
		dispath({
			type: ELIMINAR_CATEGORIA_EXITO,
			payload: {
				array: data.data,
				message: result.data.message,
			},
		})
		setTimeout(() => {
			dispath({
				type: ELIMINAR_CATEGORIA_MESSAGE_EXITO,
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
			type: ELIMINAR_CATEGORIA_ERROR,
			payload: {
				message: JSON.parse(error.request.response).message,
			},
		})
		setTimeout(() => {
			dispath({
				type: ELIMINAR_CATEGORIA_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}
