import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

export default function Services(props) {
  const { _id, name, weight, price, photo } = props.item;

  return (

    <div >

      <div class="col">
        <div className="card mb-4 shadow" style={{ borderRadius: '10px' }}>
          <div className="d-flex text-center" style={{ paddingTop: "20px" }}>
            <div>
              <img src={photo} style={{ width: '50%' }} className="card-img-top" alt="Product Img" />
            </div>
          </div>
          <div className="d-flex text-center">
            <div className="card-body">
              <h6 style={{ fontWeight: '700', fontSize: '18px' }}>{name}-{weight}</h6>
              <br />
              <div className="d-flex justify-content-between">
                <h5 style={{ paddingTop: '18px' }}>${price}</h5>
                <button className="button"><Link style={{ textDecoration: 'none', color: 'white' }} to={`/checkout/${_id}`}>Buy Now</Link></button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
