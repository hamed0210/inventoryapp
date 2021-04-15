import Styles from './searchInput.module.css'

const SearchInput = ({ itemLists }) => {
	const handleSearch = (e) => {
		let hasSearch = []
		itemLists.forEach((el) => {
			const dataList = el.childNodes

			dataList.forEach((element, index) => {
				if (e.target.value !== '') {
					if (dataList.length - 1 !== index) {
						element.innerHTML
							.toLowerCase()
							.includes(e.target.value.toLowerCase())
							? hasSearch.push(el)
							: (el.style.display = 'none')
					}
				} else el.style.display = 'flex'
			})

			hasSearch.length !== 0 &&
				hasSearch.forEach((hasSearchItem) => {
					hasSearchItem.style.display = 'flex'
				})
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
