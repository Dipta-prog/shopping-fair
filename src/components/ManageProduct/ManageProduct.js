import React, { useEffect, useState } from 'react';
import editBtn from '../../all_Images/icons/Group 307.png';
import deleteBtn from '../../all_Images/icons/Group 33150.png';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://lychee-cupcake-61240.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handleDeleteProduct = (productIndex, id) => {
        // console.log('delete product from database', id,productIndex);
        fetch(`https://lychee-cupcake-61240.herokuapp.com/deleteProduct/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                console.log('deleted successfully', result.deleteCount);
                if (result.deleteCount === 1) {
                    document.getElementById(productIndex).style.display = 'none';
                }
            })
    }

    return (
        <div>
            {
                products.length === 0 && <div className="m-5">
                    <div className="d-flex justify-content-center text-primary">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            }
            <table className="container">
                            <thead>
                                <tr className="border-bottom">
                                    <th>Product Name</th>
                                    <th>Wight</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product, index) => {
                                        return (
                                            <tr id={index} className="border-bottom">
                                                <td>{product.name}</td>
                                                <td>{product.weight}</td>
                                                <td>{product.price}</td>
                                                <td><span><img className="btnImg" src={editBtn} alt="" /></span> <span onClick={() => handleDeleteProduct(index, product._id)}><img className="btnImg" src={deleteBtn} alt="" /></span></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    
        </div>
    );
};

export default ManageProduct;