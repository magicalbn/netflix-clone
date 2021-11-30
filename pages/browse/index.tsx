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
import Player from '@/components/Player/Player'

const Browse: React.FC = (props: any) => {
    const [bannerData, setbannerData] = useState<any>(props.banner)
    const [showPlayer, setShowPlayer] = useState<boolean>(false)

    const truncate = (str, n) => {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    };

    const showPlayerHandler = () => {
        setShowPlayer(!showPlayer)
    }

    return (<>
        {showPlayer ? <Player backdrop={showPlayerHandler} /> : null}
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
                    <Rows key={1} large title="Orignals" requestURL={request.fetchNetflixOrignals} />
                    <Rows key={2} large number title="Trending Now" requestURL={request.fetchTrending} />
                    <Rows key={3} title="Top Rated" requestURL={request.fetchTopRated} />
                    <Rows key={4} title="Romance" requestURL={request.fetchRomanceMovies} />
                    <Rows key={5} title="Action" requestURL={request.fecthActionMovies} />
                    <Rows key={6} title="Documentaries" requestURL={request.fetchDocumentaries} />
                    <Rows key={7} title="Horror" requestURL={request.fetchHorrorMovies} />
                    {// <Rows title="Comedy" requestURL={request.fetchComedyMovies} />
                    }
                    
                </div>

            </div>

           
        </Layout>
    </>
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