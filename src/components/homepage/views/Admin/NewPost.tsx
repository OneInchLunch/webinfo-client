import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Stack, Button } from "react-bootstrap";
import { useGlobalState } from "../../../../GlobalStateProvider";

export function NewPost() {
    const [ title, setTitle ] = useState("");
    const [ poster, setPoster ] = useState<any>();
    const [ body, setBody ] = useState("");
    const [ img, setImg ] = useState("");
    const [ validated, setValidated ] = useState(false);
    const [ res, setRes ] = useState<number>(2406);
    const { state } = useGlobalState();
    
    useEffect(() => {
        setRes(2406);
        setPoster(state.username);   
    }, [state])

    const newPost = () => {
        axios.post("http://localhost:3001/postPost", {title,poster,img,body})
        .then((response) => {setRes(response.status); console.log(response)})
        .catch((error) => console.log(error));
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            newPost();
        }
        setValidated(true);
    }

    return (
        <Container>
            <div className="rd-spacer"/>
            <Row>
                <Col>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Stack gap={3} className="text-white">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            required
                            placeholder="title"
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        <Form.Label>Author</Form.Label>
                        <Form.Control 
                            disabled
                            required
                            placeholder="author"
                            type="text"
                            id="poster"
                            value={poster}
                            onChange={(e) => setPoster(e.target.value)}
                            />
                        <div className="border"/>
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            placeholder="image"
                            type="text"
                            id="img"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            />                            
                        <div className="border"/>
                        <Form.Label>Article</Form.Label>
                        <Form.Control
                            required
                            placeholder="body"
                            as="textarea"
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            />
                        <Button type="submit" variant="outline-light">Add post</Button>
                    </Stack>
                    </Form>
                    <div className="rd-spacer"/>
                    {res === 2406 ? "" : 
                        res === 200 ? <h3 className="text-white text-center bg-success">Post added successfuly</h3> :
                        <h3 className="text-white text-center bg-danger">Post add failed with status code {res}</h3>
                    }
                </Col>
            </Row>
            <div className="spacer"/>
        </Container>
    );
};