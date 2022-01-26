import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../GlobalStateProvider";
import { Content } from "../../Content/Content";

export const UserAdminView = (posts: any) => {
    const { state } = useGlobalState();
    const navigate = useNavigate();

    useEffect(() => {
        if(state.id===null)
            navigate("/login");
    }, [navigate, state.id])

    return (
    <>
        {state.admin &&
        <Button>Dashboard</Button>}
        <Content {...posts}/>
    </>
    );
}