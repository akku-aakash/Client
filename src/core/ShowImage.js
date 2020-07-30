import React from 'react';

const ShowImage = ({item, url}) => {
    return (
        <div className='product-img'>
            <img src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}`} 
            alt= {item.name}
            className='mb-3'
            style={{height: '300px', width:'300px'}}
            />
        </div>
    );
}

export default ShowImage;