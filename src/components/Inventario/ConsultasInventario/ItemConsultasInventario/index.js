import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import Styles from './itemConsultasInventario.module.css'

const ItemConsultasIventario = ({
	data,
	setItemLists,
	handleVerEliminar,
	handleVerEditForm,
}) => {
	useEffect(() => {
		data.length !== 0 &&
			setItemLists(document.querySelectorAll(`.${Styles.item}`))
	}, [data, setItemLists])

	const handleEditButton = (item) => {
		handleVerEditForm(item)
	}

	const handleDeleteButton = (item) => {
		let dataFiltrado = []
		if (typeof item === 'number') {
			dataFiltrado = data.filter((el) => el.id !== item)
		}
		if (typeof item === 'string') {
			dataFiltrado = data.filter((el) => el.codigo !== item)
		}
		handleVerEliminar(item, dataFiltrado)
	}

	const handleRender = () => {
		let dataRender = []
		let itemDataRender = []
		if (data.length !== 0) {
			data.map((el, index) => {
				if (el.hasOwnProperty('fecha_creacion'))
					el['fecha_creacion'] = el['fecha_creacion'].substr(0, 10)
				for (const i in el) {
					itemDataRender.push(
						<td
							key={i}
							className={
								i === 'productos'
									? `${Styles.data} ${Styles.data_productos}`
									: Styles.data
							}
						>
							{i === 'id' ? index + 1 : el[i]}
						</td>
					)
				}
				dataRender.push(
					<tr key={index} className={Styles.item}>
						{itemDataRender}
						<td className={Styles.data}>
							<span className={Styles.btns}>
								<span
									onClick={() => handleEditButton(el)}
									className={Styles.btn}
								>
									<i className={`${Styles.btn_edit} fas fa-edit`}></i>
								</span>
								<span
									onClick={() => handleDeleteButton(el.id)}
									className={Styles.btn}
								>
									<i className={`${Styles.btn_delete} fas fa-trash-alt`}></i>
								</span>
							</span>
						</td>
					</tr>
				)

				itemDataRender = []
				return dataRender
			})
		}
		return dataRender
	}

	return handleRender()
}

export default withRouter(ItemConsultasIventario)
