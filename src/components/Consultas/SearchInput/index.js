import Styles from './searchInput.module.css'

const SearchInput = ({ itemLists }) => {
	const handleSearch = (e) => {
		itemLists.forEach((el) => {
			const id = el.getElementsByTagName('td')[0]
			e.target.value !== ''
				? id.innerHTML.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
					? (el.style.display = 'flex')
					: (el.style.display = 'none')
				: (el.style.display = 'flex')
		})
	}

	return (
		<div className={Styles.container}>
			<label className={Styles.label} htmlFor='search'>
				Filtar
			</label>
			<input
				onChange={handleSearch}
				className={Styles.input}
				type='search'
				name='search'
				id='search'
				placeholder='Escriba busqueda'
			/>
			<span className={Styles.search_icon}>
				<i className='fas fa-search'></i>
			</span>
		</div>
	)
}

export default SearchInput
