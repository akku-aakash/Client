import React from 'react';
import Errorr from '../images_icons/PagenotFound.svg'
import Menu from '../core/Menu'

const ErrorPage = () => {
    return (
        <div>
            <Menu />
            <div className="errorr">
                <img src={Errorr} alt="Page not found" />
                <h1>Page Not Found</h1>
            </div>
        </div>
    );
};

export default ErrorPage;