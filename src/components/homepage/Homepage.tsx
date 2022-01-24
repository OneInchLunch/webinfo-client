import { Button } from "react-bootstrap"
import { useGlobalState } from "../../GlobalStateProvider";

export const Homepage = () => {
    const { state } = useGlobalState();

    const logit = () => {
        console.log(state);
    }

    return (
    <>
        <Button onClick={logit}>
            logit
        </Button>
    </>
    );
}