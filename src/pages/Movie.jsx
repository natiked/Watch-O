import { useEffect , useState } from "react";
import { useParams , Link } from "react-router-dom";


const bearer = import.meta.env.VITE_RAT;
const baseImg = 'https://image.tmdb.org/t/p/original'

const Movie = () => {

    const { id } = useParams();

    const [mov, setMov] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [noMovie, setnoMovie] = useState(false);
    

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${bearer}`
            }
        })
        .then(res => {
            if (!res.ok) {
                setErr(true);
                setLoading(false);
                throw new Error('An error occured');
            }
            return res.json()
        })
        .then(result => {
            setLoading(false);
            setMov(result)
        })

        .catch((err) => console.log(err.message))
        
    }, [id])

    if (loading) return <div>Loading ...</div>
    if (err) return <div>An error occured !</div>
    return ( 
        <div className="w-full flex mt-[60px] flex-col items-center justify-center">

            <div className="flex gap-[30px] px-[150px] w-full flex-row min-h-[400px] justify-around overflow-hidden">
                <div className="h-80 ">
                    <img src={(mov.backdrop_path) ? baseImg + mov.backdrop_path : 'placeholder.png'} alt="Movie Backdrop" className="object-cover h-full w-full rounded-2xl" />
                </div>
                <div className="h-80 max-w-[600px] flex flex-col gap-[5px] text-black border border-cyan-100 pl-[15px] rounded-2xl">
                    <h1 className="mt-[40px] ml-[5px]">Title: {mov.title}</h1>
                    <p>Description: {mov.overview}</p>
                    <p>Language: {mov.original_language}</p>
                </div>
            </div>
            <div >
                <button className="w-[80px] h-[30px] bg-cyan-200 text-black rounded-2xl"><Link to="../">Back</Link></button>

            </div>


        </div>
     );
}
 
export default Movie;