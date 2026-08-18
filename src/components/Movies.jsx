import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const bearer = import.meta.env.VITE_RAT;
const baseImg = 'https://image.tmdb.org/t/p/w500';

const Movies = ({ search, term }) => {
    const navigate = useNavigate();

    const [mov, setMov] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [noMovie, setnoMovie] = useState(false);

    const handleClick = (id) => {
        var url = `/movie/${id}`;
        console.log(url);
        navigate(url);
    };

    useEffect(() => {
        if (search) {
            if (search) {
                setLoading(true);
            }

            const searched = fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${bearer}`
                }
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Fetching Failed");
                    setErr(true);
                    setLoading(false);
                }
                return res.json();
            })
            .then(result => {
                setMov(result.results);
                setLoading(false);
                console.log(result.results);
                if (result.results.length == 0) setnoMovie(true);
            });
        } else {
            const movies = fetch('https://api.themoviedb.org/3/movie/popular', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${bearer}`
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('HTTP request failed !');
                }
                return res.json();
            })
            .then(result => {
                setMov(result.results);
                console.log(result);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setErr(true);
                setLoading(false);
            });
        }
    }, [search, term]);

    if (loading) return (
        <div className="w-full max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-video bg-cyan-950/40 rounded-2xl border border-cyan-900/30" />
            ))}
        </div>
    );

    if (err) return <p className="text-center text-red-400 font-medium py-16">An error occurred !</p>;
    if (noMovie) return <p className="text-center text-cyan-400/80 font-medium py-16">Movie not found</p>;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-6">
                {mov && mov.map((single) => (
                    <div 
                        onClick={() => { handleClick(String(single.id)); }} 
                        className="group relative aspect-video w-full rounded-2xl overflow-hidden cursor-pointer border border-cyan-900/40 bg-cyan-950 shadow-lg shadow-cyan-950/20 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-900/40 hover:-translate-y-1 transition-all duration-300" 
                        key={single.id}
                    >
                        <img 
                            src={(single.backdrop_path) ? baseImg + single.backdrop_path : 'placeholder.png'} 
                            alt={single.backdrop_path || single.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                            <p className="text-white font-bold text-base leading-snug line-clamp-1 mb-1.5 tracking-tight">
                                {single.title}
                            </p>
                            <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed mb-3 font-normal">
                                {single.overview ? single.overview.split(" ").slice(0, 30).join(" ") + " ..." : "No Overview Available"}
                            </p>
                            <div className="flex justify-end">
                                <button className="bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                    {single.original_language}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;