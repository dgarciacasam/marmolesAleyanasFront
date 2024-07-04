export const getToken = () => {
    const token = sessionStorage.getItem('jwt')
    return token
}