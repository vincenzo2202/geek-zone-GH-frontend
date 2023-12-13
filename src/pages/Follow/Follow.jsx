import { useDispatch, useSelector } from 'react-redux';
import './Follow.css';
import { selectToken } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getMyFollowers } from '../../services/apiCalls';
import { useEffect, useState } from 'react';
import { FollowCard } from '../../common/FollowCard/FollowCard';

export const Follow = () => {

    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenDecoded = jwtDecode(rdxToken);


    const [follow, setfollow] = useState([])

    useEffect(() => {
        if (rdxToken && tokenDecoded.exp > Date.now() / 1000) {
            getMyFollowers(rdxToken)
                .then(
                    response => {
                        setfollow(response.data.data);
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/");
            dispatch(logout());
        }
    }, []);

    console.log(follow);
    return (
        <div className="follow-body">
            <div className='follow-background'>
                {follow.length > 0 ? (
                    <div className="follow-container">
                        {follow.map(follow => (
                            <FollowCard
                                name={follow.follower.name}
                                last_name={follow.follower.last_name}
                                photo={follow.follower.photo}
                            />
                        ))
                        }
                    </div>
                ) : (
                    <div>Loading</div>
                )}
            </div>
        </div>
    )
}