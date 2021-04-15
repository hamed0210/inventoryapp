import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Styles from './consultasInventario.module.css'
import SearchInput from 'components/Consultas/SearchInput'
import Item from 'components/Inventario/ConsultasInventario/ItemConsultasInventario'
import Preloader from 'components/Preloader/PreloaderItem'
import Eliminar from 'components/Consultas/Eliminar'
import FormEditarConsultasCompras from 'components/Inventario/ConsultasInventario/FormEditarConsultasComprasInventario'
import InfoInventario from 'components/Inventario/ConsultasInventario/InfoInventario'
import { obtenerProductosAccion } from 'redux/productosDucks'
import { obtenerProveedoresAccion } from 'redux/ProveedoresDucks'
import { obtenerClientesAccion } from 'redux/clientesDucks'
import { obtenerCompraAccion } from 'redux/comprasDucks'
import { obtenerVentaAccion } from 'redux/ventasDucks'

const ConsultasInventario = ({
	history,
	dataHeader,
	data = [],
	dispatchDelete,
}) => {
	const dispatch = useDispatch()
	const proveedores = useSelector((store) => store.proveedores.array)
	const clientes = useSelector((store) => store.clientes.array)
	const productos = useSelector((store) => store.productos.array)
	const compras = useSelector((store) => store.compras.array)
	const ventas = useSelector((store) => store.ventas.array)

	const [itemLists, setItemLists] = useState([])
	const [loadingState, setLoadingState] = useState(false)
	const [totalCompra, setTotalCompra] = useState(0)
	const [cantCompras, setCantCompras] = useState(0)
	const [totalVenta, setTotalVenta] = useState(0)
	const [cantVentas, setCantVentas] = useState(0)
	const [totalDiferencia, setTotalDiferencia] = useState(0)
	const [total, setTotal] = useState(0)
	const [verEditarForm, setVerEditarForm] = useState(false)
	const [verEliminar, setVerEliminar] = useState(false)
	const [dataEliminar, setDataEliminar] = useState({})
	const [dataEditar, setDataEditar] = useState({})

	useEffect(() => {
		dispatch(obtenerProveedoresAccion(history))
		dispatch(obtenerClientesAccion(history))
		dispatch(obtenerProductosAccion(history))
	}, [dispatch, history])

	useEffect(() => {
		data && setLoadingState(true)

		let totalCompraSuma = 0
		let cantCompras = 0
		let totalVentaSuma = 0
		let cantVentas = 0
		let totalSuma = 0

		data.forEach((el) => {
			totalSuma += Number(el.precio)
			if (el.tipo.includes('Compra')) {
				totalCompraSuma += Number(el.precio)
				cantCompras += 1
			}
			if (el.tipo.includes('Venta')) {
				totalVentaSuma += Number(el.precio)
				cantVentas += 1
			}
		})

		setTotalCompra(totalCompraSuma)
		setCantCompras(cantCompras)
		setTotalVenta(totalVentaSuma)
		setCantVentas(cantVentas)
		setTotalDiferencia(totalVentaSuma - totalCompraSuma)
		setTotal(totalSuma)
	}, [data])

	const handleVerEliminar = (item, data) => {
		setVerEliminar(true)
		setDataEliminar({
			...dataEliminar,
			item,
			data,
		})
	}

	const handleVerEditForm = (item) => {
		setDataEditar(item)
		setVerEditarForm(true)
		item.tipo === 'Compra'
			? dispatch(obtenerCompraAccion(history, item.codigo))
			: dispatch(obtenerVentaAccion(history, item.codigo))
	}

	return (
		<div className={Styles.container}>
			{verEliminar && (
				<Eliminar
					setVerEliminar={setVerEliminar}
					dataEliminar={dataEliminar}
					dispatchDelete={dispatchDelete}
				/>
			)}
			<InfoInventario
				totalCompra={totalCompra}
				totalVenta={totalVenta}
				cantCompras={cantCompras}
				cantVentas={cantVentas}
				totalDiferencia={totalDiferencia}
				dataClientes={clientes}
				dataProductos={productos}
			/>
			<div className={Styles.filters}>
				<SearchInput itemLists={itemLists} />
			</div>
			<div className={Styles.result_container}>
				<div className={Styles.result}>
					{loadingState ? (
						<>
							<div className={Styles.table_container}>
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
												setDataEditar={setDataEditar}
												handleVerEditForm={handleVerEditForm}
											/>
										) : (
											<tr className={Styles.item}>
												<td className={Styles.data}>
													{data.message
														? data.message
														: 'No hay datos registrados'}
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
							<div className={Styles.pagination_totals_container}>
								<div className={Styles.pagination_container}>
									<span className={Styles.previous_btn}>
										<i className='fas fa-angle-left' />
									</span>
									<span className={Styles.pagination_item}>1</span>
									<span
										className={`${Styles.next_btn} ${Styles.pagination_click}`}
									>
										<i className='fas fa-angle-right' />
									</span>
								</div>
								<div className={Styles.totals_container}>
									<div className={Styles.total_container}>
										<span className={Styles.title_total}>Total:</span>
										<span className={`totales_value ${Styles.value_total}`}>
											{total !== 0
												? `$ ${total.toLocaleString('es-CO')}`
												: total}
										</span>
									</div>
								</div>
							</div>
						</>
					) : (
						<Preloader />
					)}
				</div>
			</div>
			{verEditarForm && (
				<FormEditarConsultasCompras
					dataEditar={dataEditar}
					data={dataEditar.tipo === 'Compra' ? compras : ventas}
					dataSelect={dataEditar.tipo === 'Compra' ? proveedores : clientes}
					setVerEditarForm={setVerEditarForm}
				/>
			)}
		</div>
	)
}

export default withRouter(ConsultasInventario)
