import { useEffect, useRef, useState } from 'react'

const useButtonLoader = (defaultText = 'Enviar') => {
	const [loading, setLoading] = useState(false)
	const element = useRef(null)

	useEffect(() => {
		if (loading) {
			element.current.disabled = true
			element.current.innerHTML = `<i class='fas fa-circle-notch fa-spin'></i>`
		} else {
			element.current.disabled = false
			element.current.innerHTML = defaultText
		}
	}, [loading, defaultText])

	return [element, loading, setLoading]
}

export default useButtonLoader
