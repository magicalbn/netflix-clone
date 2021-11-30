import { IoPlay } from 'react-icons/io5'
import { IoIosAdd, IoMdPlay } from 'react-icons/io'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import genreData from '../../data/genreData.json'
const PosterDetails: React.FC<any> = ({ title, genres }) => {
    return (
        <div className='poster_details'>
            <p>{title}</p>
            <ul>
                <p><IoMdPlay /></p>
                <p><IoIosAdd /></p>
                <p><AiOutlineLike /></p>
                <p><AiOutlineDislike /></p>
            </ul>
            <div className='genres'>
                {
                    genres.map(each => {
                        
                        const found = genreData.find((genre)=>{
                           return each==genre.id
                        })
                       
                        if(found){
                            return <p key={each}>{found.name}</p>
                        }
                    })
                }

            </div>
        </div>
    )
}

export default PosterDetails
