import React from 'react';
import {
    Link
} from "react-router-dom";
import './Header.css';
import { useContext } from 'react';
import { UserContext } from '../../App';


const Header = () => {
    const [loggedInUser] = useContext(UserContext);

    return (
        <div className="container">
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                <Link style={{ fontWeight: '800', fontSize: '25px' }} className="navbar-brand" to='/home'>Shopping Fair</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active mx-3">
                            <Link className="nav-link" to='/home'>Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active mx-3">
                            <Link className="nav-link" to='/orders'>Orders</Link>
                        </li>
                        <li className="nav-item active mx-3">
                            <Link className="nav-link" to='/admin'>Admin</Link>
                        </li>
                        <li className="nav-item active mx-3">
                            <Link className="nav-link" to=''>Deals</Link>
                        </li>
                        <li className="nav-item active mx-3">
                            {!(loggedInUser.isSignedIn) && <span type="submit"><Link class="btn btn-outline-success my-sm-0" to='/login'>Login</Link></span>}
                            {(loggedInUser.isSignedIn) && <span class="btn my-sm-0" type="submit">{loggedInUser.photoURL && <img style={{ borderRadius: "20px", width: "35%", padding: "3px" }} src={loggedInUser.photoURL} alt=""></img>} {(loggedInUser.photo === '') && <div> {loggedInUser.name}</div>}</span>}

                            {/* {loggedInUser.name} */}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;