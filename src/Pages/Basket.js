import { useEffect, useState } from "react"
import BasketItem from "../Components/BasketItem"
import LoadingModal from "../Components/LoadingModal"

export default function Basket({removeFromBasket, basketItemNr, setBasketItemNr}) {

    const storedBasket  = localStorage.getItem('basket')
    const basketArray = JSON.parse(storedBasket)

    const [basketItems, setBasketItems] = useState()
    const [loading, setLoading] = useState(false)
    const [purchased, setPurchased] = useState(false)

    async function getBasketItems() {
        const response = await fetch('http://127.0.0.1:8000/getBasketItems/?basketItems=' + basketArray.join(','))
        const data = await response.json()
        setBasketItems(data)
    }

    useEffect(() => {
        if (storedBasket) {
            getBasketItems()
        } else {
            setBasketItems(null)
        }
    }, [basketItemNr])

    async function buyBasket(name, email, phone, message) {
        try {
                await fetch('http://127.0.0.1:8000/buyBasket/?basketItems=' + basketArray.join(','),
            {
                method: "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    'name': name,
                    'email': email,
                    'phone': phone,
                    'message': message
                })
            }
            )
            localStorage.removeItem('basket')
            setBasketItemNr(0)
            setLoading(false)
            setPurchased(true)
        } catch (error) {
            alert('Request Failed')
            setLoading(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const form = e.target;
        const name = form.elements.inputName.value;
        const email = form.elements.inputEmail.value;
        const phone = form.elements.phone.value;
        const message = form.elements.mesaj.value;
        buyBasket(name, email, phone, message)
    }

    const items = basketItems?.map((item) => <BasketItem key={item.id} data={item} removeFromBasket={removeFromBasket}/>)

    return(
        <div className="container-lg">
            {basketItems ?
            <>
                {items} 
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputName">Nume</label>
                        <input type="name" className="form-control" id="inputName" placeholder="Nume" required/>
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="Email" required/>
                        </div>
                    </div>
                    <label htmlFor="phone">Numarul de telefon</label>
                    <input type="tel" className="form-control" id="phone" name="phone" pattern="[+]?[0-9]{9,14}" placeholder="Numarul de telefon" required/>
                    <label htmlFor="mesaj">Mesaj</label>
                    <textarea className="form-control" id="mesaj" rows="3"></textarea>
                    <button type="submit" className="btn btn-primary mt-3">Trimite Comanda</button>
                </form>
            </>
            : purchased ?
                <div className="alert alert-success" role="alert" hidden={!purchased}>
                    <h4 className="alert-heading">Succes!</h4>
                    <p>Comanda ta a fost trimisa cu succes.</p>
                </div>
                :
                <h1>Cosul este gol.</h1>}
            <LoadingModal loading={loading}/>
        </div>
    )
}