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
    const [filtered, setFilteredUsers] = useState('')


    useEffect(() => {
        if (rdxToken) {
            getAllUsers(rdxToken)
                .then(
                    response => {
                        const transformedUsers = response.data.data.map(user => {
                            if (user.role === "user") {
                                user.role = "Student";
                            } else if (user.role === "admin") {
                                user.role = "Teacher";
                            } else if (user.role === "super_admin") {
                                user.role = "Director";
                            }
                            return user;
                        });
                        setUsers(response.data.data);
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/");
        }
    }, []);


    const filteredUsers = filtered ? users.filter(user => user.role === (filtered ?filtered : '' )) : users;

    return (
        <div className="users-body"> 
            <div className='button-filter'>
                <button className='button-filter-users' onClick={() => setFilteredUsers('')}>Show All</button>
                <button className='button-filter-users' onClick={() => setFilteredUsers('Student')}>Show Students</button>
                <button className='button-filter-users' onClick={() => setFilteredUsers('Teacher')}>Show Teachers</button>
            </div>

            <div className="container-all-users">
                {
                    filteredUsers.length > 0
                        ? (<div className='users-Roster'>
                            {
                                filteredUsers.map(users => {


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
                                            id={users.id}
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