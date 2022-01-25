import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export const ContentPost = (post: Post) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/expanded/${post.id}`, {state: post})
    }
    return (
    <>
        <br />{post.title}<br />
        {post.poster === "" ? "[ unknown ]" : post.poster}<br /> 
        {post.body}<br />
        <Button onClick={handleClick}>Read more</Button>
    </>
    );
}