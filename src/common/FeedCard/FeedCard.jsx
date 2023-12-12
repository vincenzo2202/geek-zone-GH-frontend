import './FeedCard.css';

export const FeedCard = ({ key, userPhoto, user_id, userName, userLast_name, title, content, photo }) => {
    return (
        <div className='card'>
            <div className="feed-card" key={key}>
                <div className='desc'>Photo: </div> 
                <img className="pic-avatar" src={userPhoto} alt={userPhoto} />
                <div className='desc'>User ID: </div>
                <div className="user-id"> {user_id}</div>
                <div className='desc'>Name: </div>
                <div className="user-name">{userName}</div>
                <div className='desc'>Last name: </div>
                <div className="user-lastname">{userLast_name}</div>
                <div className='desc'>Title: </div>
                <div className="feed-title">{title}</div>
                <div className='desc'>Content: </div>
                <div className="feed-content">{content}</div>
             
              
                {
                    photo
                        ? (
                            <>
                            <div className='desc'>Photo:  </div> 
                            <img className="pic-feed" src={photo} alt={photo} />
                            </>
                        )
                        : (
                            <div ></div>
                        )


                }
            </div>
        </div >
    )
}; 