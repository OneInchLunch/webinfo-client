import { useEffect, useState } from "react";
import { useGlobalState } from "../../GlobalStateProvider";
import { AdminView } from "./views/Admin/AdminView";
import { GuestView } from "./views/GuestView";
import { UserView } from "./views/UserView";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../../App.css'

export const Homepage = () => {
    const { state } = useGlobalState();
    const [ posts, setPosts ] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(state.id === undefined)
            navigate("/login");
    }, [state.id, navigate])

    const getPosts = async() => {
        await axios.get("http://localhost:3001/posts").then((res) => {
            setPosts(res.data);
        })
    }

    useEffect(() => {
        if(state.id !== undefined) {
            getPosts();
        }
    }, [state.id])

    return (
    <div className="dark-bg">
        {state.username === ""  &&
            <GuestView posts={posts}/>}
        {
        state.admin ?
            <AdminView />
        : state.username !== "" &&
            <UserView />
        }

    </div>
    );
}