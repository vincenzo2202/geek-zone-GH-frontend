import { useEffect, useState } from 'react';
import './ChangeRoleCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { selectToken } from '../../pages/userSlice'; 
import { changeRoleCall } from '../../services/apiCalls';

export const ChangeRoleCard = ({ role, onClick, userId }) => {

    const rdxToken = useSelector(selectToken);
    const tokenDecoded = jwtDecode(rdxToken);

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
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="change-role-box">
            <div>
                <div className="change-role-container" onClick={() => handleClick('user')}>
                    <label className="custom-container">
                        <input checked={changeRole.role === 'user'} type="checkbox" className="custom-input"  />
                        <div className="custom-checkmark"></div>
                    </label>
                    <div className='role-name'>User</div>
                </div>
                <div className="change-role-container" onClick={() => handleClick('admin')}>
                    <label className="custom-container">
                        <input checked={changeRole.role === 'admin'} type="checkbox" className="custom-input"   />
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
                <button className='button-change-role' onClick={() => changeRoleOnClick()}> Change
                </button>
            </div>

        </div>
    );
};