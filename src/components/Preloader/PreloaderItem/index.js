import Styles from './preloaderItem.module.css'

function PreloaderItem() {
	return (
		<div className={Styles.preloader}>
			<span className={Styles.item}></span>
			<span className={Styles.item}></span>
			<span className={Styles.item}></span>
			<span className={Styles.item}></span>
			<span className={Styles.item}></span>
		</div>
	)
}

export default PreloaderItem
