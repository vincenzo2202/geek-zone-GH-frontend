import { useSelector } from 'react-redux';
import { DeleteLink } from '../DeleteLink/DeleteLink';
import './EventCard.css';
import { selectToken } from '../../pages/userSlice';
import { jwtDecode } from 'jwt-decode';
import { deleteEvent} from '../../services/apiCalls';

export const EventCard = ({ eventId, title, content, date, time, creator }) => {

    const rdxToken = useSelector(selectToken);
    const tokenDecoded = jwtDecode(rdxToken);
 
    const deletedEvent = (id) => {
        deleteEvent(rdxToken, id)
            .then(response => {
                props.onDeleteFeed(id);
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='card-event'>
            <div className='delete-card-event'>
                {
                    parseInt(tokenDecoded.sub, 10) === creator &&
                    <DeleteLink
                        deleted={() => deletedEvent(eventId)}
                        title={<div className="button-delete-comment" >
                            <img className="del" src="https://cdn-icons-png.flaticon.com/512/58/58326.png" alt="" />
                        </div>}
                    />
                }
            </div>
            <div className="event-card" >
                <div className='event-info' key={eventId}>
                    <div className='desc'>Title: </div>
                    <div className="event-title">{title}</div>
                    <div className='desc'>Content: </div>
                    <div className="event-content">{content}</div>
                    <div className='desc'>Date: </div>
                    <div className="event-date">{date}</div>
                    <div className='desc'>Time: </div>
                    <div className="event-time">{time}</div>

                </div>

            </div>

        </div>
    )
};