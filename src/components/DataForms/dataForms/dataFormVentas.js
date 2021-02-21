const dataFormVentas = {
	title: 'Ventas',
	inputs: [
		{
			label: 'Código',
			placeholder: 'Escriba código de venta',
			type: 'text',
			htmlFor: 'cod',
			id: 'cod',
			name: 'cod',
			required: true,
			autoFocus: true,
		},
		{
			label: 'Id Cliente',
			placeholder: 'Escriba id del cliente',
			type: 'number',
			htmlFor: 'id_cli',
			id: 'id_cli',
			name: 'id_cli',
			required: true,
			autoFocus: false,
		},
		// {
		// 	label: 'Id Vendedor',
		// 	placeholder: 'Escriba id del vendedor',
		// 	type: 'number',
		// 	htmlFor: 'id_vend',
		// 	id: 'id_vend',
		// 	name: 'id_vend',
		// 	required: true,
		// 	autoFocus: false,
		// },
		{
			label: 'Productos',
			placeholder: 'Escriba productos',
			type: 'text',
			htmlFor: 'prods',
			id: 'prods',
			name: 'prods',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Neto',
			placeholder: 'Escriba valor neto',
			type: 'number',
			htmlFor: 'neto',
			id: 'neto',
			name: 'neto',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Total',
			placeholder: 'Escriba valor total',
			type: 'number',
			htmlFor: 'total',
			id: 'total',
			name: 'total',
			required: true,
			autoFocus: false,
		},
	],
}

export default dataFormVentas