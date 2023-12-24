import { useEffect, useState } from 'react';
import React from 'react';
import { Button, message } from 'antd';
import './ChangeRoleCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { selectToken } from '../../pages/userSlice';
import { changeRoleCall, deleteProfileBySuperAdmin } from '../../services/apiCalls';
import { useNavigate } from 'react-router-dom';

export const ChangeRoleCard = ({ role, onClick, userId }) => {

    const rdxToken = useSelector(selectToken);
    const tokenDecoded = jwtDecode(rdxToken);
    const navigate = useNavigate();

    const [changeRole, setChangeRole] = useState({
        id: role,
        role: ""
    });

    useEffect(() => {
        setChangeRole({
            id: userId,
            role: role
        });
    }, [role]);

    const handleClick = (role) => {
        onClick(role);
        setChangeRole({
            id: userId,
            role: role
        });
    };

    const changeRoleOnClick = () => {
        changeRoleCall(rdxToken, changeRole)
            .then((response) => {
                console.log(response);
                openMessage();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deletePofile = () => {
        console.log('delete profile');
        deleteProfileBySuperAdmin(rdxToken, userId)
            .then((response) => {
                console.log(response);
                openMessage();
                setTimeout(() => {
                    navigate('/users');
                }, 1650);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // spinner message
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';

    const openMessage = () => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: 'success',
                content: 'Role changed!',
                duration: 2,
            });
        }, 1000);
    };

    return (
        <div className="change-role-box">
            <div>
                <div className="change-role-container" onClick={() => handleClick('user')}>
                    <label className="custom-container">
                        <input checked={changeRole.role === 'user'} type="checkbox" className="custom-input" />
                        <div className="custom-checkmark"></div>
                    </label>
                    <div className='role-name'>User</div>
                </div>
                <div className="change-role-container" onClick={() => handleClick('admin')}>
                    <label className="custom-container">
                        <input checked={changeRole.role === 'admin'} type="checkbox" className="custom-input" />
                        <div className="custom-checkmark"></div>
                    </label>
                    <div className='role-name'>Admin</div>
                </div>
                <div className="change-role-container" onClick={() => handleClick('super_admin')}>
                    <label className="custom-container">
                        <input checked={changeRole.role === 'super_admin'} type="checkbox" className="custom-input" />
                        <div className="custom-checkmark"></div>
                    </label>
                    <div className='role-name'>Super Admin</div>
                </div>
            </div>
            <div className='change-button'>
                <button className='button-change-role' onClick={() => changeRoleOnClick()}> Change Role
                    {contextHolder}
                </button>
            </div>

            <div className='delete-user-profile'>
                <button className='button-delete-profile' onClick={() => deletePofile()}> Delete User  
                {contextHolder}
                </button>
            </div>
        </div>
    );
};