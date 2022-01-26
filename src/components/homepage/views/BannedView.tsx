import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const BannedView = () => {
    const navigate = useNavigate();
    
    const returnLogin = () => {
        navigate("/");
    }

    return(
    <>
        <div className="spacer"/>
        <Container>
            <Row>
                <Col md={{span:4, offset:4}}>
                    <Stack gap={4}>
                        <h2 className="text-white text-center">
                            This Account has been deactivated,<br />please contact an Admin or make a new account.    
                        </h2>
                        <Button 
                            variant="light"
                            style={{width: "100%"}}
                            onClick={returnLogin}>I understand</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    </>
    );
}