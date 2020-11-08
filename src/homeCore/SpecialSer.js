import React, {useEffect} from 'react';
import Menu from '../core/Menu'
import { Helmet } from 'react-helmet';
import '../style/Cele.css'
import Cele from '../shimg/CeleBash.png'
import Cele1 from '../images_icons/coming.svg'
import $ from 'jquery';

const SpecialSer = () => {

    useEffect(() => {
        $(document).ready(function () {
            $(this).scrollTop(0);
        });
    }, [])
    

    return (
        <div className="fjf">
            <Helmet>
                <title>Cele Bash</title>
                <meta name="description" content="Cele Bash Category" />
                <meta name="author" content="Bunny Bash" />
                <meta name="robots" content="index, follow"></meta>
            </Helmet>
            <Menu />
            <div className="cele">
                <div className="cele1">
                    <img src={Cele} alt="comming soon" />
                </div>
                <div className="celee1">
                    <img src={Cele1} alt="comming soon" />
                </div>
                <div className="cele2">
                    <h1>Launch this New Year 2021</h1>
                </div>
            </div>
        </div>
    );
};

export default SpecialSer;