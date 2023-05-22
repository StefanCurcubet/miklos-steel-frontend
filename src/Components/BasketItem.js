export default function BasketItem({data, removeFromBasket}) {

    const {id, product_name, quantity} = data

    async function handleRemoveFromBasket() {
        await removeFromBasket(id)
        
    }

    return (
        <div className="card mb-2 d-flex shadow-sm">
            <div className="card-body">
                <div className="card-title">{product_name} | {quantity}</div>
                <button className="btn mt-2 mb-1 btn-danger" onClick={() => handleRemoveFromBasket()}>Sterge din cos </button>
            </div>
        </div>
    )
}