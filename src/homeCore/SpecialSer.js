import React from 'react';
import Menu from '../core/Menu'
import { Helmet } from 'react-helmet';

const SpecialSer = () => {
    return (
        <div>
            <Helmet>
                <title>Special Services</title>
                <meta name="description" content="Services Category" />
                <meta name="author" content="Bunny Bash" />
                <meta name="robots" content="index, follow"></meta>
            </Helmet>
            <Menu />
        </div>
    );
};

export default SpecialSer;