import { useEffect, useState } from "react"
import Featured from "../../components/featured/Featured"
import List from "../../components/list/List"
import Navbar from "../../components/navbar/Navbar"
import "./home.scss"
import axios from "axios";

const Home = ({type}) => {
    const [lists,setLists]=useState([]);
    const [genre,setGenre]=useState(null);
    const axiosInstance = axios.create(
        {baseURL:process.env.REACT_APP_API_URL,
        })
    
    useEffect(()=>{
        const getRandomLists = async ()=>{
            try{
                const res = await axiosInstance.get(
                    `lists${type ? "?type=" + type : ""}${
                        genre  ? "&genre=" + genre : ""
                    }`,
                    {
                        headers:{
                            token: JSON.parse(localStorage.getItem("user")).accessToken,
                        },
                    }
                );
                setLists(res.data);
            }catch(err){
                console.log(err);
            }
        };
        getRandomLists();
    },[type,genre]);
    return (
        <div className='home'>
           <Navbar />
            <Featured type={type} setGenre={setGenre} />
            {lists.map((list)=> (
                <List list={list} />
            ))}
        </div>
    );
};

export default Home;
