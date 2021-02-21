export const saveLocalStorage = (data) => {
	localStorage.setItem('token', data)
}

export const getLocalStorage = () => {
	return localStorage.getItem('token')
}

export const removeLocalStorage = () => {
	localStorage.removeItem('token')
}
