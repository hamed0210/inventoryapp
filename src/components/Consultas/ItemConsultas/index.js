import { useEffect } from 'react'

import Styles from './itemConsultas.module.css'

const ItemConsultas = ({ data, setItemLists, handleVerEliminar }) => {
	useEffect(() => {
		data && setItemLists(document.querySelectorAll(`.${Styles.item}`))
	}, [data, setItemLists])

	const handleEditButton = (item) => {}

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
		if (data) {
			data.map((el, index) => {
				if (el.hasOwnProperty('fecha_creacion'))
					el['fecha_creacion'] = el['fecha_creacion'].substr(0, 10)

				for (const i in el) {
					itemDataRender.push(
						<td key={i} className={Styles.data}>
							{el[i]}
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
									onClick={() => handleDeleteButton(el.codigo || el.id)}
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

export default ItemConsultas