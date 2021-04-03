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
const OBTENER_PROVEEDORES_EXITO = 'OBTENER_PROVEEDORES_EXITO'
const OBTENER_PROVEEDORES_ERROR = 'OBTENER_PROVEEDORES_ERROR'
const NUEVO_PROVEEDOR_EXITO = 'NUEVO_PROVEEDOR_EXITO'
const NUEVO_PROVEEDOR_ERROR = 'NUEVO_PROVEEDOR_ERROR'
const ELIMINAR_PROVEEDOR_EXITO = 'ELIMINAR_PROVEEDOR_EXITO'
const ELIMINAR_PROVEEDOR_MESSAGE_EXITO = 'ELIMINAR_PROVEEDOR_MESSAGE_EXITO'
const ELIMINAR_PROVEEDOR_ERROR = 'ELIMINAR_PROVEEDOR_ERROR'

// Reducer
export default function proveedoresReducer(state = dataInicial, action) {
	switch (action.type) {
		case OBTENER_PROVEEDORES_EXITO:
			return {
				...state,
				array: action.payload,
				// message: '',
			}
		case OBTENER_PROVEEDORES_ERROR:
			return {
				...state,
				message: action.payload.message,
			}
		case NUEVO_PROVEEDOR_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case NUEVO_PROVEEDOR_ERROR:
			return {
				...state,
				message: action.payload.message,
				success: false,
			}
		case ELIMINAR_PROVEEDOR_EXITO:
			return {
				...state,
				array: action.payload.array,
				message: action.payload.message,
				success: true,
			}
		case ELIMINAR_PROVEEDOR_MESSAGE_EXITO:
			return {
				...state,
				message: action.payload.message,
				success: true,
			}
		case ELIMINAR_PROVEEDOR_ERROR:
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

export const obtenerProveedoresAccion = (history) => async (dispath) => {
	const token = getLocalStorage()
	try {
		const result = await axios.get(`${URI}${PORT}/api/proveedores`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		dispath({
			type: OBTENER_PROVEEDORES_EXITO,
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
				type: OBTENER_PROVEEDORES_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else
			dispath({
				type: OBTENER_PROVEEDORES_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})
		setTimeout(() => {
			dispath({
				type: OBTENER_PROVEEDORES_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const nuevoProveedorAccion = (
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

		const result = await axios.post(`${URI}${PORT}/api/proveedores`, data, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		dispath({
			type: NUEVO_PROVEEDOR_EXITO,
			payload: {
				message: result.data.message,
			},
		})

		setLoading(false)
		setLoadingTable(false)
		setResetForm(true)

		setTimeout(() => {
			dispath({
				type: NUEVO_PROVEEDOR_EXITO,
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
				type: NUEVO_PROVEEDOR_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else
			dispath({
				type: NUEVO_PROVEEDOR_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})

		setLoading(false)
		setLoadingTable(false)
		setResetForm(false)

		setTimeout(() => {
			dispath({
				type: NUEVO_PROVEEDOR_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const editarProveedorAccion = (
	data,
	history,
	setLoading,
	handleVerEditarCerrar
) => async (dispath, getState) => {
	const token = getLocalStorage()
	try {
		setLoading(true)

		const result = await axios.put(
			`${URI}${PORT}/api/proveedores/${data.id}`,
			data,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		)

		const proveedorEditado = getState().proveedores.array.map((el) => {
			return el.id === result.data.data.id ? (el = result.data.data) : el
		})

		dispath({
			type: ELIMINAR_PROVEEDOR_EXITO,
			payload: {
				array: proveedorEditado,
				message: result.data.message,
			},
		})

		setLoading(false)
		handleVerEditarCerrar()

		setTimeout(() => {
			dispath({
				type: ELIMINAR_PROVEEDOR_MESSAGE_EXITO,
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
				type: ELIMINAR_PROVEEDOR_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else
			dispath({
				type: ELIMINAR_PROVEEDOR_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})

		setLoading(false)
		handleVerEditarCerrar()

		setTimeout(() => {
			dispath({
				type: ELIMINAR_PROVEEDOR_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}

export const eliminarProveedorAccion = (
	data,
	history,
	setLoading,
	setVerEliminar
) => async (dispath) => {
	const token = getLocalStorage()
	try {
		setLoading(true)

		const result = await axios.delete(
			`${URI}${PORT}/api/proveedores/${data.item}`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		)
		dispath({
			type: ELIMINAR_PROVEEDOR_EXITO,
			payload: {
				array: data.data,
				// message: 'PROVEEDOR eliminado correctamente',
				message: result.data.message,
			},
		})

		setLoading(false)
		setVerEliminar(false)

		setTimeout(() => {
			dispath({
				type: ELIMINAR_PROVEEDOR_MESSAGE_EXITO,
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
				type: ELIMINAR_PROVEEDOR_ERROR,
				payload: {
					message: 'Error de conexión con el servidor',
				},
			})
		} else {
			dispath({
				type: ELIMINAR_PROVEEDOR_ERROR,
				payload: {
					message: JSON.parse(error.request.response).message,
				},
			})
		}

		setLoading(false)
		setVerEliminar(false)

		setTimeout(() => {
			dispath({
				type: ELIMINAR_PROVEEDOR_ERROR,
				payload: {
					message: '',
				},
			})
		}, 5000)
		console.log(error.request)
	}
}
