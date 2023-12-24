import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../userSlice';
import { CustomInput } from '../../common/CustomInput/CustomInput';
import { updateProfile } from '../../services/apiCalls';
import { useEffect, useState } from 'react';
import { validator } from '../../services/validations';



export const UpdateProfile = () => {

    const navigate = useNavigate();
    const rdxToken = useSelector(selectToken);
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        name: "",
        last_name: "",
        password: "",
        city: "",
        phone_number: "",
        photo: ""
    });

    const [credentialsError, setCredentialsError] = useState({
        nameError: "",
        last_nameError: "",
        passwordError: "",
        cityError: "",
        phone_numberError: "",
        photoError: ""
    });



    useEffect(() => {
        if (!rdxToken) {
            navigate("/login");
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

    const photoDefault = (photo) => (photo === "" ? undefined : photo);

    const update = () => {
        let credentialsWithNumber = {};

        for (let key in credentials) {
            if (credentials[key] !== "") {
                credentialsWithNumber[key] = credentials[key];
            }
        }

        if (credentialsWithNumber.phone_number) {
            credentialsWithNumber.phone_number = parseInt(credentialsWithNumber.phone_number, 10);
        }

        if (credentialsWithNumber.photo) {
            credentialsWithNumber.photo = photoDefault(credentialsWithNumber.photo);
        }
  
        updateProfile(credentialsWithNumber, rdxToken)
            .then((response) => {
                console.log(response.data);
                const { message, error } = response.data;
                setMessage(message);
                if (!error) {
                    setTimeout(() => {
                        navigate("/profile");
                    }, 1000)
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="register-body">
            <div className="input-card-update ">
                <div className="title-update">Update Profile</div>
                <div className="inputs-update-container">
                    <CustomInput
                        design={"update-name"}
                        type={"name"}
                        name={"name"}
                        placeholder={"Name"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    {/* <div className='errorMsg'>{credentialsError.nameError}</div> */}
                    <CustomInput
                        design={"update-last-name"}
                        type={"name"}
                        name={"last_name"}
                        placeholder={"Last Name"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    {/* <div className='errorMsg'>{credentialsError.last_nameError}</div> */}
                    <CustomInput
                        design={"update-password"}
                        type={"password"}
                        name={"password"}
                        placeholder={"Password"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    {/* <div className='errorMsg'>{credentialsError.passwordError}</div> */}
                    <CustomInput
                        design={"update-number"}
                        type={"number"}
                        name={"phone_number"}
                        placeholder={"Phone Number"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    {/* <div className='errorMsg'>{credentialsError.phone_numberError}</div> */}
                    <CustomInput
                        design={"update-city"}
                        type={"city"}
                        name={"city"}
                        placeholder={"City"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    {/* <div className='errorMsg'>{credentialsError.cityError}</div> */}
                    <CustomInput
                        design={"url-avatar"}
                        type={"text"}
                        name={"photo"}
                        placeholder={"URL photo"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    {/* <div className='errorMsg'>{credentialsError.photoError}</div> */}
                </div>
                <div className='animated-button' onClick={update}>Update</div>
                <p>{message}</p>
            </div>
        </div>
    )
};