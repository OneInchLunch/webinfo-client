import { FC } from "react";
import { Content } from "../../Content/Content";
import '../../../App.css'
export const GuestView: FC<any> = (props): JSX.Element => {
    return (
    <div className="dark-bg">
        <Content {...props}/>
    </div>
    );
}