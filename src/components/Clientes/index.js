import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import MenuTab from 'components/MenuTab'
import Form from 'components/Form'
import Consultas from 'components/Consultas'
import Message from 'components/Message'
import { dataFormClientes, dataConsultasClientes } from 'components/DataForms'
import {
	obtenerClientesAccion,
	nuevoClienteAccion,
	editarClienteAccion,
	eliminarClienteAccion,
} from 'redux/clientesDucks'

const Clientes = ({ history }) => {
	const dispatch = useDispatch()
	const clientes = useSelector((store) => store.clientes.array)
	let clientesMsg = useSelector((store) => store.clientes.message)
	const clientesActionSuccess = useSelector((store) => store.clientes.success)

	const [components, setComponents] = useState('Nuevos')

	const handleClickTab = (e) => {
		setComponents(e)
		e === 'Consultas' && dispatch(obtenerClientesAccion(history))
	}

	const renderProps = () => {
		if (components === 'Nuevos')
			return (
				<Form dataLabel={dataFormClientes} dispatchNew={nuevoClienteAccion} />
			)
		if (components === 'Consultas')
			return (
				<Consultas
					dataHeader={dataConsultasClientes}
					dataFormEdit={dataFormClientes}
					data={clientes}
					dispatchEdit={editarClienteAccion}
					dispatchDelete={eliminarClienteAccion}
				/>
			)
	}

	return (
		<>
			<MenuTab handleProps={handleClickTab} />
			{renderProps()}
			{clientesMsg !== '' && (
				<Message msgProps={clientesMsg} successProps={clientesActionSuccess} />
			)}
		</>
	)
}

export default withRouter(Clientes)
