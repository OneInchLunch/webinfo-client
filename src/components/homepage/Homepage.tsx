import { useEffect, useState } from "react";
import { useGlobalState } from "../../GlobalStateProvider";
import { GuestView } from "./views/GuestView";
import { UserAdminView } from "./views/UserAdminView";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../../App.css'
import { BannedView } from "./views/BannedView";

export const Homepage = () => {
    const { state } = useGlobalState();
    const [ posts, setPosts ] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(state.id === undefined)
            navigate("/login");
    }, [state.id, navigate])

    const getPosts = async() => {
        await axios.get("http://192.168.1.10:3001/posts").then((res) => {
            setPosts(res.data);
        })
    }

    useEffect(() => {
        if(state.id !== undefined) {
            getPosts();
        }
    }, [state.id])

    return (
    <div>
        {!state.active ?  
            <BannedView /> :
                state.username !== "" ?
                    <UserAdminView posts={posts}/> :
                    <GuestView posts={posts}/>
        }
    </div>
    );
}