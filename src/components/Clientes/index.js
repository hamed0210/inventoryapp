import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import MenuTab from 'components/MenuTab'
import Form from 'components/Form'
import Consultas from 'components/Consultas'
import { dataFormClientes, dataConsultasClientes } from 'components/DataForms'
import {
	obtenerClientesAccion,
	nuevoClienteAccion,
	eliminarClienteAccion,
} from 'redux/clientesDucks'

const Clientes = ({ history }) => {
	const dispatch = useDispatch()
	const clientes = useSelector((store) => store.clientes.array)
	const clientesMsg = useSelector((store) => store.clientes.message)
	const clientesMsgConsultas = useSelector(
		(store) => store.clientes.messageConsultas
	)
	const clientesActionSuccess = useSelector((store) => store.clientes.success)
	const [components, setComponents] = useState('Nuevos')

	const handleClickTab = (e) => {
		setComponents(e)
		e === 'Consultas' && dispatch(obtenerClientesAccion(history))
	}

	const renderProps = () => {
		if (components === 'Nuevos')
			return (
				<Form
					dataLabel={dataFormClientes}
					dispatchNew={nuevoClienteAccion}
					messageProps={clientesMsg}
					successProps={clientesActionSuccess}
				/>
			)
		if (components === 'Consultas')
			return (
				<Consultas
					dataHeader={dataConsultasClientes}
					data={clientes}
					dispatchDelete={eliminarClienteAccion}
					messageProps={clientesMsgConsultas}
					successProps={clientesActionSuccess}
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

export default withRouter(Clientes)
