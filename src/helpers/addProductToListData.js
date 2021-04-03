const addProductToListData = (datos, setDatos, Styles, codigo) => {
	let datosProductos = []

	const productoList = document.querySelectorAll('.productos')
	const cantidadList = document.querySelectorAll(`.${Styles.input_cantidad}`)
	const precioList = document.querySelectorAll(`.${Styles.input_precio}`)

	for (let i = 0; i < productoList.length; i++) {
		datosProductos.push({
			producto: productoList[i].getAttribute('data-codigo'),
			cantidad: cantidadList[i].value,
			precio: precioList[i].value,
		})
	}

	if (codigo)
		datosProductos = datosProductos.filter((el) => el.producto !== codigo)

	setDatos({
		...datos,
		productos: JSON.stringify(datosProductos),
	})
}

export default addProductToListData
