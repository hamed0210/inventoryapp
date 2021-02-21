import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './eliminar.module.css'

const Eliminar = ({
	history,
	setVerEliminar,
	dataEliminar,
	dispatchDelete,
}) => {
	const dispatch = useDispatch()

	const handleEliminar = () => {
		setVerEliminar(false)
		dispatch(dispatchDelete(dataEliminar, history))
	}

	const handleCancelar = () => {
		setVerEliminar(false)
	}

	return (
		<div className={Styles.container}>
			<div className={Styles.eliminar_container}>
				<h4 className={Styles.message}>
					Seguro quiere eliminar este elemento?
				</h4>
				<div className={Styles.btns_container}>
					<button
						onClick={handleEliminar}
						className={`${Styles.btn} ${Styles.btn_eliminar}`}
					>
						Eliminar
					</button>
					<button
						onClick={handleCancelar}
						className={`${Styles.btn} ${Styles.btn_cancelar}`}
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Eliminar)
