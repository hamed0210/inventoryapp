import { useEffect, useState } from 'react'

import Styles from './selectInputConsultas.module.css'
import SearchInput from 'components/Consultas/SearchInput'
import Item from 'components/Consultas/ItemConsultas'
import Preloader from 'components/Preloader/PreloaderItem'
import Eliminar from 'components/Consultas/Eliminar'
import FormEditarConsultas from 'components/Consultas/FormEditarConsultas'
import { dataFormCategorias as dataFormEdit } from 'components/DataForms'

const SelectInputConsultas = ({
	dataHeader,
	data = [],
	dispatchDelete,
	dispatchEdit,
	messageProps,
	successProps,
	handleCerrarConsultas,
}) => {
	const [itemLists, setItemLists] = useState([])
	const [loadingState, setLoadingState] = useState(false)
	const [verEliminar, setVerEliminar] = useState(false)
	const [dataEliminar, setDataEliminar] = useState({})
	const [verEditar, setVerEditar] = useState(false)
	const [dataEditar, setDataEditar] = useState('')

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

	const handleCerrar = () => {
		handleCerrarConsultas()
	}

	const handleCancel = () => {
		setVerEditar(false)
	}

	const handleMessage = () => {
		if (messageProps !== '') {
			if (successProps)
				return (
					<div className={Styles.message_container}>
						<div className={`${Styles.message_success_container}`}>
							<span className={Styles.message_success}>{messageProps}</span>
						</div>
					</div>
				)
			if (!successProps)
				return (
					<div className={Styles.message_container}>
						<div className={`${Styles.error_container}`}>
							<span className={Styles.error}>{messageProps}</span>
						</div>
					</div>
				)
		}
	}

	return (
		<div className={Styles.container}>
			{handleMessage()}
			{verEditar && (
				<FormEditarConsultas
					dataFormEdit={dataFormEdit}
					data={dataEditar}
					dispatchEdit={dispatchEdit}
					handleVerEditarCerrar={handleCancel}
				/>
			)}
			{verEliminar && (
				<Eliminar
					setVerEliminar={setVerEliminar}
					dataEliminar={dataEliminar}
					dispatchDelete={dispatchDelete}
				/>
			)}
			<div className={Styles.cerrar_container}>
				<button onClick={handleCerrar} className={Styles.btn_cerrar}>
					<i className={`fas fa-window-close`}></i>
				</button>
			</div>
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

export default SelectInputConsultas
