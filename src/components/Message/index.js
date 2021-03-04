import Styles from './message.module.css'

const Message = ({ msgProps, successProps }) => {
	return successProps ? (
		<div className={`${Styles.message_success_container}`}>
			<span className={Styles.message_success}>{msgProps}</span>
		</div>
	) : (
		<div className={`${Styles.error_container}`}>
			<span className={Styles.error}>{msgProps}</span>
		</div>
	)
}

export default Message
