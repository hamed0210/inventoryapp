import { useDispatch } from 'react-redux'

import Styles from './input.module.css'

const Input = ({
	dataLabel,
	dataSelect,
	setSelectInputs,
	setSelectInputAdd,
	datosInput,
	dispatchObtenerSelect,
	inputDisabled = false,
	showSelectError,
	setShowSelectError,
}) => {
	const dispatch = useDispatch()

	const handleInputChange = (e) => {
		datosInput.setDatos({
			...datosInput.datos,
			[e.target.name]: e.target.value,
		})
	}

	const handleSelectChange = (e) => {
		if (!e.target.value.includes('Seleccione')) {
			datosInput.setDatos({
				...datosInput.datos,
				[e.target.name]: e.target.value,
			})
			setShowSelectError(false)
		} else setShowSelectError(true)
	}

	const handleSelectAdd = () => {
		setSelectInputAdd(true)
	}

	const handleSelectDelete = () => {
		dispatch(dispatchObtenerSelect())
		setSelectInputs(true)
	}

	return dataLabel.inputs.map((el, index) => {
		if (el.type === 'select')
			return (
				<div key={index} className={Styles.inputGroup}>
					<label className={Styles.label} htmlFor={el.htmlFor}>
						{el.label}
					</label>
					<div
						className={
							!showSelectError
								? Styles.select_container
								: `${Styles.select_container} ${Styles.showSelectError}`
						}
					>
						<span
							className={Styles.select_error}
						>{`Por favor ${el.placeholder}`}</span>
						<select
							onChange={handleSelectChange}
							className={Styles.input_select}
							name={el.name}
							id={el.id}
							required={el.required}
							disabled={inputDisabled}
						>
							<option>{el.placeholder}</option>
							{dataSelect &&
								dataSelect.map((element, index) => {
									return (
										<option key={index} value={element.codigo || element.id}>
											{element.nombre}
										</option>
									)
								})}
						</select>
						{el.btns && (
							<>
								<button
									onClick={handleSelectAdd}
									className={Styles.btn_add}
									type='button'
									disabled={inputDisabled}
								>
									<i className='fas fa-plus-square fa-lg' />
								</button>
								<button
									onClick={handleSelectDelete}
									className={Styles.btn_delete}
									type='button'
									disabled={inputDisabled}
								>
									<i className='fas fa-minus-square fa-lg' />
								</button>
							</>
						)}
					</div>
				</div>
			)
		// if (el.type === 'file')
		// 	return (
		// 		<div key={index} className={Styles.inputGroup}>
		// 			<label className={Styles.label} htmlFor={el.htmlFor}>
		// 				{el.label}
		// 			</label>
		// 			<div className={Styles.file_container}>
		// 				<span className={Styles.file_name}>
		// 					{datos.img && datos.img.length >= 17
		// 						? `${datos.img.substr(0, 17)}...`
		// 						: datos.img}
		// 				</span>
		// 				<div className={Styles.btn_file_container}>
		// 					<input
		// 						onChange={handleInputFileChange}
		// 						className={Styles.input_file}
		// 						type={el.type}
		// 						id={el.id}
		// 						name={el.name}
		// 						required={el.required}
		// 						accept={el.accept}
		// 					/>

		// 					<button className={Styles.btn_file} type={'button'}>
		// 						<i className='fas fa-file-upload' />
		// 					</button>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	)
		if (el.type === 'radio')
			return (
				<div key={index} className={Styles.inputGroup}>
					<label className={Styles.label} htmlFor={el.htmlFor}>
						{el.label}
					</label>
					<div className={Styles.radio_container}>
						{el.label_radio.map((element, index) => {
							return (
								<div key={index} className={Styles.radio_item}>
									<input
										onChange={handleInputChange}
										className={Styles.radio_input}
										type='radio'
										id={element.for}
										name={el.name}
										defaultChecked={element.checked}
										value={element.label}
										disabled={inputDisabled}
									/>
									<label className={Styles.radio_label} htmlFor={element.for}>
										{element.label}
									</label>
								</div>
							)
						})}
					</div>
				</div>
			)
		return (
			<div key={index} className={Styles.inputGroup}>
				<label className={Styles.label} htmlFor={el.htmlFor}>
					{el.label}
				</label>
				<input
					onChange={handleInputChange}
					className={Styles.input}
					type={el.type}
					id={el.id}
					name={el.name}
					placeholder={el.placeholder}
					required={el.required}
					autoFocus={el.autoFocus}
					min='0'
					disabled={inputDisabled}
				/>
			</div>
		)
	})
}

export default Input
