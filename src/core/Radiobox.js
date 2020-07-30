import React, { useState } from 'react';

const Radiobox = ({ prices, handleFilters }) => {


    const [value, setValue] = useState(0)

    const handleChange = (e) => {
        handleFilters(e.target.value)
        setValue(e.target.value)
    }
    return (
        prices.map((p,i) => (
            <div key={i} className='list-unstyled'>
            <input onChange={handleChange} name={p} 
            type="radio" value={`${p._id}`} 
            className='mr-2 ml-4' />
            <label className='form-check-label'>
            {p.name}</label>
            </div>
        ))   
    )
}

export default Radiobox;