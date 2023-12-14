import './DeleteLink.css'

export const DeleteLink = ({ className, deleted, title }) => {
    return (
        <div  className={className} onClick={() => deleted()}>{title}</div>
    )
} 