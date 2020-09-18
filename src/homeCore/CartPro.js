import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowCartPro';
import { addItem, updateItem, removeItem } from '../helpers/CartHelper'
import '../style/CartPro.css';
import { Container, Row, Col } from 'react-bootstrap';

const Card = ({ product,
    showViewProductButthon = true,
    cartUpdate = false,
    showRemoveProductButton = false }) => {

    const [shop, setShop] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const [count, setCount] = useState(product.count);

    const showViewButton = (showViewProductButthon) => {
        return (
            showViewProductButthon && (
                <button className="bttncart">
                    View </button>
            )
        )
    }


    const shouldGo = shop => {
        if (shop) {
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
        return cartUpdate && <div className="carttAd">
            <div className="carttAd1">
                <p>Adjust Quantity</p>
                <input type='number' onChange={handleChange(product._id)} value={count} className='form-control' />
            </div>
        </div>
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button className="bttncart1" onClick={() => {
                    removeItem(product._id)
                    setShop(true)
                }}>
                    Remove
                </button>
            )
        )
    }

    return (
        <div className="cartt">
            {shouldRedirect(redirect)}
            {shouldGo(shop)}
            <div className="cartt1">
                <Container fluid>
                    <Row>
                        <Col sm={12} md={5}>
                            <ShowImage item={product} url="product" />
                        </Col>
                        <Col sm={12} md={7}>
                            <div className="cartt2">
                                <h2>{product.name} </h2>
                                {
                                    product.quantity > 0 ? <p className="cartt3">In stock</p> : <p className="cartt3">Out of Stock</p>
                                }
                                <h3><i className="fa fa-inr"></i>{product.price}</h3>
                                <p className="cartt4">{product.description.substring(0, 300)}</p>
                                <Link to={`/product/${product._id}`}>
                                    {showViewButton(showViewProductButthon)}
                                </Link>
                                {showRemoveButton(showRemoveProductButton)}
                            </div>
                        </Col>
                    </Row>
                </Container>
                {showCartUpdateOption(cartUpdate)}
            </div>
        </div>
    );
}

export default Card;