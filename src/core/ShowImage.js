import React from 'react';

const ShowImage = ({ item, url }) => {

    const arr = item.photo
    const change = (e) => {
        document.querySelector('.main-img').src = e.target.src
    }

    return (
        <div className="cardPic">
            <div className="cardPic2">
                {
                    arr.map((element,i) => {
                        console.log(element)
                        return(
                            <div className="cardPic3" onClick={change}>
                            <img src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}?photoId=${element._id}`}
                            alt={element.name} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="cardPic1" >
                <img src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}?photoId=${arr[0]._id}`}
                    alt={item.name}
                    className="main-img"
                />
            </div>
        </div>
    );
}


export default ShowImage;