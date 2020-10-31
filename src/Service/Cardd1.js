import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../style/cardd.css';

const Cardd = ({ product }) => {


    const [redirect, setRedirect] = useState(false);

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
        <div className="ch">
            <div className="ch1">
                {shouldRedirect(redirect)}
                <Link className="ch1" to='products/experience'>
                    <ShowImage url="service" item={product} />
                </Link>
                <div className="ch3">
                    <h3>{product.name.substring(0, 40)}</h3>
                    <h4>Rs. {product.price}/-</h4>
                    <Link className="ch1" to='products/experience'>
                        <button className='chbutton'>
                            <i className="fa fa-cart-plus" aria-hidden="true"></i><p>View Now</p></button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Cardd;