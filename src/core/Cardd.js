import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { addItem } from '../helpers/CartHelper'
import '../style/cardd.css';

const Cardd = ({ product,
    showAtToCart = true, }) => {

    const [redirect, setRedirect] = useState(false);


    const showCartButton = (showAtToCart) => {
        return (
            showAtToCart && (
                <button onClick={addToCart} className='chbutton'>
                    <i className="fa fa-cart-plus" aria-hidden="true"></i><p>Add to cart</p></button>
            )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        })
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const ShowImage = ({ item, url }) => {
        return (
            <div className='ch2'>
                <img src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}`}
                    alt={item.name}
                />
            </div>
        );
    }

    return (
        <div className="ch">
            <div className="ch1">
                {shouldRedirect(redirect)}
                <Link className="ch1" to={`/product/${product._id}`}>
                    <ShowImage url="product" item={product} />
                </Link>
                <div className="ch3">
                    <h3>{product.name.substring(0, 100)}</h3>
                    <h4>${product.price}</h4>
                    <div className="ch4">
                        <Link>
                            {showCartButton(showAtToCart)}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cardd;