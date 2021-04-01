import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './Checkout.css'

const Checkout = () => {
    const [loadingSpinner,setLoadingSpinner] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // console.log("from ...................", loggedInUser.email);
    const { id } = useParams();
    const [selectedItem, setSelectedItem] = useState({});
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let todayDate = `${date}/${month}/${year}`
    console.log("from book.js we get time: ", todayDate);


    useEffect(() => {
        fetch(`https://lychee-cupcake-61240.herokuapp.com/product/${id}`)
            .then(res => res.json())
            .then(data => setSelectedItem(data))
            setLoadingSpinner(false);

    }, [id])



    const handleCheckOut = () => {
        console.log('btn clicked');
        const tempInfo = {};
        tempInfo.productName = selectedItem.name;
        tempInfo.email = loggedInUser.email;
        tempInfo.date = todayDate;
        tempInfo.price = selectedItem.price;
        tempInfo.productImg = selectedItem.photo;
        console.log(tempInfo);


        const url = 'https://lychee-cupcake-61240.herokuapp.com/addOrderedProduct';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempInfo)
        })
            .then(res => console.log('server side response', res));
    }
    // console.log(addUserData);

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
            <div className="container">
                <h3 className="mb-2 ml-2">Checkout</h3>
                <div className="card shadow">
                    <table className="container">
                        <thead>
                            <tr className="border-bottom">
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-bottom">
                                <td>{selectedItem.name}</td>
                                <td>1</td>
                                <td>{selectedItem.price}</td>
                            </tr>
                            <tr>
                                <td className="total">Total</td>
                                <td></td>
                                <td className="total">{selectedItem.price}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={handleCheckOut} className="btn btn-success mt-3 d-flex float-right">Checkout</button>
            </div>
        </div>
    );
};

export default Checkout;