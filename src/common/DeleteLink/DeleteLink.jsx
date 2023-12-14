import './DeleteLink.css'

export const DeleteLink = ({ className, deleted, title,id}) => {
    return (
        <div  className={className} onClick={() => deleted(id)}>{title}</div>
         
         
    )
} 