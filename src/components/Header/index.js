// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'

import Styles from './header.module.css'
import { BtnAvatarSVG } from '../SVGIcons'
import Menu from '../Menu'
import { cerrarSesionAccion } from 'redux/loginDucks'
// import avatar from 'assets/avatar.png'

function Header({ history }) {
	const dispatch = useDispatch()
	const { user } = useSelector((store) => store.login)
	const [profile, setProfile] = useState(false)
	// const [notificaciones, setNotificaciones] = useState(false)

	const handleMenuProfile = () => {
		profile ? setProfile(false) : setProfile(true)
	}

	// const handleNotificaciones = () => {
	// 	notificaciones ? setNotificaciones(false) : setNotificaciones(true)
	// 	setProfile(false)
	// }

	const handleProfile = () => {
		history.push('/perfil')
	}

	const handleCerrarSesion = () => {
		dispatch(cerrarSesionAccion(history))
	}

	return (
		<div className={Styles.container}>
			<div className={Styles.header}>
				<div className={Styles.logo_container}>
					<Link className={Styles.logo} to='/'>
						inventory
					</Link>
				</div>
				<div className={Styles.menu}>
					<Menu />
				</div>
				<div className={Styles.secundary}>
					{/* <div onClick={handleNotificaciones} className={Styles.notifications}>
						<NotificationSVG />
						{notificaciones ? (
							<div className={Styles.notificacion_container}>
								<ul className={Styles.notificacion_menu}>
									<li className={Styles.notificacion_item}>notificacion 1</li>
									<li className={Styles.notificacion_item}>notificacion 2</li>
								</ul>
							</div>
						) : null}
					</div> */}
					<span className={Styles.separator}></span>
					<div className={Styles.avatar_container}>
						<span className={Styles.name}>
							{user ? user.persona.nombres : null}
						</span>
						{/* <div className={Styles.avatar}>
						<img src={avatar} alt='' />
					</div> */}
						<div
							onClick={handleMenuProfile}
							className={Styles.btn_avatar_container}
						>
							<span className={Styles.btn_avatar}>
								<BtnAvatarSVG />
							</span>
							{profile ? (
								<div className={Styles.profile_container}>
									<ul className={Styles.profile_menu}>
										<li onClick={handleProfile} className={Styles.profile_item}>
											<i
												className={`fas fa-user ${Styles.profile_item_icon}`}
											/>
											<span className={Styles.profile_item_title}>Perfil</span>
										</li>
										<li
											onClick={handleCerrarSesion}
											className={Styles.profile_item}
										>
											<i
												className={`fas fa-sign-out-alt ${Styles.profile_item_icon}`}
											/>
											<span className={Styles.profile_item_title}>
												Cerrar sesión
											</span>
										</li>
									</ul>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Header)
