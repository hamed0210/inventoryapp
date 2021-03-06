const dataFormCompras = {
	title: 'Compras',
	inputs: [
		// {
		// 	label: 'Código',
		// 	placeholder: 'Escriba código de venta',
		// 	type: 'text',
		// 	htmlFor: 'codigo',
		// 	id: 'codigo',
		// 	name: 'codigo',
		// 	required: true,
		// 	autoFocus: true,
		// },
		{
			label: 'Proveedor',
			placeholder: 'Seleccione proveedor',
			type: 'select',
			htmlFor: 'id_proveedor',
			id: 'id_proveedor',
			name: 'id_proveedor',
			required: true,
			autoFocus: false,
			btns: false,
		},
		{
			label: 'Productos',
			placeholder: 'Escriba producto',
			type: 'text',
			htmlFor: 'productos',
			id: 'productos',
			name: 'productos',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Cantidad',
			placeholder: 'Escriba la cantidad del producto',
			type: 'number',
			htmlFor: 'cantidad',
			id: 'cantidad',
			name: 'cantidad',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Precio Undidad',
			placeholder: 'Escriba precio del preducto',
			type: 'number',
			htmlFor: 'precio_unidad',
			id: 'precio_unidad',
			name: 'precio_unidad',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Total',
			placeholder: '',
			type: 'number',
			htmlFor: 'precio_total',
			id: 'precio_total',
			name: 'precio_total',
			required: false,
			autoFocus: false,
		},
	],
}

export default dataFormCompras
