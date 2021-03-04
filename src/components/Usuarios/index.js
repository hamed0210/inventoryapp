import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import MenuTab from 'components/MenuTab'
import Form from 'components/Form'
import Consultas from 'components/Consultas'
import Message from 'components/Message'
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
	const usuariosActionSuccess = useSelector((store) => store.usuarios.success)
	const [components, setComponents] = useState('Nuevos')

	const handleClickTab = (e) => {
		setComponents(e)
		e === 'Consultas' && dispatch(obtenerUsuariosAccion(history))
	}

	const renderProps = () => {
		if (components === 'Nuevos')
			return (
				<Form dataLabel={dataFormUsuarios} dispatchNew={nuevoUsuarioAccion} />
			)
		if (components === 'Consultas')
			return (
				<Consultas
					dataHeader={dataConsultasUsuarios}
					dataFormEdit={dataFormUsuarios}
					data={usuarios}
					dispatchEdit={editarUsuarioAccion}
					dispatchDelete={eliminarUsuarioAccion}
				/>
			)
	}

	return (
		<>
			<MenuTab handleProps={handleClickTab} />
			{renderProps()}
			{usuariosMsg !== '' && (
				<Message msgProps={usuariosMsg} successProps={usuariosActionSuccess} />
			)}
		</>
	)
}

export default withRouter(Usuarios)
