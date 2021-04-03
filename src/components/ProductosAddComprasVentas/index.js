import { useEffect, useState } from 'react'

import Styles from './productosAddComprasVentas.module.css'
import SearchInput from 'components/Consultas/SearchInput'
import Preloader from 'components/Preloader/PreloaderItem'

const ProductosAddComprasVentas = ({
	data = [],
	addProductosForm,
	productoBorrado,
	inputDisabled = false,
}) => {
	const [itemLists, setItemLists] = useState([])
	const [loadingState, setLoadingState] = useState(false)

	useEffect(() => {
		data && setLoadingState(true)
		data.length !== 0 &&
			setItemLists(document.querySelectorAll(`.${Styles.item}`))

		const codigos = document.querySelectorAll(`.${Styles.btn}`)

		if (addProductosForm.productosList.length !== 0)
			return codigos.forEach((el) => {
				if (productoBorrado.productoBorrado === el.dataset.codigo) {
					el.classList.remove(Styles.disabled)
					productoBorrado.setProductoBorrado('')
				}
			})

		productoBorrado.setProductoBorrado('')

		if (addProductosForm.productosList.length === 0 && codigos.length !== 0) {
			codigos.forEach((el) => {
				if (el.classList.contains(Styles.disabled))
					el.classList.remove(Styles.disabled)
			})
		}
	}, [data, addProductosForm, productoBorrado])

	const handleButton = (item, e) => {
		e.target.classList.add(`${Styles.disabled}`)
		addProductosForm.setProductosList([...addProductosForm.productosList, item])
	}

	return (
		<div className={Styles.container}>
			<div className={Styles.filters}>
				<SearchInput itemLists={itemLists} />
			</div>
			<div className={Styles.result_container}>
				<div className={Styles.result}>
					{loadingState ? (
						<table className={Styles.table}>
							<thead>
								<tr className={Styles.header}>
									<th className={Styles.title}>Nombre</th>
									<th className={Styles.title}>Descripcion</th>
									<th className={Styles.title}>Categoria</th>
									<th className={Styles.title_btn}></th>
								</tr>
							</thead>
							<tbody>
								{data.length !== 0 ? (
									data.map((el, index) => {
										return (
											<tr key={index} className={Styles.item}>
												<td className={Styles.data}>{el.nombre}</td>
												<td className={Styles.data}>{el.descripcion}</td>
												<td className={Styles.data}>{el.categoria}</td>
												<td className={Styles.btn_container}>
													<button
														onClick={(e) => handleButton(el, e)}
														className={Styles.btn}
														data-codigo={el.codigo}
														disabled={inputDisabled}
													>
														<i
															className={`${Styles.btn_edit} fas fa-plus-square`}
														></i>
													</button>
												</td>
											</tr>
										)
										// return console.log(el)
									})
								) : (
									<tr className={Styles.item}>
										<td className={Styles.data}>
											No hay productos registrados
										</td>
									</tr>
								)}
							</tbody>
						</table>
					) : (
						<Preloader />
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductosAddComprasVentas
