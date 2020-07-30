import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import {getCart} from '../helpers/CartHelper'
import {Link} from 'react-router-dom';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart())
    },[])

    const showItems = items => {
        return (
            <div>
            <h2>Your cart has {`${items.length}`}</h2>
            <hr />
            {
                items.map((p,i) => (
                    <Card key={i} 
                    product={p} 
                    showAtToCart={false}
                    cartUpdate={true}
                    showRemoveProductButton = {true}
                    />
                    
                ))
            }
            </div>
        )
    }

    const noItemsMessage = () => {
        return(
        <h2>Your cart is empty. <br /> 
        <Link to='/shop'>continue Shopping</Link>
        </h2>
        )
    }

    return (
        
            <Layout title='shopping cart'
            description='manage your cart items'>
            <div>
            {
                items.length > 0 ? showItems(items) : noItemsMessage()
            }
            </div>
            <div className='col-6'>
             <h2>Your cart summary</h2>
             <hr />
             <Checkout products={items} />
            </div>
            </Layout>
        
    );
}

export default Cart;