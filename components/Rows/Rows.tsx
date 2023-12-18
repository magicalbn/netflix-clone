import { AxiosResponse } from "axios";
import { useEffect, useState, useRef } from "react";
import axios from "@/axios/MovieApi";
import { request, imageURL } from "@/axios/NetflixRequets";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import PosterDetails from "./PosterDetails";
interface RowsChild {
    requestURL: string;
    title: string;
    large?: boolean;
    number?: boolean;
}

const Rows: React.FC<RowsChild> = (props) => {
    const [moviesList, setmoviesList] = useState<any>();
    const [leftPaddle, setleftPaddle] = useState<boolean>(false);
    const rowRef: any = useRef();

    useEffect(() => {
        rowRef.current.addEventListener("scroll", scrollHandler);

        return () => {
            rowRef.current?.removeEventListener("scroll", scrollHandler);
        };
    }, [rowRef]);

    const scrollHandler = (e) => {
        if (e.target?.scrollLeft > 0) {
            setleftPaddle(true);
        } else {
            setleftPaddle(false);
        }
    };

    const scrollOnClick = (left) => {
        if (left) {
            rowRef.current.scrollLeft =
                rowRef.current.scrollLeft - window.innerWidth * 0.8;
        } else {
            rowRef.current.scrollLeft =
                rowRef.current.scrollLeft + window.innerWidth * 0.8;
        }
    };

    const paddles = (
        <div className="paddles">
            <button
                onClick={() => scrollOnClick(true)}
                className={`left-paddle paddle ${leftPaddle ? "" : "hidden"}`}
            >
                <IoIosArrowBack />
            </button>
            <button
                onClick={() => scrollOnClick(false)}
                className="right-paddle paddle"
            >
                <IoIosArrowForward />
            </button>
        </div>
    );

    useEffect(() => {
        if (props.requestURL)
            axios.get(props.requestURL).then((res: any) => {
                setmoviesList(
                    props.number
                        ? res.data.results.splice(0, 10)
                        : res.data.results
                );
            });
    }, []);
    return (
        <div className="row">
            <h2>
                {props.title} <IoIosArrowForward />
            </h2>
            {props.large && props.number ? (
                <div className={"row_posters poster "} ref={rowRef}>
                    {moviesList?.map((each, index) => {
                        return (
                            <div className="card " key={each.id}>
                                <p>{index + 1}</p>
                                <img
                                    className="skel"
                                    key={each.id}
                                    alt="poster"
                                    src={imageURL + each.poster_path}
                                ></img>
                            </div>
                        );
                    })}

                    {paddles}
                </div>
            ) : (
                <div
                    className={`row_posters  ${props.large ? "poster" : ""}`}
                    ref={rowRef}
                >
                    {moviesList?.map((each) => {
                        return each.poster_path && each.backdrop_path ? (
                            <div key={each.id} className="poster_item ">
                                <img
                                    className="skel"
                                    alt="poster"
                                    src={
                                        imageURL +
                                        (props.large
                                            ? each.poster_path
                                            : each.backdrop_path)
                                    }
                                ></img>
                                {!props.large ? (
                                    <PosterDetails
                                        title={each.title}
                                        genres={each.genre_ids}
                                    />
                                ) : null}
                            </div>
                        ) : null;
                    })}
                    {paddles}
                </div>
            )}
        </div>
    );
};

export default Rows;
