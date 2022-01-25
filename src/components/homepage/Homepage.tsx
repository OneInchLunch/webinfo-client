import { useEffect, useState } from "react";
import { useGlobalState } from "../../GlobalStateProvider";
import { AdminView } from "./views/AdminView";
import { GuestView } from "./views/GuestView";
import { UserView } from "./views/UserView";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
    const { state } = useGlobalState();
    const [ posts, setPosts ] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(state.id === undefined)
            navigate("/login");
    }, [])

    const getPosts = async() => {
        await axios.get("http://localhost:3001/posts").then((res) => {
            setPosts(res.data);
        })
    }

    useEffect(() => {
        if(state.id !== undefined) {
            getPosts();
        }
    }, [])

    return (
    <>
        {state.username === ""  &&
            <GuestView posts={posts}/>}
        {
        state.admin ?
            <AdminView />
        : state.username !== "" &&
            <UserView />
        }

    </>
    );
}