import { Link } from "react-router-dom";

export default function Navbar() {

    const storedBasket = localStorage.getItem('basket');
    const basketArray = storedBasket ? JSON.parse(storedBasket) : [];
    const basketItemCount = basketArray.length;

    return (
        <nav className="navbar navbar-expand-sm bg-body-tertiary color-white shadow sticky-top justify-content-start mb-3">
            <a className="navbar-brand ms-5" style={{cursor: 'default'}} href="/">
            <img src={process.env.PUBLIC_URL + '/logoMS.png'} alt="Miklos Steel Logo" width={100} height={65} />
            </a>
            <div className="collapse navbar-collapse">
                <a className="nav-link ms-4" href="/">Produse</a>
            <Link to={'/cos'} className="nav-link ms-3">
                Cosul meu ({basketItemCount ? basketItemCount : 0})
            </Link>
            </div>
            <Link to={'/cos'} className="nav-link ms-4 d-block d-sm-none">
                Cosul meu ({basketItemCount ? basketItemCount : 0})
            </Link>
        </nav>
    )
}