import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../GlobalStateProvider";

export const UserView = () => {
    const { state } = useGlobalState();
    const navigate = useNavigate();

    const logit = () => {
        console.log(state.id, undefined);
    };

    useEffect(() => {
        if(state.id===null)
            navigate("/login");
    }, [])

    return (
    <>
        <Button onClick={logit}>
            logit
        </Button>
    </>
    );
}