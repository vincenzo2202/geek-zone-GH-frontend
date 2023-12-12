import { useDispatch, useSelector } from 'react-redux';
import './CommentCard.css';
import { selectToken } from '../../pages/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCommentsByFeedID } from '../../services/apiCalls';



export const CommentCard = ({feedId}) => {

    

    console.log(feedId);

    return(
        <div>
       
    </div>
    )
};