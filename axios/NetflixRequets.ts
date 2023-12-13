export const request = {
    fetchTrending: `/trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
    fetchNetflixOrignals: `/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
    fecthActionMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=25`,
    fetchHorrorMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=99`,
};

export const imageURL = "http://image.tmdb.org/t/p/original";
