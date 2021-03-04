import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import MenuTab from 'components/MenuTab'
import Form from 'components/Form'
import Consultas from 'components/Consultas'
import Message from 'components/Message'
import {
	dataFormProveedores,
	dataConsultasProveedores,
} from 'components/DataForms'
import {
	obtenerProveedoresAccion,
	nuevoProveedorAccion,
	editarProveedorAccion,
	eliminarProveedorAccion,
} from 'redux/ProveedoresDucks'

const Proveedores = ({ history }) => {
	const dispatch = useDispatch()
	const proveedores = useSelector((store) => store.proveedores.array)
	let proveedoresMsg = useSelector((store) => store.proveedores.message)
	const proveedoresActionSuccess = useSelector(
		(store) => store.proveedores.success
	)

	const [components, setComponents] = useState('Nuevos')

	const handleClickTab = (e) => {
		setComponents(e)
		e === 'Consultas' && dispatch(obtenerProveedoresAccion(history))
	}

	const renderProps = () => {
		if (components === 'Nuevos')
			return (
				<Form
					dataLabel={dataFormProveedores}
					dispatchNew={nuevoProveedorAccion}
				/>
			)
		if (components === 'Consultas')
			return (
				<Consultas
					dataHeader={dataConsultasProveedores}
					dataFormEdit={dataFormProveedores}
					data={proveedores}
					dispatchEdit={editarProveedorAccion}
					dispatchDelete={eliminarProveedorAccion}
				/>
			)
	}

	return (
		<>
			<MenuTab handleProps={handleClickTab} />
			{renderProps()}
			{proveedoresMsg !== '' && (
				<Message
					msgProps={proveedoresMsg}
					successProps={proveedoresActionSuccess}
				/>
			)}
		</>
	)
}

export default withRouter(Proveedores)
