export default function removeFromLocalStorage(basket_id) {
    const storedBasket = localStorage.getItem('basket')
    const basketArray = JSON.parse(storedBasket)
    const updatedBasket = JSON.stringify(basketArray.filter((item) => item !== basket_id))
    if (basketArray.length === 1) {
        localStorage.removeItem('basket')
    } else {
        localStorage.setItem('basket', updatedBasket)
    }
}