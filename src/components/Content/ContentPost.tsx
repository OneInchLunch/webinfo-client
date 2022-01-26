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
                    <Card>
                        <Card.Img variant="top" src={post.img} style={{minHeight: "40vh", maxHeight: "40vh"}} />
                        <Card.Body>
                        <Card.Title>
                            <Button onClick={handleClick}
                                    variant="link"
                                    className="text-black"
                                    style={{textDecoration: "none"}}>
                                {post.title}
                            </Button>
                            <Card.Subtitle
                                style={{color: "grey",
                                        paddingLeft: "0.75rem"}}>
                                {post.poster !== "" ?
                                post.poster :
                                "unknown"}
                            </Card.Subtitle>
                        </Card.Title>
                        <Card.Text
                            style={{
                                padding: "0 0.75rem 0 0.75rem",
                                overflow: "hidden",
                                textOverflow: "elipsis"
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