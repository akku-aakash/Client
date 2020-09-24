import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from '../helpers/CartHelper'
import '../style/card.css';
import { Container, Row, Col } from 'react-bootstrap';

const Card = ({ product,
    showViewProductButthon = true,
    showAtToCart = true,
    cartUpdate = false,
    showRemoveProductButton = false }) => {


    const { _id, name,fakeprice ,description, price, quantity } = product;

    const [proo, setProo] = useState({
        _id,
        name,
        description,
        price,
        quantity,
        fakeprice
    })

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
                <button onClick={addToCart} className='btncart'>
                    Add to cart</button>
            )
        )
    }

    const addToCart = () => {
        addItem(proo, () => {
            setRedirect(true);
        })
    }

    const shouldGo = shop => {
        if (shop) {
            return <Redirect to='/' />
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
                    <p className='input-group-text'>Adjust Quantity</p>
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
        <div className="card">
            {shouldRedirect(redirect)}
            {shouldGo(shop)}
            <div className="card1">
                <Container fluid>
                    <Row>
                        <Col sm={12} md={5}>
                            <ShowImage item={product} url="product" />
                        </Col>
                        <Col sm={12} md={7}>
                            <div className="card2">
                                <h2>{product.name} </h2>
                                {
                                    product.quantity > 0 ? <p style={{ color: 'green', fontWeight: 'bold' }}>In stock</p> : <p style={{ color: 'red', fontWeight: 'bold' }}>Out of Stock</p>
                                }
                                {
                                    product.active = 1 ?  <p style={{ color: 'green', fontWeight: 'bold' }}>Active</p> : <p style={{ color: 'red', fontWeight: 'bold' }}>Not Active Currently</p>
                                }
                                <h3><i className="fa fa-inr"></i>{product.price}  <span>{product.fakeprice}</span></h3> 
                                <p>FREE Shipping</p>
                                <p>{product.description.substring(0, 300)}</p>
                                <div className="card3">
                                    <div className="card4">
                                        <input type="text" placeholder="Pin Code" />
                                        <p>Delivery Availability</p>
                                    </div>
                                    <div className="card4">
                                        <input type="text" placeholder="Promo Code" />
                                        <p>Promo Code</p>
                                    </div>
                                </div>
                                <Link to={`/product/${product._id}`}>
                                    {showViewButton(showViewProductButthon)}
                                </Link>
                                <Link>
                                    {showCartButton(showAtToCart)}
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {showRemoveButton(showRemoveProductButton)}
                {showCartUpdateOption(cartUpdate)}
            </div>
        </div>
    );
}

export default Card;