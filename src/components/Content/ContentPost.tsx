import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import { useGlobalState } from "../../GlobalStateProvider";

export const ContentPost = (post: Post) => {
    const navigate = useNavigate();
    const { state } = useGlobalState();

    const deleteAllComments = (id: number) => {
        axios.delete('http://localhost:3001/deleteAllComments', {data: {id: id}})
        .catch((error) => console.log(error))
    };

    const deletePost = (id: number) => {
        axios.delete('http://localhost:3001/deletePost', {data: {id: id}})
        .catch((error) => console.log(error))
    };

    const handleClick = () => {
        navigate(`/expanded/${post.id}`, {state: post})
    }

    const handleDeleteClick = () => {
        deleteAllComments(post.id);
        deletePost(post.id);
    }

    return (
    <>
        <Container>
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <Card className="corners">
                        {state.admin ? 
                        <Card.Header>
                            <Button 
                                style={{width: "100%"}} 
                                size="sm" 
                                variant="outline-dark"
                                onClick={handleDeleteClick}>
                                    Delete post
                            </Button>
                        </Card.Header> : ""}
                        <Card.Img variant="top" src={post.img} style={{minHeight: "40vh", maxHeight: "40vh"}} />
                        <Card.Body onClick={handleClick} style={{minHeight: "2vh"}}>
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