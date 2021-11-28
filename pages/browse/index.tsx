import axios from '@/axios/MovieApi'
import { request, imageURL } from '@/axios/NetflixRequets'
import React, { useEffect, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { IoMdInformationCircleOutline } from 'react-icons/io'


//redux
import { connect } from 'react-redux'
import { UserActionList, ReducerStoreState, } from '@/store/actions'

import Layout from '@/components/Layout'
import Rows from '@/components/Rows/Rows'

const Browse: React.FC = (props: any) => {
    const [bannerData, setbannerData] = useState<any>(props.banner)

    const truncate = (str, n) => {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    };

   

    return (
        <Layout title="Home - Netflix">
           
            <div className="browse">
                {bannerData ? (
                    <div className="banner">
                        <img src={imageURL + bannerData.backdrop_path} alt="banner"></img>
                        <div className="information">
                            <h1>{bannerData.name}</h1>
                            <h3>{truncate(bannerData.overview, 100)}</h3>
                            <div className="btn_grp">
                                <button className="play"><BsFillPlayFill /> Play</button>
                                <button className="more"><IoMdInformationCircleOutline />More Info</button>

                            </div>
                        </div>
                    </div>
                )
                    : null
                }
                <div className="content">
                    <Rows large title="Netflix Orignals" requestURL={request.fetchNetflixOrignals} />
                    <Rows large number title="Trending Now" requestURL={request.fetchTrending} />
                    <Rows title="Top Rated" requestURL={request.fetchTopRated} />
                    <Rows title="Documentaries" requestURL={request.fetchDocumentaries} />
                    <Rows title="Horror" requestURL={request.fetchHorrorMovies} />
                    {// <Rows title="Comedy" requestURL={request.fetchComedyMovies} />
                    }
                    <Rows title="Romance" requestURL={request.fetchRomanceMovies} />
                    <Rows title="Action" requestURL={request.fecthActionMovies} />
                </div>

            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { data } = await axios.get(request.fetchNetflixOrignals)

    return {
        props: { banner: data.results[Math.floor(Math.random() * 10)] }, // will be passed to the page component as props
    }
}


const mapStatetoProps = (state: ReducerStoreState) => {
    return {
        AuthData: state.Authdata
    }
}


const mapDispacthtoProps = (dispatch: any) => {
    return {
      
        logoutUser: () => dispatch(UserActionList.userLogOut()),
    }
}
export default connect(mapStatetoProps, mapDispacthtoProps)(Browse)