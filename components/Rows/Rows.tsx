import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import axios from '@/axios/MovieApi'
import { request, imageURL } from '@/axios/NetflixRequets'
import { IoIosArrowForward } from 'react-icons/io'
interface RowsChild {
    requestURL: string,
    title: string,
    large?: boolean
    number?: boolean
}

const Rows: React.FC<RowsChild> = (props) => {
    const [moviesList, setmoviesList] = useState<any>()

    useEffect(() => {
        if (props.requestURL)
            axios.get(props.requestURL)
                .then((res: any) => {setmoviesList( props.number ? res.data.results.splice(0,10):res.data.results )})
    }, [])
    return (
        <div className="row">
            <h2>{props.title} <IoIosArrowForward /></h2>
            {
                (props.large && props.number) ? (
                    <div className={"row_posters poster"}>
                        {
                            moviesList?.map((each,index) => {


                                return (
                                    <div className="card" key={each.id}>
                                        <p>{index+1}</p>
                                        <img key={each.id} src={imageURL +  each.poster_path}></img>
                                    </div>
                                )
                            })
                        }
                    </div>

                ) : (
                    <div className={`row_posters ${props.large ? 'poster' : ''}`}>

                        {
                            moviesList?.map(each => {


                                return (
                                    <img key={each.id} src={imageURL + (props.large ? each.poster_path : each.backdrop_path)}></img>
                                )
                            })
                        }
                    </div>
                )

            }

        </div>
    )
}

export default Rows