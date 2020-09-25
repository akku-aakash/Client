import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { addItem } from '../helpers/CartHelper'
import '../style/cardd.css';

const Cardd = ({ product,
    showAtToCart = true, }) => {

    const {_id, fakeprice,name, description, price, quantity, category} = product;

    const [proo, setProo] = useState({
        _id,
        name,
        description,
        price,
        quantity,
        fakeprice,
        category
    })


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
            <div className='ch2'>
                {
                    arr && arr[0] && <img src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}?photoId=${arr[0]._id}`} alt={item.name} />
                }
            </div>
        );
    }

    return (
        <div className="chaaa1">
            <div className="ch1">
                {shouldRedirect(redirect)}
                <Link className="ch1" to={`/product/${product._id}`}>
                    <ShowImage url="product" item={product} />
                </Link>
                <div className="ch3">
                    <h3>{product.name.substring(0, 20)}</h3>
                    <h4>Rs. {product.price}/-</h4>
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