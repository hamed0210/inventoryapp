import { Route, Redirect } from 'react-router-dom'

import Styles from './main.module.css'
import Productos from 'components/Productos'
import Ventas from 'components/Ventas'
import Usuarios from 'components/Usuarios'
import Clientes from 'components/Clientes'
import Perfil from 'components/Perfil'

const Main = () => {
	return (
		<section className={Styles.container}>
			<Route exact path='/productos'>
				<Productos />
			</Route>
			<Route exact path='/clientes'>
				<Clientes />
			</Route>
			<Route exact path='/ventas'>
				<Ventas />
			</Route>
			<Route exact path='/usuarios'>
				<Usuarios />
			</Route>
			<Route exact path='/perfil'>
				<Perfil />
			</Route>
			<Route exact path='/'>
				<Redirect to='/productos' />
			</Route>
		</section>
	)
}

export default Main
