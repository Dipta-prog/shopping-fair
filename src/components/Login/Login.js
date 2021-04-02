import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { useState } from 'react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        // var credential = result.credential;
        // var token = credential.accessToken;
        var { displayName, email, photoURL } = result.user;
        const signedInUser = { name: displayName, email: email, photoURL: photoURL };
        signedInUser.isSignedIn = true;
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // var email = error.email;
        // var credential = error.credential;

      });
  }

  const handleBlur = (event) => {
    let isFieldValid;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }

    if (!newUser) {
      console.log('inside email same?');
      if (event.target.name === 'password') {
        setPassword(event.target.value);
        console.log('inside password');
      }
      if (event.target.name === 'confirmPassword') {
        setConfirmPassword(event.target.value);
        console.log('inside confirmPassword');
      }
    }

    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if (event.target.name === 'name') {
      isFieldValid = event.target.value.length > 2;
      console.log("user name condition", event.target.value, isFieldValid);
    }
    if (isFieldValid) {
      const newUserInfo = { ...loggedInUser };
      newUserInfo[event.target.name] = event.target.value;
      setLoggedInUser(newUserInfo);
    }
  }

  // email sign up firebase
  const handleEmailSignIn = (event) => {
    if (!newUser && loggedInUser.email && loggedInUser.password && password === confirmPassword && password.length > 0 && confirmPassword.length > 0 && confirmPassword === password) {
      console.log('submitting');
      firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
        .then((userCredential) => {
          const newUserInfo = { ...loggedInUser };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setLoggedInUser(newUserInfo);
          updateUserInformation(loggedInUser.name);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...loggedInUser };
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setLoggedInUser(newUserInfo);
        });
    }

    // email sign in(login)
    if (newUser && loggedInUser.email && loggedInUser.password) {
      firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
        .then((userCredential) => {
          const newUserInfo = { ...loggedInUser };
          newUserInfo.error = '';
          newUserInfo.success = true;
          newUserInfo.name = userCredential.user.displayName;
          newUserInfo.isSignedIn = true;
          console.log('sign in with email & pass', userCredential.user.displayName);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...loggedInUser };
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setLoggedInUser(newUserInfo);
        });
    }
    event.preventDefault();
  }

  const updateUserInformation = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(function () {
      console.log('user name updated successfully');
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
      {/* sign in form */}
      {newUser && <div className="card col-md-3 container">
        <form onSubmit={handleEmailSignIn}>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input required type="email" name="email" onBlur={handleBlur} className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input required type="password" name="password" onBlur={handleBlur} className="form-control" placeholder="Enter password" />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Login</button>
          <p className="forgot-password text-right">
            Don't have an account? <p style={{ display: 'inline-block', color: 'blue', textDecoration: 'underline' }} onClick={() => setNewUser(!newUser)}> Create an account</p>
          </p>
        </form>

        {/* sign in with facebook */}
        <div className="pb-2">
          <div className=" d-flex align-items-center">
            <button type="submit" onClick={handleGoogleSignIn} className="btn btn-block" style={{ border: '1px solid black', borderRadius: '25px' }}>
              <img width="40px" style={{ marginBottom: '3px' }} alt="Google sign-in" src="https://logotyp.us/file/facebook.svg" />
              Continue with Facebook
            </button>
          </div>
        </div>

        {/* sign in with google */}
        <div>
          <div className=" d-flex align-items-center">
            <button type="submit" onClick={handleGoogleSignIn} className="btn btn-block" style={{ border: '1px solid black', borderRadius: '25px' }}>
              <img width="19px" style={{ marginBottom: '3px', marginRight: '12px' }} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
              Continue with Google
            </button>
          </div>
        </div>

        <p style={{ color: 'red' }}>{loggedInUser.error}</p>
      </div>
      }

      {/* sign up form */}
      {!newUser && <div className="card col-md-3 pb-3 container">
        <form onSubmit={handleEmailSignIn}>
          <h3 className="text-center">Create an account</h3>

          <div className="form-group">
            <label>Name</label>
            <input type="text" required onBlur={handleBlur} name="name" className="form-control" placeholder="Name" />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input type="email" required className="form-control" name="email" onBlur={handleBlur} placeholder="Enter email" />
          </div>


          <div className="form-group">
            <label>Password</label>
            <input type="password" required className="form-control" name="password" onBlur={handleBlur} placeholder="Enter password" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" className="form-control" name="confirmPassword" onBlur={handleBlur} placeholder="Confitm password" />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Create an account</button>
          <p className="forgot-password text-right">
            Already have an account? <span style={{ color: 'blue', textDecoration: 'underline' }} onClick={() => setNewUser(!newUser)}>Login</span>
          </p>
          <p className="text-center">..................Or..................</p>
        </form>


        {/* sign in with facebook */}
        <div className="pb-2">
          <div className=" d-flex align-items-center">
            <button type="submit" onClick={handleGoogleSignIn} className="btn btn-block" style={{ border: '1px solid black', borderRadius: '25px' }}>
              <img width="40px" style={{ marginBottom: '3px' }} alt="Google sign-in" src="https://logotyp.us/file/facebook.svg" />
              Continue with Facebook
            </button>
          </div>
        </div>



        {/* sign in with google */}
        <div>
          <div className=" d-flex align-items-center">
            <button type="submit" onClick={handleGoogleSignIn} className="btn btn-block" style={{ border: '1px solid black', borderRadius: '25px' }}>
              <img width="19px" style={{ marginBottom: '3px', marginRight: '12px' }} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
              Continue with Google
            </button>
          </div>
        </div>

      </div>
      }

      <div className="col-md-3 container">
        <p style={{ color: 'red' }}>{loggedInUser.error}</p>
        {loggedInUser.success && <p style={{ color: 'green' }}>User {newUser ? 'Logged in' : 'created'} successfully</p>}
        {(confirmPassword !== password) && <p style={{ color: 'red' }}>Password not matching</p>}
      </div>
    </div>
  );
};

export default Login;