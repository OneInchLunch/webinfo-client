import { FC } from "react";
import { Content } from "../../Content/Content";
export const GuestView: FC<any> = (props): JSX.Element => {

    return (
    <>
        <Content {...props}/>
    </>
    );
}