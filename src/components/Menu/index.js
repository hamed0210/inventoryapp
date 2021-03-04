import { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Styles from './menu.module.css'

const Menu = (props) => {
	const { pathname } = props.location

	const [barWidth, setbarWidth] = useState(0)
	const [barLeft, setbarLeft] = useState(0)

	useEffect(() => {
		const menu = document.querySelector(`.${Styles.menu}`)
		const links = document.querySelectorAll(`.${Styles.link}`)

		if (pathname === '/login' || pathname === '/') {
			links.item(0).classList.add(Styles.selected)
			setbarWidth(links.item(0).getBoundingClientRect().width + 10)
			setbarLeft(
				links.item(0).getBoundingClientRect().x -
					menu.getBoundingClientRect().x -
					5
			)
			return
		}

		if (pathname === '/perfil') {
			links.forEach((el) => {
				el.classList.remove(Styles.selected)
				setbarWidth(0)
				setbarLeft(0)
			})
		}

		links.forEach((el) => {
			if (pathname === el.getAttribute('href')) {
				el.classList.add(Styles.selected)
				setbarWidth(el.getBoundingClientRect().width + 10)
				setbarLeft(
					el.getBoundingClientRect().x - menu.getBoundingClientRect().x - 5
				)
			}
		})
	}, [pathname])

	const handleClick = (e) => {
		const tab = e.target
		const ulContainer = tab.parentNode.parentNode
		const coords = tab.getBoundingClientRect()

		setbarWidth(coords.width + 10)
		setbarLeft(coords.x - ulContainer.getBoundingClientRect().x - 5)

		if (tab.classList.contains(Styles.selected)) return

		ulContainer.childNodes.forEach((elemet) => {
			elemet.childNodes.forEach((el) => {
				if (el.localName === 'a') el.classList.remove(Styles.selected)
			})
		})
		tab.classList.add(Styles.selected)
	}

	return (
		<nav className={Styles.container}>
			<ul className={Styles.menu}>
				<li className={Styles.item} onClick={handleClick}>
					<Link className={Styles.link} to='/productos'>
						Productos
					</Link>
				</li>
				<li className={Styles.item} onClick={handleClick}>
					<Link className={Styles.link} to='/clientes'>
						Clientes
					</Link>
				</li>
				<li className={Styles.item} onClick={handleClick}>
					<Link className={Styles.link} to='/proveedores'>
						Proveedores
					</Link>
				</li>
				<li className={Styles.item} onClick={handleClick}>
					<Link className={Styles.link} to='/compras'>
						Compras
					</Link>
				</li>
				<li className={Styles.item} onClick={handleClick}>
					<Link className={Styles.link} to='/ventas'>
						Ventas
					</Link>
				</li>
				<li className={Styles.item} onClick={handleClick}>
					<Link className={Styles.link} to='/inventario'>
						Inventario
					</Link>
				</li>
				<li className={Styles.item} onClick={handleClick}>
					<Link className={Styles.link} to='/usuarios'>
						Usuarios
					</Link>
				</li>
			</ul>
			<span
				className={Styles.bar}
				style={{ width: barWidth, left: barLeft }}
			></span>
		</nav>
	)
}

export default withRouter(Menu)
