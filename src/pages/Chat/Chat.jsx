 
import './Chat.css'
 
 

export const Chat = () => {
 
    return (
        <div className='chat-body'>
        <div className='chat-container'>
            <div className='chat-list-container'> 
            </div>
            <div className='chat-conversation-container'>
                <div className='messages-container'> 
                </div>
                <div className='message-input-container'>
                    <input className='input-text-chat' type="text" placeholder="Enter text here..."/>
                    <button className='button-chat-send'>Send</button>
                </div>
            </div>
        </div>
    </div>
    );
}