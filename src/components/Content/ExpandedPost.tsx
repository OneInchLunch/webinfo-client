import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSyntheticLeadingComments } from "typescript";

export const ExpandedPost = () => {
    const location: any = useLocation();
    const [ comments, setComments ] = useState<Comment[]>([]);

    useEffect(() => {
        getComments();
    }, []);

    const getComments = async() => {
        await axios.get("http://localhost:3001/comments", { params: {id: location.state.id}}).then((res => {
            setComments(res.data);
        }));
    };

    return (
    <>
        {comments.map((comment: any) => {
            return comment.body;
        })}
    </>
    );
}