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
    const [ comments, setComments ] = useState<Comment[]>([]);
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

    const getComments = async() => {
        await axios.get("http://localhost:3001/comments").then((res) => {
            setComments(res.data);
        })
    }

    useEffect(() => {
        if(state.id !== undefined) {
            getPosts();
            getComments();
        }
    }, [])

    return (
    <>
        {state.username === ""  &&
            <GuestView {...posts}/>}
        {
        state.admin ?
            <AdminView />
        :
            <UserView />
        }

    </>
    );
}