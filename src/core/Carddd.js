import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { addItem } from '../helpers/CartHelper'
import '../style/carddd.css';

const Cardd = ({ product,
    showAtToCart = true, }) => {

    const {_id, name,fakeprice ,description, price, quantity, category} = product;

    const [proo, setProo] = useState({
        _id,
        name,
        price,
        description,
        quantity,
        fakeprice,
        category
    })


    const [redirect, setRedirect] = useState(false);

    const showCartButton = (showAtToCart) => {
        return (
            showAtToCart && (
                <button onClick={addToCart} className='chhbutton'>
                    <i className="fa fa-cart-plus" aria-hidden="true"></i><p>Add to cart</p></button>
            )
        )
    }

    const addToCart = () => {
        addItem( proo, () => {
            setRedirect(true);
        })
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const ShowImage = ({ item, url }) => {

        const arr = item.photo

        return (
            <div className='chh2'>
            {
              arr && arr[0] && <img src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}?photoId=${arr[0]._id}`} alt={item.name} />
            }
            </div>
        );
    }

    return (
        <div className="chh">
            <div className="chh1">
                {shouldRedirect(redirect)}
                <Link className="chh1" to={`/product/${product._id}`}>
                    <ShowImage url="product" item={product} />
                </Link>
                <div className="chh3">
                    <h3>{product.name.substring(0, 15)}</h3>
                    <h4>Rs. {product.price}/-</h4>
                    <div className="chh4">
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