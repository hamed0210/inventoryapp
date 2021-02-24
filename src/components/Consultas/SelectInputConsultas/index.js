import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Styles from './selectInputConsultas.module.css'
import SearchInput from 'components/Consultas/SearchInput'
import Item from 'components/Consultas/ItemConsultas'
import Preloader from 'components/Preloader/PreloaderItem'
import Eliminar from 'components/Consultas/Eliminar'

const SelectInputConsultas = ({
	history,
	dataHeader,
	data = [],
	dispatchDelete,
	dispatchEdit,
	messageProps,
	successProps,
	handleCerrarConsultas,
}) => {
	const dispatch = useDispatch()
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

	const handleInputChange = (e) => {
		setDataEditar({
			...dataEditar,
			[e.target.name]: e.target.value,
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

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(dispatchEdit(dataEditar, history))
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
				<div className={Styles.container_editar}>
					<form className={Styles.form_editar} onSubmit={handleSubmit}>
						<div className={Styles.inputGroup_editar}>
							<label className={Styles.label_editar} htmlFor='nombre'>
								Categoría
							</label>
							<input
								onChange={handleInputChange}
								className={Styles.input_editar}
								type='text'
								id='nombre'
								name='nombre'
								required
								value={dataEditar.nombre}
							/>
						</div>
						<div className={Styles.btns_editar}>
							<button
								className={`btn btn_success ${Styles.btn_editar}`}
								type='submit'
							>
								Enviar
							</button>
							<button
								onClick={handleCancel}
								className={`btn ${Styles.btn_cancelar_editar}`}
								type='button'
							>
								cancelar
							</button>
						</div>
					</form>
				</div>
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

export default withRouter(SelectInputConsultas)
