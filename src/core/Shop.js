import React, { useState, useEffect, Fragment } from 'react';
import Layout from './Layout';
import Card from './Card';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Checkbox from './Checkbox';
import { prices } from './FixedPrices'
import Radiobox from './Radiobox'
import Menu from './Menu'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([]);

    const [limit, setLimit] = useState(6);

    const [Skip, setSkip] = useState(0);

    const [size, setSize] = useState(0);

    const [filteredResult, setFilteredResult] = useState([]);

    const getCategories = () => {

        axios.get(`${process.env.REACT_APP_API_URL}/category`)
            .then(res => {
                const { data } = res;
                setCategories(data);
            })
            .catch(err => {
                toast.error('Unable to fetch categories', err);
            })
    }

    const loadFilterResults = (newFilters) => {
        console.log(newFilters);
        let skip = Skip
        let filters = newFilters
        let data = {
            limit,
            skip,
            filters
        }
        axios
            .post(`${process.env.REACT_APP_API_URL}/products/by/search`, {
                data
            })
            .then(res => {
                setFilteredResult(res.data.data);
                setSize(res.data.size);
                setSkip(0);
            })
            .catch(err => console.error(err));
    }

    const loadMore = () => {
        let skip = Skip + limit

        let filters = myFilters.filters
        let data = {
            limit,
            skip,
            filters
        }
        axios
            .post(`${process.env.REACT_APP_API_URL}/products/by/search`, {
                data
            })
            .then(res => {
                setFilteredResult([...filteredResult, ...res.data.data]);
                setSize(res.data.size);
                setSkip(skip);
            })
            .catch(err => console.error(err));

    }

    useEffect(() => {
        getCategories();
        loadFilterResults(myFilters.filters);
    }, [])

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters

        if (filterBy === 'price') {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues
        }
        loadFilterResults(myFilters.filters);
        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array;
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button className='btn btn-warning mb-5' onClick={loadMore}>Load More...</button>
            )
        )
    }

    return (
        <Fragment>
            <Menu />
            <Layout title='Shop page' description='mern e-commerce' className='container-fluid'>
                <ToastContainer />
                <div className='row'>
                    <div className='col-4'>
                        <h4>Filter by Category</h4>
                        <ul>
                            <Checkbox categories={categories}
                                handleFilters={filters => handleFilters(filters, 'category')} />
                        </ul>

                        <h4>Filter by Price</h4>
                        <div>
                            <Radiobox prices={prices}
                                handleFilters={filters => handleFilters(filters, 'price')} />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8'>
                        {filteredResult.map((product, i) => (<Card key={i} product={product} />))}
                    </div>
                    <div>
                        {loadMoreButton()}
                    </div>
                </div>

            </Layout>
        </Fragment>
    );
}

export default Shop;