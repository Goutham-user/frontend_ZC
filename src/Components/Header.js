import React from 'react';
import '../Styles/header.css';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import { Close } from '@material-ui/icons';
import axios from 'axios';  

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: '1px solid brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            registerModalIsOpen: false,
            userName: undefined,
            userNumber: undefined,
            userEmail: undefined,
            userPassword: undefined,
            firstName: undefined,
            lastName: undefined,
            userLoginEmail: undefined,
            userLoginPassword: undefined,
            clientName: undefined,
            isLogin: false,
            user: {},
            userLogin: {}
        }
    }


    handleModal = (state, value) => {
        this.setState({ [state]: value })
    }

    responseGoogle = (response) => {
        this.setState({ isLogin: true, user: response, clientName: response.profileObj.name, loginModalIsOpen: false })
    }

    handleFormData = (event, state) => {
        this.setState({ [state]: event.target.value });
    }

    handleLogout = () => {
        this.setState({ isLogin: false, user: {} })
    }

    handleRegister = () => {
        const { firstName, lastName, userName, userNumber, userEmail, userPassword } = this.state;
        const userData = {
            email: userEmail,
            password: userPassword,
            userName: userName,
            firstName: firstName,
            lasstName: lastName,
            contactNumber: userNumber
        }
        axios({
            url: 'https://git-repo-zc-api4.onrender.com/signup',
            method: 'POST',
            headers: { 'content-Type': "application/json" },
            data: userData
        })
            .then(res => {
                this.setState({ user: res.data.userData, clientName: res.data.userDetails.userName, isLogin: true, registerModalIsOpen: false })
                console.log(res.data.userData)
                window.alert("Your Account Successfully Created")
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleLogin = () => {
        const { userLoginEmail, userLoginPassword } = this.state;
        const loginData = {
            email: userLoginEmail,
            password: userLoginPassword
        }
        axios({
            url: 'https://git-repo-zc-api4.onrender.com/login',
            method: 'POST',
            headers: { 'content-Type': "application/json" },
            data: loginData
        })
            .then(res => {
                this.setState({ isLogin: res.data.isAuthenticated, clientName: res.data.userDetails.userName, user: res.data.userDetails, loginModalIsOpen: false })
                window.alert("Successfully logged in")
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        const { loginModalIsOpen, registerModalIsOpen, isLogin, clientName } = this.state;
        return (
            <div>
                <div className="navbar navbar-dark bg-primary">
                    <div className="header-logo"><b>logo</b></div>
                    {isLogin ?
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div className="btn btn-outline-dark">{`Hello, ${clientName ? clientName : 'user' }`}</div>
                            <div className="btn btn-outline-dark" onClick={this.handleLogout}>Logout</div>
                        </div>
                        :
                        <div className="loginbuttonalign">
                            <button className="btn btn-outline-dark" disabled onClick={() => this.handleModal('loginModalIsOpen', true)}>Login</button>
                            <button className="btn btn-outline-dark" onClick={() => this.handleModal('registerModalIsOpen', true)}>Create an account</button>
                        </div>
                    }

                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <Close style={{ float: "right", cursor: "pointer" }} onClick={() => this.handleModal('loginModalIsOpen', false)} />
                    <div style={{ padding: "20px" }}>
                        <div>
                            <div className="rlheading">Login with email</div>
                            <div>
                                <input style={{ margin: "10px 0px" }} className="form-control" type="text"
                                    placeholder="Enter your email" onChange={(e) => this.setState({ userLoginEmail: e.target.value })} />
                                <input style={{ margin: "10px 0px" }} className="form-control" type="text"
                                    placeholder="Enter your password" onChange={(e) => this.setState({ userLoginPassword: e.target.value })} />
                                <button className="widthMan btn btn-success"
                                    style={{ margin: '10px 0px' }}
                                    onClick={this.handleLogin}>Login</button>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", margin: "10px", color: "gray", fontWeight: "bold" }}>OR</div>
                        <div className='width-adjustment'>
                            <GoogleLogin
                               clientId="85362518589-dvnkb40vsk6fntojds2tsqgbh5edr0l6.apps.googleusercontent.com"
                                buttonText=" continue with google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={registerModalIsOpen}
                    style={customStyles}
                >
                    <Close style={{ float: "right", cursor: "pointer" }} onClick={() => this.handleModal('registerModalIsOpen', false)} />
                    <div style={{ padding: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                            <div className="rlheading">Create Your Account</div>
                        </div>
                        <div>
                            <label className="labelForm">First Name : </label>
                            <input  className="form-control" type="text"
                                placeholder="Enter your email address" onChange={(event) => this.handleFormData(event, "firstName")} />
                        </div>
                        <div>
                            <label  className="labelForm">Last Name : </label>
                            <input className="form-control" type="text"
                                placeholder="Enter your email address" onChange={(event) => this.handleFormData(event, "lastName")} />
                        </div>
                        <div>
                            <label className="labelForm">Name : </label>
                            <input className="form-control" style={{ width: "300px" }}
                                type="text" placeholder="Enter your name" onChange={(event) => this.handleFormData(event, "userName")} />
                        </div>
                        <div>
                            <label className="labelForm">Contact Number : </label>
                            <input maxlength="10" className="form-control" type="number"
                                placeholder="Enter your number" onChange={(event) => this.handleFormData(event, "userNumber")} />
                        </div>
                        <div>
                            <label className="labelForm">Email : </label>
                            <input className="form-control" type="text"
                                placeholder="Enter your email address" onChange={(event) => this.handleFormData(event, "userEmail")} />
                        </div>

                        <div>
                            <label type="password" className="labelForm">Password : </label>
                            <input className="form-control" type="password"
                                placeholder="Enter your password" onChange={(event) => this.handleFormData(event, "userPassword")} />
                        </div>
                        <div className='width-adjustment'>
                            <button className="btn btn-success"
                                style={{ float: 'right', marginTop: '20px' }} onClick={this.handleRegister}>Sign up</button>
                        </div >

                    </div>

                </Modal>
            </div>
        )
    }
}

export default Header;
