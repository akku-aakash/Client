import React, {useEffect} from 'react';
import Errorr from '../images_icons/PagenotFound.svg'
import Menu from '../core/Menu'
import $ from 'jquery';

const ErrorPage = () => {

    useEffect(() => {
        $(document).ready(function () {
            $(this).scrollTop(0);
        });
    }, [])
    

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