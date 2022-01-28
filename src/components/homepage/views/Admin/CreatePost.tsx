import { Container, Row, Col, Form, Stack, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../../../GlobalStateProvider';

export const CreatePost = () => {
    const [ validated, setValidated ] = useState(false);
    const [ res, setRes ] = useState<number>(2406);
    const [ valid ] = useState(true);
    const [ title, setTitle ] = useState("");
    const [ poster, setPoster ] = useState("");
    const [ body, setBody ] = useState("");
    const [ img, setImg ] = useState("");
    const navigate = useNavigate();
    const { state } = useGlobalState();

    const updatePost = () => {
        axios.put("http://localhost:3001/updatePost", {id: null, title, poster, img, body})
        .then((response) => setRes(response.status));
    }

    const handleSubmit = (event: any) => {
        updatePost();
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else if (valid) {
            updatePost();
            navigate("/home");
        }
        setValidated(true);
    }

    return (
        state.admin ? <Container>
            <div className="sth-spacer"/>
                <h3 className="text-white text-center">Try toggling edit mode off to see how your changes would look</h3>
                <div className="sth-spacer"/>
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
                            <h2 className="text-center text-white">IMPORTANT: DATA WILL NOT UPDATED ON THE SERVER UNLESS SUBMITTED!!!</h2>
                            <Button type="submit" variant="outline-light">Submit update</Button>
                        </Stack>
                        </Form>
                        <div className="rd-spacer"/>
                        {res === 2406 ? "" : 
                            res === 200 ? <h3 className="text-white text-center bg-success">Submit successful</h3> :
                            <h3 className="text-white text-center bg-danger">Submit failed with status code {res}</h3>
                        }
                    </Col>
                </Row>
                <div className="spacer"/>
            </Container> 
            :
            navigate("/home")
    );
};