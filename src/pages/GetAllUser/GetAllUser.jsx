import { useDispatch, useSelector } from 'react-redux';
import './GetAllUser.css';
import { selectToken } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../services/apiCalls';
import { useEffect, useState } from 'react';
import { CardUser } from '../../common/UserCard/UserCard';


export const Users = () => {

    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [users, setUsers] = useState([])
 

    useEffect(() => {
        if (rdxToken) {
            getAllUsers(rdxToken)
                .then(
                    response => {
                        setUsers(response.data.data);
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/");
        }
    }, []);

  

    return(
        <div className="users-body">
 
        <div className="container-all-users">
        {
            users.length > 0
                ? (<div className='users-Roster'>
                    {
                        users.map(users => { 

                            if (users.role === "user") {
                                users.role = "Estudent"
                            } else if (users.role== "admin") {
                                users.role = "Teacher"
                            } else if (users.role == "super_admin") {
                                users.role = "Director"
                            }

                            return (
                                <CardUser
                                    key={users.id}
                                    photo={users.photo}
                                    name={users.name}
                                    last_name={users.last_name}
                                    email={users.email}
                                    phone_number={users.phone_number}
                                    role={users.role}
                                    city={users.city}
                                />
                            )
                        }
                        )}
                </div>
                )
                : (
                    <div>Loading</div>
                )
        }
        </div>
    </div>
    )
}