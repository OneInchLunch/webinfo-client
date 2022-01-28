import { useEffect, useState } from "react";
import { useGlobalState } from "../../GlobalStateProvider";
import { GuestView } from "./views/GuestView";
import { UserAdminView } from "./views/UserAdminView";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../../App.css'
import { BannedView } from "./views/BannedView";
import { useIsMounted } from "../../isMounted";

export const Homepage = () => {
    const { state } = useGlobalState();
    const [ posts, setPosts ] = useState<Post[]>([]);
    const navigate = useNavigate();
    const isMounted = useIsMounted();

    useEffect(() => {
        if(state.id === undefined)
            navigate("/login");
    }, [state.id, navigate])

    useEffect(() => {
        const getPosts = () => {
            axios.get("http://localhost:3001/posts")
            .then((res) => { if(isMounted()) setPosts(res.data);})
            .catch((error) => console.log(error));
        }
        if(state.id !== undefined) {
            if(isMounted()) getPosts();
        }
    })

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