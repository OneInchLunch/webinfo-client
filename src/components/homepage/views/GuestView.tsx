import { FC, useEffect } from "react";
import { Content } from "../../Content/Content";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../GlobalStateProvider";

export const GuestView: FC<any> = (props): JSX.Element => {
    const { state } = useGlobalState();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(state.id===null)
            navigate("/login");
    }, [navigate, state.id])
    
    return (
    <div className="dark-bg">
        <Content {...props}/>
    </div>
    );
}