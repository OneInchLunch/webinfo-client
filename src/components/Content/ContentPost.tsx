import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export const ContentPost = (post: Post) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/expanded/${post.id}`, {state: post})
    }
    return (
    <>
        <Container>
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <Card className="corners">
                        <Card.Img variant="top" src={post.img} style={{minHeight: "40vh", maxHeight: "40vh"}} />
                        <Card.Body as="button" className="btn-invis text-start" onClick={handleClick} style={{minHeight: "2vh"}}>
                        <Card.Title style={{padding: "0 0.75rem 0 0.75rem"}}>
                                {post.title}
                        </Card.Title>
                        <Card.Subtitle 
                            style={{
                                color: "grey",
                                padding: "0 0.75rem 0 0.75rem",
                                }}>
                            {post.poster !== "" ?
                            post.poster :
                            "unknown"}
                        </Card.Subtitle>
                        <Card.Text
                            className="overflowing"
                            style={{
                                padding: "0 0.75rem 0 0.75rem",
                            }}>
                            {post.body}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <div className="sth-spacer"/>
    </>
    );
}