import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import Styles from './itemConsultas.module.css'

const ItemConsultas = ({
	data,
	setItemLists,
	handleVerEliminar,
	handleVerEditar,
}) => {
	const id_userStore = useSelector((store) => store.login.user.persona.id)

	useEffect(() => {
		data && setItemLists(document.querySelectorAll(`.${Styles.item}`))
	}, [data, setItemLists])

	const handleEditButton = (item) => {
		handleVerEditar(item)
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
		if (data) {
			data.map((el, index) => {
				if (el.hasOwnProperty('fecha_creacion'))
					el['fecha_creacion'] = el['fecha_creacion'].substr(0, 10)
				if (el.hasOwnProperty('fecha_venta'))
					el['fecha_venta'] = el['fecha_venta'].substr(0, 10)
				if (el.hasOwnProperty('fecha_compra'))
					el['fecha_compra'] = el['fecha_compra'].substr(0, 10)

				for (const i in el) {
					if (i !== 'cantidad_ventas')
						itemDataRender.push(
							<td
								key={i}
								className={
									i === 'productos'
										? `${Styles.data} ${Styles.data_productos}`
										: i === 'stock' && el.stock > 0 && el.stock <= 10
										? `${Styles.data} ${Styles.stock_agotandose}`
										: i === 'stock' && el.stock === 0
										? `${Styles.data} ${Styles.stock_agotado}`
										: Styles.data
								}
							>
								{el[i]}
							</td>
						)
				}
				/*
				  verificamos si los datos obtenidos contiene los datos del usuario registado para no pintarlos al consultar todos los usuarios regitrados ya que este tiene su propio componente (Perfil) para ver y editar sus datos
				 */
				if (el.id !== id_userStore) {
					dataRender.push(
						<tr
							key={index}
							className={
								el.stock > 0 && el.stock <= 10
									? `${Styles.item_agotandose} ${Styles.item}`
									: el.stock === 0
									? `${Styles.item_agotado} ${Styles.item}`
									: Styles.item
							}
						>
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
				} else {
					dataRender.push(
						<tr key={0} className={Styles.item}>
							<td className={Styles.data_null}>{'No hay datos registrados'}</td>
						</tr>
					)
				}
				itemDataRender = []
				return dataRender
			})
		}
		return dataRender
	}

	return handleRender()
}

export default ItemConsultas
