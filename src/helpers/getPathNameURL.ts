export const getPathNameURL = () => {
    const currentUrl = window.location.pathname.slice(1);
    const firstLetterUrl = currentUrl[0].toUpperCase()
    return firstLetterUrl + currentUrl.slice(1)
}