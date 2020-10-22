
export const getBraintreeClientTOken = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/braintree/getToken/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'applicaiton/json',
            Authorization: `Bearer ${token}`,
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        return console.log(err);
    })
}

export const generateTokenRazor = (userId, token, amount) => {
    return fetch(`${process.env.REACT_APP_API_URL}/payment/details/${userId}`, {
        method: 'Post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({amount : amount})
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    })
}


export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/order/create/${userId}`, {
        method: 'Post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    }).then(response => {
        return response.json();
    }).catch(err => {
        return console.log(err);
    })

}


export const createServiceOrder = (userId, token, createOrderData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/service/order/create/${userId}`, {
        method: 'Post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    }).then(response => {
        return response.json();
    }).catch(err => {
        return console.log(err);
    })

}
