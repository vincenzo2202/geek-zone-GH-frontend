import React, { useEffect, useState } from 'react';
import './Register.css';
import { CustomInput } from '../../common/CustomInput/CustomInput';
import { validator } from "../../services/validations";
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/apiCalls';

export const Register = () => {
 
    const [credentials, setCredentials] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        city: "",
        phone_number: "",
        photo:""
    });

    const [credentialsError, setCredentialsError] = useState({
        nameError: "",
        last_nameError: "",
        emailError: "",
        passwordError: "",
        cityError: "",
        phone_numberError: "",
        photoError:""
    });
 

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

    const photoInputDefault = (photo) => (photo === "" ? undefined : photo);

    const SignUp = () => {
        if (credentials.name != "" &&
            credentials.password != "" &&
            credentials.email != "" &&
            credentials.phone_number != "") {

            const credentialsWithNumber = {
                ...credentials,
                phone_number: parseInt(credentials.phone_number, 10),
                photo: photoInputDefault(credentials.photo)
            };
            registerUser(credentialsWithNumber)
                .then((response) => {
                    const { message } = response.data;
                    setMessage(message);

                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
    return (
        <div className="register-body">
        <div className="input-card-register">
            <div className="title-login">Register</div>
            <div className="inputs-register-container">
            <div className='errorMsg'>{credentialsError.nameError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"name"}
                    name={"name"}
                    placeholder={"Name"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.last_nameError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"name"}
                    name={"last_name"}
                    placeholder={"Last Name"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.emailError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"mail"}
                    name={"email"}
                    placeholder={"user@gmail.com"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.passwordError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"password"}
                    name={"password"}
                    placeholder={"Password"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.cityError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"text"}
                    name={"city"}
                    placeholder={"City"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.phone_numberError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"number"}
                    name={"phone_number"}
                    placeholder={"Phone Number"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className="not-necesarilly">* Optional</div> 
                <div className='errorMsg'>{credentialsError.photoError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"text"}
                    name={"photo"}
                    placeholder={"Introduce an URL image"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                /> 
            </div>
            <div className='animated-button' onClick={SignUp}>Sign up</div>
            <p>{message}</p>
        </div>
    </div>
    );
};
 
