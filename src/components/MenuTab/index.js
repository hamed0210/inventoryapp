import { useEffect, useState } from 'react'
import Styles from './menutab.module.css'

const MenuTab = ({ handleProps }) => {
	const [barWidth, setbarWidth] = useState(0)
	const [barLeft, setbarLeft] = useState(0)

	useEffect(() => {
		const bar = document.querySelector(`.${Styles.bar}`)
		const menu = document.querySelector(`.${Styles.menu}`)
		const firstItem = menu.firstChild

		bar.style.width = `${firstItem.getBoundingClientRect().width + 10}px`
		firstItem.classList.add(Styles.selected)
	}, [])

	const handleClick = (e) => {
		const tab = e.target
		const fatherContainer = tab.parentNode
		const coords = tab.getBoundingClientRect()

		handleProps(tab.innerHTML)

		setbarWidth(coords.width + 10)
		setbarLeft(coords.x - fatherContainer.getBoundingClientRect().x - 5)

		if (tab.classList.contains(Styles.selected)) return

		fatherContainer.childNodes.forEach((el) => {
			if (el.localName === 'li') el.classList.remove(Styles.selected)
		})
		tab.classList.add(Styles.selected)
	}

	return (
		<div className={Styles.container}>
			<ul className={Styles.menu}>
				<li onClick={handleClick} className={`${Styles.item}`}>
					Nuevos
				</li>
				<li onClick={handleClick} className={`${Styles.item}`}>
					Consultas
				</li>
			</ul>
			<span
				className={Styles.bar}
				style={{ width: barWidth, left: barLeft }}
			></span>
		</div>
	)
}

export default MenuTab
