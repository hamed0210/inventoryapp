import { useEffect, useState } from 'react'

import Styles from './infoInventario.module.css'
import {
	TrendingUpSVG,
	TrendingDownSVG,
	TrendingEqualSVG,
} from 'components/SVGIcons'

const InfoInventario = ({
	totalCompra = 0,
	cantCompras = 0,
	totalVenta = 0,
	cantVentas = 0,
	totalDiferencia = 0,
	dataClientes,
	dataProductos,
}) => {
	const [topProductos, setTopProductos] = useState([])
	const [topClientes, setTopClientes] = useState([])

	useEffect(() => {
		const totalesInfo = document.querySelectorAll('.totales_info')
		const totalesClientes = document.querySelectorAll('.totales_clientes')

		const formatearTotales = (arrayTotales) => {
			arrayTotales.forEach((el) => {
				const numberInner = el.innerHTML.split(' ')

				if (numberInner.length > 1) {
					const numberFilters = numberInner[1].replace('-', '')
					let newNumber = ''

					if (numberFilters.length === 4) {
						for (let i = 0; i < numberFilters.length; i++) {
							if (i === 1) newNumber = newNumber.concat('.')
							newNumber = newNumber.concat(numberFilters[i])
						}
						el.innerHTML = `$ ${newNumber}`
					}
				}
			})
		}

		if (totalVenta !== 0 || totalCompra !== 0 || totalDiferencia !== 0) {
			formatearTotales(totalesInfo)
			formatearTotales(totalesClientes)
		}
	}, [totalVenta, totalCompra, totalDiferencia])

	useEffect(() => {
		let clientesTop3 = []
		let productosTop3 = []

		const handleOrdenarArray = (arrayOrdenar, nombArray) => {
			if (arrayOrdenar.length !== 0) {
				const arrayOrdenado = arrayOrdenar.sort((firstEl, secondEl) => {
					return firstEl.cantidad_compras
						? secondEl.cantidad_compras - firstEl.cantidad_compras
						: secondEl.cantidad_ventas - firstEl.cantidad_ventas
				})
				for (let i = 0; i < 3; i++) {
					if (arrayOrdenado.length > i)
						nombArray.includes('clientes')
							? arrayOrdenado[i].cantidad_compras !== 0 &&
							  clientesTop3.push(arrayOrdenado[i])
							: arrayOrdenado[i].cantidad_ventas !== 0 &&
							  productosTop3.push(arrayOrdenado[i])
				}
			}
		}

		handleOrdenarArray(dataClientes, 'clientes')
		handleOrdenarArray(dataProductos, 'productos')

		setTopClientes(clientesTop3)
		setTopProductos(productosTop3)
	}, [dataClientes, dataProductos])

	return (
		<div className={Styles.container}>
			<div className={Styles.totales_diferencia_container}>
				<div className={Styles.totales_container}>
					<div className={Styles.ventas_container}>
						<div className={Styles.ventas_title_cantidad}>
							<span className={Styles.ventas_title}>Ventas</span>
							<span className={Styles.ventas_cantidad}>{cantVentas}</span>
						</div>
						<span className={`totales_info ${Styles.ventas_total}`}>
							{totalVenta !== 0
								? `$ ${totalVenta.toLocaleString('es-CO')}`
								: totalVenta}
						</span>
					</div>
					<div className={Styles.compras_container}>
						<div className={Styles.compras_title_cantidad}>
							<span className={Styles.compras_title}>Compras</span>
							<span className={Styles.compras_cantidad}>{cantCompras}</span>
						</div>
						<span className={`totales_info ${Styles.compras_total}`}>
							{totalCompra !== 0
								? `$ ${totalCompra.toLocaleString('es-CO')}`
								: totalCompra}
						</span>
					</div>
				</div>
				<div className={Styles.diferencia_container}>
					<div className={Styles.diferencia_title_total}>
						<span className={Styles.diferencia_title}>Diferencia</span>
						<span
							className={
								totalDiferencia === 0
									? `totales_info ${Styles.diferencia_total} ${Styles.diferencia_igaul}`
									: totalDiferencia > 0
									? `totales_info ${Styles.diferencia_total} ${Styles.diferencia_mas}`
									: `totales_info ${Styles.diferencia_total} ${Styles.diferencia_menos}`
							}
						>
							{totalDiferencia !== 0
								? `$ ${totalDiferencia.toLocaleString('es-CO')}`
								: totalDiferencia}
						</span>
					</div>
					<span className={Styles.diferencia_icon}>
						{totalDiferencia === 0 ? (
							<TrendingEqualSVG tam={35} />
						) : totalDiferencia > 0 ? (
							<TrendingUpSVG tam={40} />
						) : (
							<TrendingDownSVG tam={40} />
						)}
					</span>
				</div>
			</div>
			<div className={Styles.productos_container}>
				<span className={Styles.title}>Productos mas vendidos - Top 3</span>
				<table className={Styles.table}>
					<thead>
						<tr className={Styles.table_header}>
							<th>Productos</th>
							<th>Cant.</th>
						</tr>
					</thead>
					<tbody>
						{topProductos.length !== 0 ? (
							topProductos.map((el) => {
								return (
									<tr key={el.codigo} className={Styles.table_body}>
										<td>{el.nombre}</td>
										<td>{el.cantidad_ventas}</td>
									</tr>
								)
							})
						) : (
							<tr className={Styles.table_body}>
								<td className={Styles.table_body_null}>
									No hay productos con ventas registradas
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<div className={Styles.clientes_container}>
				<span className={Styles.title}>Clientes mas frecuentes - Top 3</span>
				<table className={Styles.table}>
					<thead>
						<tr className={Styles.table_header}>
							<th>Nombres</th>
							<th>Cant.</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{topClientes.length !== 0 ? (
							topClientes.map((el) => {
								return (
									<tr key={el.id} className={Styles.table_body}>
										<td>{el.nombre}</td>
										<td>{el.cantidad_compras}</td>
										<td className='totales_clientes'>{`$ ${el.total_compras.toLocaleString(
											'es-CO'
										)}`}</td>
									</tr>
								)
							})
						) : (
							<tr className={Styles.table_body}>
								<td className={Styles.table_body_null}>
									No hay clientes con compras registradas
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default InfoInventario
