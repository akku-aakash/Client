import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import Card from './Card';

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })
    
    const [x, setx] = useState(0)

    const { categories, category, search, searched, results } = data

    const getCategories = () => {

        axios.get(`${process.env.REACT_APP_API_URL}/category`)
            .then(res => {
                const { data } = res;
                setData({ ...data, categories: data });
            })
            .catch(err => {
                toast.error('Unable to fetch categories', err);
            })
    }

    useEffect(() => {
        getCategories()
    }, [])


    const handleChange = name => e => {
        setData({
            ...data, [name]: e.target.value, searched: false
        })
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    }

    const loadProductBySell = (params) => {
        const query = queryString.stringify(params)
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/search?${query}`)
            .then(res => {
                let response = res.data
                setData({ ...data, results: response, searched: true })
                setx(1);
            })
            .catch(err => {
                toast.error(`Server Error`, err.response.data.error);
            })
    }


    const searchData = () => {
        //console.log(search, category)
        if (search) {
            loadProductBySell({ search: search || undefined, category: category })
        }

    }

    const Sexa = () => {
        if (x === 1) {
            return (
                <div>
                <h2>{searchMessage(searched, results)}</h2>
                {results.map((r, i) => (
                    <Card key={i} product={r} />
                ))}
                </div>
            )
        }
        else {
            return <h2>Please search the products</h2>
        }
    }

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0){
            return `Found ${results.length} products`
        }
        else{
            return 'no products found'
        }
    }

    return (
        <div>
            <form onSubmit={searchSubmit}>
                <select onChange={handleChange('category')}>
                    <option value='All'>Pick a category</option>
                    {categories.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
                <input type='search' className='form-control'
                    onChange={handleChange('search')}
                    placeholder='search by name'
                />
                <button className='btn'> Search</button>
            </form>
            <div>
                {
                    Sexa()
                }
            </div>
        </div>
    );
}

export default Search;