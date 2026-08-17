import { useEffect, useRef, useState } from "react";
import Movies from "../components/Movies";


const Home = () => {

    const inputRef = useRef(null); 
    const searchRef = useRef(null);

    const [value, setValue] = useState(null);
    const [search, setSearch] = useState(false);

    const handleSearch = () => {

        if (inputRef.current.value.trim() !== "") {
            setSearch(true);
            setValue(inputRef.current.value);

        }
    }
    
    return ( 
        <div className="w-full h-full flex flex-col items-center mt-[70px]">
            <p className="text-black font-mono sm:text-4xl text-3xl">Watch-O</p>

            <div className="bg-cyan-950 border border-cyan-200 sm:w-[400px] w-[200px] h-[30px] rounded-3xl flex shrink mt-5">
                <input ref={inputRef} type="text" id="inp" className="bg-cyan-950 border-0 text-mono rounded-l-3xl indent-5 text-cyan-200 caret-cyan-200 sm:w-[330px] w-[130px] border-cyan-200 active:outline-0 focus:outline-0" placeholder="Movie Name"/>
                <button ref={searchRef} className="ml-auto h-5 bg-cyan-950 rounded-r-3xl w-[70px]  h-[27px] border-0" onClick={handleSearch}><img src="search-icon.svg" alt="search" className="w-[60px] h-[22px] ml-[15px]"/></button>
            </div>

            <Movies search={search} term={value}/>

        </div>
     );
}
 
export default Home;