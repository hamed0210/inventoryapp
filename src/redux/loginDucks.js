import axios from 'axios'
// import { createBrowserHistory } from 'history'
import { saveLocalStorage, removeLocalStorage } from 'helpers'

// const historyApp = createBrowserHistory()

// Constantes
const URI = process.env.REACT_APP_URI
const PORT = process.env.REACT_APP_PORT

const dataInicial = {
	user: [],
	message: '',
}

// Types
const INICIAR_SESION_EXITO = 'INICIAR_SESION_EXITO'
const INICIAR_SESION_ERROR = 'INICIAR_SESION_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'

// Reducer
export default function loginReducer(state = dataInicial, action) {
	switch (action.type) {
		case INICIAR_SESION_EXITO:
			return {
				...state,
				user: action.payload.user,
				message: '',
			}
		case INICIAR_SESION_ERROR:
			return {
				...state,
				message: action.payload.message,
			}
		case CERRAR_SESION:
			return {
				user: [],
				message: action.payload.message,
			}
		// return { ...dataInicial }
		default:
			return state
	}
}

//Acciones

export const iniciarSesionAccion = (data, history) => async (dispath) => {
	try {
		const res = await axios.post(`${URI}${PORT}/api/signin`, data)
		if (res.data.token) {
			const result = await axios.get(`${URI}${PORT}/api/check`, {
				headers: {
					authorization: `Bearer ${res.data.token}`,
				},
			})
			dispath({
				type: INICIAR_SESION_EXITO,
				payload: {
					user: result.data.user,
					message: '',
				},
			})
			saveLocalStorage(res.data.token)
			history.push('/')
		}
	} catch (error) {
		console.log(error.request)
		dispath({
			type: INICIAR_SESION_ERROR,
			payload: {
				message: JSON.parse(error.request.response).message,
			},
		})
	}
}

export const cerrarSesionAccion = (history, message = '') => async (
	dispath
) => {
	dispath({
		type: CERRAR_SESION,
		payload: {
			message,
		},
	})
	removeLocalStorage()
	history.push('/login')
}