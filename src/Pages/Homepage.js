import Product from "../Components/Product"

export default function Homepage({products, addToBasket}) {

    let allProducts = products.map((product) => <Product key={product.id} data={product} addToBasket={addToBasket}/>)

    return (
        <div className="container-lg mb-2">
            {products? allProducts : null}
        </div>
    )
}