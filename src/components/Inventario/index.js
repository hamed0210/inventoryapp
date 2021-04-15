import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Consultas from 'components/Inventario/ConsultasInventario'
import Message from 'components/Message'
import { dataFormVentas, dataConsultasInventario } from 'components/DataForms'
import { obtenerInventarioAccion } from 'redux/inventarioDucks'

const Inventario = ({ history }) => {
	const dispatch = useDispatch()
	const inventario = useSelector((store) => store.inventario.array)
	const inventarioMsg = useSelector((store) => store.inventario.message)
	const inventarioActionSuccess = useSelector(
		(store) => store.inventario.success
	)

	useEffect(() => {
		dispatch(obtenerInventarioAccion(history))
	}, [dispatch, history])

	return (
		<>
			<Consultas
				dataHeader={dataConsultasInventario}
				dataFormEdit={dataFormVentas}
				data={inventario}
				// dispatchEdit={editarVentaAccion}
				// dispatchDelete={eliminarVentaAccion}
			/>
			{inventarioMsg !== '' && (
				<Message
					msgProps={inventarioMsg}
					successProps={inventarioActionSuccess}
				/>
			)}
		</>
	)
}

export default withRouter(Inventario)
