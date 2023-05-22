import { useState } from "react"

export default function Product({data, addToBasket}) {

    const {name, inventory} = data
    const [orderAmount, setOrderAmount] = useState()

    async function handleAddToBasket() {
        if (orderAmount > inventory) {
            alert('Stoc insuficient pentru a plasa aceasta comanda')
            return
        }
        await addToBasket(name, orderAmount)
        setOrderAmount()
    }

    return (
        <div className="card mb-2 d-flex shadow-sm">
            <div className="card-body">
                <div className="card-title"> {name} | {inventory} metrii in stoc</div>
                <input type="number" className="form-control mt-2" id="numberInput" name="numberInput" min="0" max={`${inventory}`} placeholder="Introdu cantitatea dorita" onChange={(e) => setOrderAmount(e.target.value)} value={orderAmount ? orderAmount : ''}></input>
                <button className="btn mt-2 mb-1" style={{backgroundColor: '#c29c5f'}} onClick={() => handleAddToBasket()}>Adauga in Cos</button>
                {orderAmount > inventory ? <p style={{color: 'red'}}>Stoc curent depasit</p> : null}
            </div>
        </div>
    )
}