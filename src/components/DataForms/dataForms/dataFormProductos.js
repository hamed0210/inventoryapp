const dataFormProductos = {
	title: 'Productos',
	inputs: [
		{
			// input: 'input',
			label: 'Código',
			placeholder: 'Escriba código del producto',
			type: 'text',
			htmlFor: 'codigo',
			id: 'codigo',
			name: 'codigo',
			required: true,
			autoFocus: true,
		},
		{
			label: 'Nombre',
			placeholder: 'Escriba nombre del producto',
			type: 'text',
			htmlFor: 'nombre',
			id: 'nombre',
			name: 'nombre',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Descripción',
			placeholder: 'Escriba descripción del producto',
			type: 'text',
			htmlFor: 'descripcion',
			id: 'descripcion',
			name: 'descripcion',
			required: false,
			autoFocus: false,
		},
		{
			label: 'Medidas',
			placeholder: 'Escriba medidas del producto',
			type: 'text',
			htmlFor: 'medidas',
			id: 'medidas',
			name: 'medidas',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Categoría',
			placeholder: 'Seleccione categoría',
			type: 'select',
			htmlFor: 'categoria',
			id: 'categoria',
			name: 'categoria',
			required: true,
			autoFocus: false,
			btns: true,
		},
		{
			label: 'Stock Minimo',
			placeholder: 'Escriba stock minimo del producto',
			type: 'number',
			htmlFor: 'stock_minimo',
			id: 'stock_minimo',
			name: 'stock_minimo',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Precio Venta',
			placeholder: 'Escriba precio de venta del producto',
			type: 'number',
			htmlFor: 'precio_venta',
			id: 'precio_venta',
			name: 'precio_venta',
			required: true,
			autoFocus: false,
		},
		// {
		// 	label: 'Imagen',
		// 	accept: '.png, .jpg, .jpeg',
		// 	type: 'file',
		// 	htmlFor: 'img',
		// 	id: 'img',
		// 	name: 'img',
		// 	required: true,
		// 	autoFocus: false,
		// },
	],
}

export default dataFormProductos
