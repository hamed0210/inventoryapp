import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import MenuTab from 'components/MenuTab'
import Form from 'components/Form'
import Consultas from 'components/Consultas'
import { dataFormUsuarios, dataConsultasUsuarios } from 'components/DataForms'
import {
	obtenerUsuariosAccion,
	nuevoUsuarioAccion,
	eliminarUsuarioAccion,
	editarUsuarioAccion,
} from 'redux/usuariosDucks'

const Usuarios = ({ history }) => {
	const dispatch = useDispatch()
	const usuarios = useSelector((store) => store.usuarios.array)
	const usuariosMsg = useSelector((store) => store.usuarios.message)
	const usuariosMsgConsultas = useSelector(
		(store) => store.usuarios.messageConsultas
	)
	const usuariosActionSuccess = useSelector((store) => store.usuarios.success)
	const [components, setComponents] = useState('Nuevos')

	const handleClickTab = (e) => {
		setComponents(e)
		e === 'Consultas' && dispatch(obtenerUsuariosAccion(history))
	}

	const renderProps = () => {
		if (components === 'Nuevos')
			return (
				<Form
					dataLabel={dataFormUsuarios}
					dispatchNew={nuevoUsuarioAccion}
					messageProps={usuariosMsg}
					successProps={usuariosActionSuccess}
				/>
			)
		if (components === 'Consultas')
			return (
				<Consultas
					dataHeader={dataConsultasUsuarios}
					dataFormEdit={dataFormUsuarios}
					data={usuarios}
					dispatchEdit={editarUsuarioAccion}
					dispatchDelete={eliminarUsuarioAccion}
					messageProps={usuariosMsgConsultas}
					successProps={usuariosActionSuccess}
				/>
			)
	}

	return (
		<>
			<MenuTab handleProps={handleClickTab} />
			{renderProps()}
		</>
	)
}

export default withRouter(Usuarios)
