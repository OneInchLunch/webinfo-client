import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../GlobalStateProvider";
import { Content } from "../../Content/Content";
import { AdminDashboard } from "./Admin/AdminDashboard";

export const UserAdminView = (posts: any) => {
    const { state } = useGlobalState();
    const navigate = useNavigate();
    const [ dashboardToggle, setDashboardToggle ] = useState(false);

    useEffect(() => {
        if(state.id===null)
            navigate("/login");
    }, [navigate, state.id])

    const handleClick = () => {
        setDashboardToggle(!dashboardToggle);
    }

    return (
    <>
        {state.admin ?
            <Button variant="outline-light" onClick={handleClick}>Admin Dashboard</Button> : ""
        }
        {dashboardToggle ? 
            <AdminDashboard />
        : 
            <Content {...posts}/>
        }
    </>
    );
}