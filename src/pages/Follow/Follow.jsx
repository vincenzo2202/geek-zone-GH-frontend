import { useDispatch, useSelector } from 'react-redux';
import './Follow.css';
import { selectToken } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getMyFollowers, getMyFollowings, getProfile } from '../../services/apiCalls';
import { useEffect, useState } from 'react';
import { FollowCard } from '../../common/FollowCard/FollowCard';
import { LinkButton } from '../../common/LinkButton/LinkButton';

export const Follow = () => {

    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenDecoded = jwtDecode(rdxToken);

    const [user, setUser] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        photo: ""
    });


    const [follow, setfollow] = useState([])
    const [myFollowings, setMyFollowings] = useState([])
    const [buttonFollows, setbuttonFollows] = useState(true)

    useEffect(() => {
        if (rdxToken && tokenDecoded.exp > Date.now() / 1000) {
            getMyFollowers(rdxToken)
                .then(
                    response => {
                        setfollow(response.data.data);
                    })
                .catch(error => console.log(error));

            getMyFollowings(rdxToken)
                .then(
                    response => {
                        setMyFollowings(response.data.data);
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/");
            dispatch(logout());
        }
    }, []);

    const listToShow = buttonFollows ? myFollowings : follow;
    console.log(listToShow);

    return (
        <div className="follow-body">
            <div className='follow-background'>
                <div className="follow-header"> <h1>Follows</h1> </div>
                <div className='button-followers'>
                    <button className='button-followers-user' onClick={() => setbuttonFollows(true)}>Show Followings</button>
                    <button className='button-followers-user' onClick={() => setbuttonFollows(false)}>Show Followers</button>
                </div>

                {listToShow.length > 0  
                    ? (
                        <div className="follow-container">
                            {listToShow.map(follow => (
                                <FollowCard
                                    key={follow.follow_info.id}
                                    name={follow.follow_info.name}
                                    last_name={follow.follow_info.last_name}
                                    photo={follow.follow_info.photo}
                                />
                            ))
                            }
                        </div>
                    )
                    : (
                        <div>Loading</div>
                    )}
            </div>
        </div>
    )
}