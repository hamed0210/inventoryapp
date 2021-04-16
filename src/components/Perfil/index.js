import { useState } from 'react'
import { useSelector } from 'react-redux'

import Styles from './perfil.module.css'
// import avatarImg from 'assets/avatar.png'

const Perfil = () => {
	const userStore = useSelector((store) => store.login)
	const [editar, setEditar] = useState(false)
	const [editarPass, setEditarPass] = useState(false)
	const [datosPass, setDatosPass] = useState({
		pass_actual: '',
		pass: '',
	})
	const [datos, setDatos] = useState({
		nombres: userStore.user.persona.nombres,
		apellidos: userStore.user.persona.apellidos,
		email: userStore.user.email,
		id: userStore.user.persona.id,
		dir: userStore.user.persona.dir,
		ciudad: userStore.user.persona.ciudad,
		cel: userStore.user.persona.cel,
		role: userStore.user.role,
	})
	// const style = {
	// 	backgroundImage: `url(${avatarImg})`,
	// 	backgroundRepeat: 'no-repeat',
	// 	backgroundSize: '100% 100%',
	// }

	const handleInputChange = (e) => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		})
	}

	const handleInputChangePass = (e) => {
		setDatosPass({
			...datosPass,
			[e.target.name]: e.target.value,
		})
	}

	const handlePassword = (e) => {
		const icon = e.target
		const inputPassword = icon.parentNode.previousSibling
		const iconClass = icon.classList

		if (iconClass.contains('fa-eye')) {
			iconClass.remove('fa-eye')
			iconClass.add('fa-eye-slash')
			inputPassword.type = 'text'
		} else {
			iconClass.remove('fa-eye-slash')
			iconClass.add('fa-eye')
			inputPassword.type = 'password'
		}
	}

	const handleChangePass = (e) => {
		editar && setEditar(false)
		setEditarPass(true)
	}

	const handleChangePassCancel = (e) => {
		setEditarPass(false)
	}

	const handleEdit = (e) => {
		editarPass && setEditarPass(false)
		setEditar(true)
	}

	const handleEditCancel = (e) => {
		setEditar(false)
	}

	const handleSubmitEdit = (e) => {
		e.preventDefault()
	}

	const handleSubmitEditPass = (e) => {
		e.preventDefault()
	}

	return (
		<div className={Styles.container}>
			<div className={Styles.perfil_container}>
				<button onClick={handleEdit} className={Styles.btn_editar}>
					<i className='fas fa-pen'></i>
				</button>
				<div className={Styles.avatar}>
					{/* <img src={avatarImg} alt='' /> */}
				</div>
				<div className={Styles.datos_container}>
					<form onSubmit={handleSubmitEdit}>
						<div className={Styles.nombres_container}>
							{editar ? (
								<>
									<div className={Styles.input_group_edit}>
										<input
											onChange={handleInputChange}
											className={Styles.input_edit}
											type='text'
											name='nombres'
											value={datos.nombres}
										/>
										<input
											onChange={handleInputChange}
											className={Styles.input_edit}
											type='text'
											name='apellidos'
											value={datos.apellidos}
										/>
									</div>
									<input
										onChange={handleInputChange}
										className={Styles.input_edit}
										type='text'
										name='email'
										value={datos.email}
									/>
								</>
							) : (
								<>
									<h4 className={Styles.nombres}>
										{`${datos.nombres} ${datos.apellidos}`}
									</h4>
									<h6 className={Styles.correo}>{datos.email}</h6>{' '}
								</>
							)}
						</div>
						<div className={Styles.datos}>
							<h5 className={Styles.dato_label}>ID:</h5>
							{editar ? (
								<input
									onChange={handleInputChange}
									className={Styles.input_edit}
									type='number'
									name='id'
									value={datos.id}
								/>
							) : (
								<span className={Styles.dato}>{datos.id}</span>
							)}
						</div>
						<div className={Styles.datos}>
							<h5 className={Styles.dato_label}>Direccion:</h5>
							{editar ? (
								<input
									onChange={handleInputChange}
									className={Styles.input_edit}
									type='text'
									name='dir'
									value={datos.dir}
								/>
							) : (
								<span className={Styles.dato}>{datos.dir}</span>
							)}
						</div>
						<div className={Styles.datos}>
							<h5 className={Styles.dato_label}>Ciudad:</h5>
							{editar ? (
								<input
									onChange={handleInputChange}
									className={Styles.input_edit}
									type='text'
									name='ciudad'
									value={datos.ciudad}
								/>
							) : (
								<span className={Styles.dato}>{datos.ciudad}</span>
							)}
						</div>
						<div className={Styles.datos}>
							<h5 className={Styles.dato_label}>Celular:</h5>
							{editar ? (
								<input
									onChange={handleInputChange}
									className={Styles.input_edit}
									type='number'
									name='cel'
									value={datos.cel}
								/>
							) : (
								<span className={Styles.dato}>{datos.cel}</span>
							)}
						</div>
						<div className={Styles.datos}>
							<h5 className={Styles.dato_label}>Role:</h5>
							{editar ? (
								<input
									onChange={handleInputChange}
									className={Styles.input_edit}
									type='text'
									name='role'
									value={datos.role}
								/>
							) : (
								<span className={Styles.dato}>{datos.role}</span>
							)}
						</div>
						{!editar ? (
							<div className={Styles.datos}>
								<h5 className={Styles.dato_label}>Contraseña</h5>
								<button
									onClick={handleChangePass}
									className={`btn btn_basic ${Styles.btn_pass}`}
									type='button'
								>
									Cambiar
								</button>
							</div>
						) : null}
						{editar ? (
							<div className={Styles.btns_edit}>
								<button
									className={`btn btn_success ${Styles.btn}`}
									type='submit'
								>
									Enviar
								</button>
								<button
									onClick={handleEditCancel}
									className={`btn btn_cancel ${Styles.btn}`}
									type='button'
								>
									Cancelar
								</button>
							</div>
						) : null}
					</form>
				</div>
			</div>
			{editarPass ? (
				<div className={Styles.change_pass_container}>
					<form
						onSubmit={handleSubmitEditPass}
						className={Styles.change_pass_form}
					>
						<div className={Styles.inputGroup}>
							<div className={Styles.input_password_container}>
								<input
									onChange={handleInputChangePass}
									className={Styles.input}
									type='password'
									name='pass_actual'
									id='pass_actual'
									placeholder='Contraseña actual'
									required
								/>
								<span onClick={handlePassword} className={Styles.icon}>
									<i className={`fas fa-eye`} />
								</span>
							</div>
							<div className={Styles.input_password_container}>
								<input
									onChange={handleInputChangePass}
									className={Styles.input}
									type='password'
									name='pass'
									id='pass'
									placeholder='Contraseña nueva'
									required
								/>
								<span onClick={handlePassword} className={Styles.icon}>
									<i className={`fas fa-eye`} />
								</span>
							</div>
						</div>
						<div className={Styles.btns_change_pass}>
							<button className={`btn btn_success ${Styles.btn}`} type='submit'>
								Cambiar
							</button>
							<button
								onClick={handleChangePassCancel}
								className={`btn btn_cancel ${Styles.btn}`}
								type='button'
							>
								Cancelar
							</button>
						</div>
					</form>
				</div>
			) : null}
		</div>
	)
}

export default Perfil
