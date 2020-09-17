import React from 'react'
import '../style.css'

const Layout = ({ title = 'Title', description = 'Description', className, children }) => {
    return (
        <div>
            <div className='jumbotron'>
                <div className='jumbotron1'>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}

export default Layout;