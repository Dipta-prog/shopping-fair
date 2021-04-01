import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Home = () => {

    const [products, setProducts] = useState([]);
    // const [allItems, setAllItems] = useState([]);

    useEffect(() => {
        fetch('https://lychee-cupcake-61240.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div className="d-flex align-items-center">
            <div className="container">
                {
                    products.length === 0 && <div className="m-5">
                        <div className="d-flex justify-content-center text-primary">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                }
                <div className="mt-5 row row-cols-1 row-cols-md-3 g-4">
                    {
                        products.map(product => {
                            return (
                                <div className="col-md-4">
                                    <Product key={product._id} item={product}></Product>
                                </div>
                            )
                        })
                    }
                </div >
            </div>
        </div>

    );
};

export default Home;