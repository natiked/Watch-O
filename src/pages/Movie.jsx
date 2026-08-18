import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const bearer = import.meta.env.VITE_RAT;
const baseImg = 'https://image.tmdb.org/t/p/w500';

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
            return res.json();
        })
        .then(result => {
            setLoading(false);
            setMov(result);
        })
        .catch((err) => console.log(err.message));
    }, [id]);

    if (loading) return (
        <div className="max-w-5xl mx-auto px-6 py-20 animate-pulse flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 aspect-video bg-cyan-950/40 rounded-3xl border border-cyan-900/30" />
            <div className="w-full md:w-1/2 space-y-4 pt-4">
                <div className="h-8 bg-cyan-950/40 rounded-xl w-3/4" />
                <div className="h-24 bg-cyan-950/40 rounded-xl w-full" />
                <div className="h-6 bg-cyan-950/40 rounded-xl w-1/4" />
            </div>
        </div>
    );

    if (err) return <div className="text-center text-red-400 font-medium py-20">An error occured !</div>;

    return ( 
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center gap-8">
            <div className="w-full flex flex-col md:flex-row gap-8 bg-cyan-950/30 border border-cyan-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-xl shadow-cyan-950/30 items-stretch">
                <div className="w-full md:w-1/2 aspect-video shrink-0 overflow-hidden rounded-2xl bg-cyan-950">
                    <img 
                        src={(mov?.backdrop_path) ? baseImg + mov.backdrop_path : 'placeholder.png'} 
                        alt="Movie Backdrop" 
                        className="object-cover h-full w-full" 
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 text-slate-100">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                        {mov?.title}
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                        {mov?.overview || "No overview available."}
                    </p>
                    <div className="pt-2 flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-medium bg-cyan-900/60 border border-cyan-700/50 px-3 py-1 rounded-full">
                            Language: {mov?.original_language}
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-950 to-cyan-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 rounded-full font-medium text-sm transition-all duration-300 shadow-md hover:shadow-cyan-950 hover:-translate-y-0.5">
                    <Link to="../">Back</Link>
                </button>
            </div>
        </div>
    );
};

export default Movie;