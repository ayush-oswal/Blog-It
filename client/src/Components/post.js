import { Link } from 'react-router-dom'
import {format} from 'date-fns'
import './post.css'
const post = (props) =>{
    return(
        <div className='container'>
        <Link to={`/${props._id}`}>
        <div className='post'>
            <div className='image'>
            <img loading='lazy' src={props.Cover} alt='' />
            </div>
            <div className='Content'>
            <h1>{props.Title}</h1>
            <div className='info'>
                <div className='author'>by {props.Author.username}</div>
                &nbsp; &nbsp;
                <time>{format(new Date(props.updatedAt),'MMM d yyyy')}</time>
            </div>
            <p>{props.Summary}</p>
            </div>
        </div>
        </Link>
        </div>
    )
}
export default post