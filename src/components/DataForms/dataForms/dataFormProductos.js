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
		},
		{
			label: 'Stock',
			placeholder: 'Escriba stock del producto',
			type: 'number',
			htmlFor: 'stock',
			id: 'stock',
			name: 'stock',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Precio Compra',
			placeholder: 'Escriba precio del producto',
			type: 'number',
			htmlFor: 'precio_compra',
			id: 'precio_compra',
			name: 'precio_compra',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Precio Venta',
			placeholder: 'Escriba precio del producto',
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