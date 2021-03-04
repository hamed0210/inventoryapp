import { useEffect, useState } from 'react'

import Styles from './consultas.module.css'
import SearchInput from './SearchInput'
import Item from 'components/Consultas/ItemConsultas'
import Preloader from 'components/Preloader/PreloaderItem'
import Eliminar from 'components/Consultas/Eliminar'
import FormEditarConsultas from 'components/Consultas/FormEditarConsultas'

const Consultas = ({
	dataHeader,
	dataFormEdit,
	data = [],
	dataSelect = [],
	dispatchEdit,
	dispatchDelete,
}) => {
	const [itemLists, setItemLists] = useState([])
	const [loadingState, setLoadingState] = useState(false)
	const [verEliminar, setVerEliminar] = useState(false)
	const [dataEliminar, setDataEliminar] = useState({})
	const [verEditar, setVerEditar] = useState(false)
	const [dataEditar, setDataEditar] = useState()

	useEffect(() => {
		data && setLoadingState(true)
	}, [data])

	const handleVerEliminar = (item, data) => {
		setVerEliminar(true)
		setDataEliminar({
			...dataEliminar,
			item,
			data,
		})
	}

	const handleVerEditar = (data) => {
		setVerEditar(true)
		setDataEditar(data)
	}

	const handleVerEditarCerrar = () => {
		setVerEditar(false)
		setDataEditar('')
	}

	return (
		<div className={Styles.container}>
			{verEditar && (
				<FormEditarConsultas
					dataFormEdit={dataFormEdit}
					dataSelect={dataSelect}
					data={dataEditar}
					dispatchEdit={dispatchEdit}
					handleVerEditarCerrar={handleVerEditarCerrar}
				/>
			)}
			{verEliminar && (
				<Eliminar
					setVerEliminar={setVerEliminar}
					dataEliminar={dataEliminar}
					dispatchDelete={dispatchDelete}
				/>
			)}
			<div className={Styles.filters}>
				<SearchInput itemLists={itemLists} />
			</div>
			<div className={Styles.result_container}>
				<div className={Styles.result}>
					{loadingState ? (
						<table className={Styles.table}>
							<thead>
								<tr className={Styles.header}>
									{dataHeader.map((el, index) => {
										return (
											<th key={index} className={Styles.title}>
												{el.title}
											</th>
										)
									})}
								</tr>
							</thead>
							<tbody>
								{data.length !== 0 ? (
									<Item
										data={data}
										setItemLists={setItemLists}
										handleVerEliminar={handleVerEliminar}
										handleVerEditar={handleVerEditar}
									/>
								) : (
									<tr className={Styles.item}>
										<td className={Styles.data}>
											{data.message ? data.message : 'No hay datos registrados'}
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

export default Consultas
