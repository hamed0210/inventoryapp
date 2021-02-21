import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import productosDucks from './productosDucks'
import categoriasDucks from './categoriasDucks'
import clientesDucks from './clientesDucks'
import ventasDucks from './ventasDucks'
import usuariosDucks from './usuariosDucks'
import loginDucks from './loginDucks'

const rootReducer = combineReducers({
	login: loginDucks,
	productos: productosDucks,
	categorias: categoriasDucks,
	clientes: clientesDucks,
	ventas: ventasDucks,
	usuarios: usuariosDucks,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore() {
	const store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(thunk))
	)
	return store
}
