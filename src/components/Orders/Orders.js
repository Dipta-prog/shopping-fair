import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    const [loadingSpinner,setLoadingSpinner] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser.email);
    const [orderedProducts, setOrderedProducts] = useState([]);
    useEffect(() => {
        // setAllItems(items);
        fetch('https://lychee-cupcake-61240.herokuapp.com/orderedProducts?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setOrderedProducts(data))
            setLoadingSpinner(false);
    }, [loggedInUser.email])
    return (
        <div>
            {
                loadingSpinner && <div className="m-5">
                    <div className="d-flex justify-content-center text-primary">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            }
            <div className='container'>
                <h4 className='mt-3 ml-3'>Previously ordered products</h4>
                <table className="container">
                    <thead>
                        <tr className="border-bottom">
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Purchase Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderedProducts.map(product => {
                                return (
                                    <tr className="border-bottom">
                                        <td><img src={product.productImg} style={{ width: '93px', height: '93px' }} alt="" /></td>
                                        <td>{product.productName}</td>
                                        <td>{product.price}</td>
                                        <td>{product.date}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Orders;