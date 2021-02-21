const dataFormUsuarios = {
	title: 'Usuarios',
	inputs: [
		{
			label: 'Correo',
			placeholder: 'Escriba correo electrónico',
			type: 'text',
			htmlFor: 'email',
			id: 'email',
			name: 'email',
			required: true,
			autoFocus: true,
		},
		{
			label: 'Contraseña',
			placeholder: 'Escriba contraseña',
			type: 'password',
			htmlFor: 'pass',
			id: 'pass',
			name: 'pass',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Role',
			placeholder: 'Selecione role',
			type: 'radio',
			htmlFor: 'role',
			id: 'role',
			label_radio: [
				{ for: 'user', label: 'User', checked: true },
				{ for: 'admin', label: 'Admin', checked: false },
			],
			name: 'role',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Identificación',
			placeholder: 'Escriba su identificación',
			type: 'number',
			htmlFor: 'id',
			id: 'id',
			name: 'id',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Nombre',
			placeholder: 'Escriba su nombre',
			type: 'text',
			htmlFor: 'nom',
			id: 'nom',
			name: 'nom',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Apellidos',
			placeholder: 'Escriba sus apellidos',
			type: 'text',
			htmlFor: 'ape',
			id: 'ape',
			name: 'ape',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Celular',
			placeholder: 'Escriba su numero de celular',
			type: 'number',
			htmlFor: 'cel',
			id: 'cel',
			name: 'cel',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Dirección',
			placeholder: 'Escriba su dirección',
			type: 'text',
			htmlFor: 'dir',
			id: 'dir',
			name: 'dir',
			required: true,
			autoFocus: false,
		},
		{
			label: 'Ciudad',
			placeholder: 'Escriba su ciudad',
			type: 'text',
			htmlFor: 'ciudad',
			id: 'ciudad',
			name: 'ciudad',
			required: true,
			autoFocus: false,
		},
	],
}

export default dataFormUsuarios