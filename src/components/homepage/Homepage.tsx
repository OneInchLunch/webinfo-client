import { useGlobalState } from "../../GlobalStateProvider";
import { AdminView } from "./views/AdminView";
import { GuestView } from "./views/GuestView";
import { UserView } from "./views/UserView";

export const Homepage = () => {
    const { state } = useGlobalState();

    return (
    <>
        {state.username === ""  &&
            <GuestView />}
        {
        state.admin ?
            <AdminView />
        :
            <UserView />
        }

    </>
    );
}