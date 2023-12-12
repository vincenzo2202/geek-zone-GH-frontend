import { useState } from 'react';
import './FeedCard.css';

export const FeedCard = ({ key, userPhoto, user_id, userName, userLast_name, title, content, photo }) => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

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


            <button className="button-spoiler" onClick={toggleCollapse}>
                    {collapsed ? "comments" : "comments"}
                </button>

            {!collapsed && (
                    <div className="comments"> 
                        <div className="comment">Prueba de comentario</div> 
                        {/* aqui va el componente de comentarios */}
                    </div>
                )}

        </div >
    )
}; 