import './EventCard.css';

export const EventCard = ({eventId,title,content,date,time}) => {

    return(
        <div className='card-event'>
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