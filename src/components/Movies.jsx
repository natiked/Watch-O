import { useEffect, useState } from "react";

const bearer = import.meta.env.VITE_RAT;
const baseImg = 'https://image.tmdb.org/t/p/original'

const Movies = ({search, term}) => {

    const [mov, setMov] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [noMovie, setnoMovie] = useState(false);

    useEffect(() => {
        if(search) {

            if(search) {
                setLoading(true);
            }

            const searched = fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1` ,{
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${bearer}`
                }
                })
            .then((res) => {
                if(!res.ok){
                    throw new Error("Fetching Failed")
                    setErr(true)
                    setLoading(false)
                }
                return res.json()
            })
            .then(result => {
                setMov(result.results);
                setLoading(false)
                console.log(result.results)
                if (result.results.length == 0) setnoMovie(true)
            })
        }

        else {

            const movies = fetch('https://api.themoviedb.org/3/movie/popular', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${bearer}`
                }
                })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('HTTP request failed !')
                        setErr(true);
                        setLoading(false)
                    }
                    return res.json();
                }
            )
                .then(result => {
                    setMov(result.results);
                    setLoading(false);
                
                })
                .catch(err => {
                    console.log(err)
                    setErr(true);
                
                });
                
        }
    
        }, [search, term])

    if (loading) return <div><p>Loading ...</p></div>
    if (err) return <p>An error occured !</p>
    if (noMovie) return <p>Movie not found</p>
    return (
        <div className="w-[400px] sm:w-[800px] md:w-[1000px] px-10 flex flex-col justify-center items-center" >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full gap-8 justify-items-center mt-5 px-10 mb-3">
                
                { mov && mov.map( (single) => (
               <div className="group max-w-[300px] w-full h-[300px] border border-cyan-200 rounded-4xl flex justify-center items-center flex-col relative overflow-hidden hover:shadow-2xl cursor-pointer" id={single.id}>

                    <img src={(single.backdrop_path) ? baseImg + single.backdrop_path : 'placeholder.png'} alt={single.backdrop_path} className="w-full h-full object-cover" />
             
                    <div className="absolute inset-0 bg-cyan-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="relative w-full h-full">
                            <p className="top-0 left-0 ml-3 mt-5 text-center">{single.title}</p>
                            <p className="text-cyan-400 indent-3 mx-3 mt-5">{single.overview ? single.overview.split(" ").slice(0, 30).join(" ") + " ..." : "No Overview Available"} </p>
                            <button className="bg-cyan-400 rounded-md text-white px-4 py-0.5 bottom-3 right-3 absolute text-center flex justify-center items-center font-mono">{single.original_language}</button>
                        </div>
                    </div>
                </div> )
                ) 
                }
            
            </div>
        </div>
    )
} 
export default Movies;