import React, { useState, useEffect, Fragment } from 'react';
import Layout from './Layout';
import Card from '../homeCore/CartPro';
import { getCart } from '../helpers/CartHelper'
import { Link } from 'react-router-dom';
import Checkout from './Checkout';
import '../style/maincart.css';
import Menu from './Menu'

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, [])

    const showItems = items => {
        return (
            <div className="maincart">
                {
                    items.map((p, i) => (
                        <Card product={p}
                            showAtToCart={false}
                            cartUpdate={true}
                            showRemoveProductButton={true}
                        />
                    ))
                }
            </div>
        )
    }

    const noItemsMessage = () => {
        return (
            <Link className="maincart1" to='/'>Continue Shopping</Link>
        )
    }

    return (
        <Fragment >
            <Menu />
            <Layout title='Shopping Cart' description={`Your cart has ${items.length} products`}>
                <div className="maincart2">
                    <div className="maincart5">
                        <div className="maincart3">
                            {
                                items.length > 0 ? showItems(items) : noItemsMessage()
                            }
                        </div>
                        <div className="maincart4">
                            <h2>Your cart summary</h2>
                            <Checkout products={items} />
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
}

export default Cart;