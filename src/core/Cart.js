import React, { useState, useEffect, Fragment } from 'react';
import Card from '../homeCore/CartPro';
import { getCart } from '../helpers/CartHelper'
import { Link } from 'react-router-dom';
import Checkout from './Checkout';
import '../style/maincart.css';
import Menu from './Menu'
import { Helmet } from 'react-helmet'
import $ from 'jquery';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [d, setd] = useState(5)

    var min = 1;
    var max = 100;
    var rand = min + (Math.random() * (max - min));

    const setdm = () => {
        setd(rand)
    }

    useEffect(() => {
        $(document).ready(function () {
            $(this).scrollTop(0);
        });
    }, [])
    

    useEffect(() => {
        setItems(getCart());
    }, [d])

    const showItems = items => {
        return (
            <div className="maincart">
                {
                    items.map((p, i) => (
                        <Card product={p}
                            showAtToCart={false}
                            cartUpdate={true}
                            showRemoveProductButton={true}
                            dm={d}
                            setdm={setdm}
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
            <Helmet>
                <title>Bunny Bash Cart</title>
                <meta name="description" content="fakdsfj adsjfkjasdhfj asdhfjkdsjkjkh" />
                <meta name="author" content="Bunny Bash" />
                <meta name="robots" content="index, follow"></meta>
            </Helmet>
            <Menu />
            <div className="maincart2">
                <div className="maincart5">
                    <div className="maincart3">
                        {
                            items.length > 0 ? showItems(items) : noItemsMessage()
                        }
                    </div>
                    <div className="maincart4">
                        <h2>Your cart summary</h2>
                        <Checkout products={items} dm={d} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Cart;