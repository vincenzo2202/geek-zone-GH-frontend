import React, { useState, useEffect } from "react";
import "./Login.css"  
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/validations";
import { logUser } from "../../services/apiCalls";

//Importo Rdx

import { useDispatch } from "react-redux";  //useDispatch es necesario para emitir acciones
import { login } from "../userSlice";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rdxToken = useSelector(selectToken);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [credentialsError, setCredentialsError] = useState({
        emailError: "",
        passwordError: "",
    });

    useEffect(() => {
        if (rdxToken) {
            navigate("/");
        }
    }, []);

    const [message, setMessage] = useState("");

    const functionHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {

        let error = "";

        error = validator(e.target.name, e.target.value);

        setCredentialsError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const logMe = () => {
        if (credentials.password != "" &&
            credentials.email != "") {
            logUser(credentials)
            .then((response) => { 
                    const { message, token } = response.data;
                    setMessage(message); 
                    if (message === "User Logged") {
                        dispatch(login(token))
                        setTimeout(() => {
                            navigate("/feed");
                        }, 300)
                    }
                    console.log(token);
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    setMessage(error.response.data.message)
                });
        }
    };

    return (
        <div className="login-body">
            <div className="input-card-login">
                <div className="title-login">Login</div>
                <div className="inputs-login-container">
                    <CustomInput
                        design={"inputDesign"}
                        type={"email"}
                        name={"email"}
                        placeholder={"user@gmail.com"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{credentialsError.emailError}</div>
                    <CustomInput
                        design={"inputDesign"}
                        type={"password"}
                        name={"password"}
                        placeholder={"Password"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{credentialsError.passwordError}</div>
                </div>
                <div className='animated-button ' onClick={logMe}>Log in</div>
                <div > {message}</div>
            </div>
        </div>
    )
}