import { useEffect, useRef, useState } from 'react'

const useButtonLoader = (defaultText = 'Enviar', Styles = '') => {
	const [loading, setLoading] = useState(false)
	const element = useRef(null)

	useEffect(() => {
		if (loading) {
			element.current.disabled = true
			element.current.innerHTML = `<i class='fas fa-circle-notch fa-spin'></i>`
			element.current.classList.add(Styles.loadingButton)
		} else {
			element.current.disabled = false
			element.current.innerHTML = defaultText
			element.current.classList.remove(Styles.loadingButton)
		}
	}, [loading, defaultText, Styles])

	return [element, setLoading]
}

export default useButtonLoader
