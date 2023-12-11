import React from 'react';
import './Register.css';
import { CustomInput } from '../../common/CustomInput/CustomInput';

export const Register = () => {

    const [credentials, setCredentials] = useState({
        full_name: "",
        email: "",
        password: "",
        phone_number: "",
        photo: ""
    });

    const [credentialsError, setCredentialsError] = useState({
        full_nameError: "",
        emailError: "",
        passwordError: "",
        phone_numberError: "",
        photoError: ""
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

    const photoInputDefault = (photo) => (photo === "" ? undefined : photo);

    const SignUp = () => {
        if (credentials.full_name != "" &&
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
                <CustomInput
                    design={"inputDesign"}
                    type={"name"}
                    name={"full_name"}
                    placeholder={"Full name"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                {/* <div className='errorMsg'>{credentialsError.full_nameError}</div> */}
                <CustomInput
                    design={"inputDesign"}
                    type={"mail"}
                    name={"email"}
                    placeholder={"user@gmail.com"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                {/* <div className='errorMsg'>{credentialsError.emailError}</div> */}
                <CustomInput
                    design={"inputDesign"}
                    type={"password"}
                    name={"password"}
                    placeholder={"Password"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                {/* <div className='errorMsg'>{credentialsError.passwordError}</div> */}
                <CustomInput
                    design={"inputDesign"}
                    type={"number"}
                    name={"phone_number"}
                    placeholder={"Phone Number"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                {/* <div className="not-necesarilly">* Optional</div> */}
                {/* <div className='errorMsg'>{credentialsError.phone_numberError}</div> */}
                <CustomInput
                    design={"inputDesign"}
                    type={"text"}
                    name={"photo"}
                    placeholder={"Introduce an URL image"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                {/* <div className='errorMsg'>{credentialsError.photoError}</div> */}
            </div>
            <div className='animated-button' onClick={SignUp}>Sign up</div>
            {/* <p>{message}</p> */}
        </div>
    </div>
    );
};
 
