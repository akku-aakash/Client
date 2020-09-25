import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowImage = ({ item, url }) => {

    const [pro, setProduct] = useState();
    const productId = item._id;
    const loadSingleProduct = async productId => {
        await axios.get(`${process.env.REACT_APP_API_URL}/product/${productId}`)
            .then(res => {
                setProduct(res.data.photo)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        loadSingleProduct(productId)
    }, [])

    const arr = pro

    return (
        <div className="carttPic1" >
            {
                arr && arr[0] && <img src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}?photoId=${arr[0]._id}`}
                    alt={item.name}
                    className="main-img"
                />
            }
        </div>
    );
}


export default ShowImage;