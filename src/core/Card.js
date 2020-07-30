import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from '../helpers/CartHelper'

const Card = ({ product, 
    showViewProductButthon = true, 
    showAtToCart = true, 
    cartUpdate = false,
    showRemoveProductButton = false }) => {

    const [shop, setShop] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const [count, setCount] = useState(product.count);

    const showViewButton = (showViewProductButthon) => {
        return (
            showViewProductButthon && (
                <button className='btn btn-outline-primary mt-2 mb-2'>
                    View product</button>
            )
        )
    }

    const showCartButton = (showAtToCart) => {
        return (
            showAtToCart && (
                <button onClick={addToCart} className='btn btn-outline-danger mt-2 mb-2'>
                    Add to cart</button>
            )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        })
    }
  
    const shouldGo = shop => {
        if(shop) {
            return <Redirect to='/shop' /> 
        }
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const handleChange = productId => e => {
        setCount(e.target.value < 1 ? 1 : e.target.value)
        if (e.target.value >= 1) {
            updateItem(productId, e.target.value)
        }
    }


    const showCartUpdateOption = cartUpdate => {
        return cartUpdate && <div>
            <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>Adjust Quantity</span>
                </div>
                <input type='number' onChange={handleChange(product._id)} value={count} className='form-control' />
            </div>
        </div>
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button onClick={() => {
                    removeItem(product._id)
                    setShop(true)
                }}
                className='btn btn-outline-danger mt-2 mb-2'>
                Remove Button
                </button>
            )
        )
    }

    return (
        <div>
            <div className='col mb-3'>
                {shouldRedirect(redirect)}
                {shouldGo(shop)}
                <div className='card'>
                    <div className='card-header'>{product.name} </div>
                    <div className='card-body'>
                        <ShowImage item={product} url="product" />
                        <p>{product.description.substring(0, 100)}</p>
                        <p>${product.price}</p>
                        <p>Category: {product.category && product.category.name}</p>
                        <p>Added on {moment(product.createdAt).fromNow()}</p>
                        {
                            product.quantity > 0 ? <span>In stock</span> : <span>Out of Stock</span>
                        }


                        <Link to={`/product/${product._id}`}>
                            {showViewButton(showViewProductButthon)}
                        </Link>

                        <Link>
                            {showCartButton(showAtToCart)}
                        </Link>
                        {showRemoveButton(showRemoveProductButton)}
                        {showCartUpdateOption(cartUpdate)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;