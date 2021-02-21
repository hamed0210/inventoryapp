import Styles from './preloader.module.css'
import PreloaderItem from './PreloaderItem'

function Preloader() {
	return (
		<div className={Styles.container}>
			<PreloaderItem />
		</div>
	)
}

export default Preloader
