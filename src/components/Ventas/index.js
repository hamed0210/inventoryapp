import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MenuTab from 'components/MenuTab'
import Form from 'components/Form'
import Consultas from 'components/Consultas'
import { dataFormVentas, dataConsultasVentas } from 'components/DataForms'
import {
	obtenerVentasAccion,
	nuevaVentaAccion,
	eliminarVentaAccion,
	editarVentaAccion,
} from 'redux/ventasDucks'

const Ventas = ({ history }) => {
	const dispatch = useDispatch()
	const ventas = useSelector((store) => store.ventas.array)
	const ventasMsg = useSelector((store) => store.ventas.message)
	const ventasMsgConsultas = useSelector(
		(store) => store.ventas.messageConsultas
	)
	const ventasActionSuccess = useSelector((store) => store.ventas.success)
	const [components, setComponents] = useState('Nuevos')

	const handleClickTab = (e) => {
		setComponents(e)
		e === 'Consultas' && dispatch(obtenerVentasAccion(history))
	}

	const renderProps = () => {
		if (components === 'Nuevos')
			return (
				<Form
					dataLabel={dataFormVentas}
					dispatchNew={nuevaVentaAccion}
					messageProps={ventasMsg}
					successProps={ventasActionSuccess}
				/>
			)
		if (components === 'Consultas')
			return (
				<Consultas
					dataHeader={dataConsultasVentas}
					dataFormEdit={dataFormVentas}
					data={ventas}
					dispatchEdit={editarVentaAccion}
					dispatchDelete={eliminarVentaAccion}
					messageProps={ventasMsgConsultas}
					successProps={ventasActionSuccess}
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

export default withRouter(Ventas)
