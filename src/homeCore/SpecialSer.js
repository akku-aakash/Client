import React from 'react';
import Menu from '../core/Menu'
import { Helmet } from 'react-helmet';
import Coming from '../images_icons/coming.svg'
import '../style/Cele.css'

const SpecialSer = () => {
    return (
        <div>
            <Helmet>
                <title>Cele Bash</title>
                <meta name="description" content="Cele Bash Category" />
                <meta name="author" content="Bunny Bash" />
                <meta name="robots" content="index, follow"></meta>
            </Helmet>
            <Menu />
            <div className="cele">
                <div className="cele1">
                    <img src={Coming} alt="comming soon"/>
                </div>
                <div className="cele2">
                    <h1>Launch on New Year</h1>
                </div>
            </div>
        </div>
    );
};

export default SpecialSer;