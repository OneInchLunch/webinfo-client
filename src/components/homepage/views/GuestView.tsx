import { FC } from "react";
import { Button } from "react-bootstrap";
export const GuestView: FC<Post> = (posts): JSX.Element => {
    const logit = () => {
        console.log(posts);
    };
    
    return (
    <>
        <Button onClick={logit}>
            logit
        </Button>
    </>
    );
}