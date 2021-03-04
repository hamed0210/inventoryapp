// import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Styles from './input.module.css'

const Input = ({
	dataLabel,
	dataSelect,
	setSelectInputs,
	setSelectInputAdd,
	datosInput,
	dispatchObtenerSelect,
}) => {
	const dispatch = useDispatch()
	// const [cantidad, setCantidad] = useState(0)
	// const [precio, setPrecio] = useState(0)
	// const [total, setTotal] = useState(0)

	// useEffect(() => {
	// 	setTotal(cantidad * precio)
	// 	if (cantidad !== 0) datosInput.datos.precio_total = total
	// }, [cantidad, precio, datosInput, total])

	const handleInputChange = (e) => {
		// if (e.target.name === 'cantidad')
		// 	e.target.value ? setCantidad(parseInt(e.target.value)) : setCantidad(0)

		// if (e.target.name === 'precio_unidad')
		// 	e.target.value ? setPrecio(parseInt(e.target.value)) : setPrecio(0)

		datosInput.setDatos({
			...datosInput.datos,
			[e.target.name]: e.target.value,
		})
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
					<div className={Styles.select_container}>
						<select
							onChange={handleInputChange}
							className={Styles.input_select}
							name={el.name}
							id={el.id}
							required={el.required}
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
								>
									<i className='fas fa-plus-square fa-lg' />
								</button>
								<button
									onClick={handleSelectDelete}
									className={Styles.btn_delete}
									type='button'
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
		// if (el.label === 'Total')
		// 	return (
		// 		<div key={index} className={Styles.inputGroup}>
		// 			<label className={Styles.label} htmlFor={el.htmlFor}>
		// 				{el.label}
		// 			</label>
		// 			<input
		// 				// onChange={handleInputChange}
		// 				className={Styles.input}
		// 				type={el.type}
		// 				id={el.id}
		// 				name={el.name}
		// 				placeholder={el.placeholder}
		// 				required={el.required}
		// 				autoFocus={el.autoFocus}
		// 				value={total}
		// 				disabled
		// 			/>
		// 		</div>
		// 	)
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
				/>
			</div>
		)
	})
}

export default Input
