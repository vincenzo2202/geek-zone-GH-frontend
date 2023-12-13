import { useDispatch, useSelector } from 'react-redux';
import './GetAllUser.css';
import { selectToken } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../services/apiCalls';


export const Users = () => {

    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        if (rdxToken) {
            getAllUsers(rdxToken)
                .then(
                    response => {
                        setFeed(response.data.data);
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/");
        }
    }, []);

  

    return(
        <div className='users-body'>
            <h1>Users</h1>
        </div>
    )
}