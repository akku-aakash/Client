import React from 'react';
import '../style/Loading.css'
import { Spinner } from 'react-bootstrap'

const LoadingPage = () => {
    return (
        <div className="lod">
            <div className="lod1">
                <Spinner animation="border" variant="warning" />
            </div>
        </div>
    );
};

export default LoadingPage;