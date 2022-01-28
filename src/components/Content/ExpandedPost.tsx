import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Comments } from "./Comments/Comments";
import { Container, Row, Col, Stack, Image, Form, Button} from "react-bootstrap";
import { useIsMounted } from "../../isMounted";
import parse from 'html-react-parser';
import { useGlobalState } from "../../GlobalStateProvider";

export const ExpandedPost = () => {
    const location: any = useLocation();
    const [ comments, setComments ] = useState<Comment[]>([]);
    const [ editMode, setEditMode ] = useState(false);
    const [ id, setId ] = useState();
    const [ title, setTitle ] = useState("");
    const [ poster, setPoster ] = useState("");
    const [ body, setBody ] = useState("");
    const [ img, setImg ] = useState("");
    const [ validated, setValidated ] = useState(false);
    const [ res, setRes ] = useState<number>(2406);
    const [ valid ] = useState(true);
    const { state } = useGlobalState();

    const isMounted = useIsMounted();

    useEffect(() => {
        setId(location.state.id);
        setTitle(location.state.title);
        setPoster(location.state.poster);
        setBody(location.state.body);
        setImg(location.state.img);
    }, [location.state])

    const toggleEdit = () => {
        setEditMode(!editMode);
    }

    useEffect(() => {
        const getComments = () => {
            axios.get("http://localhost:3001/comments", { 
                params: {id: location.state.id}
            }).then((res => {
                if (isMounted()) setComments(res.data);
            })).catch((err => {
                throw(err);
            }))
        };
        getComments();
    }, [isMounted, location.state.id]);

    const updatePost = () => {
        axios.put("http://localhost:3001/updatePost", {id,title,poster,img,body})
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
        }
        setValidated(true);
    }

    return (
    <>
       { state.admin ? 
       <Button variant={editMode ? "primary" : "danger"} onClick={toggleEdit}>{editMode ? "Edit: On" : "Edit: Off"}</Button> : "" }
        { !editMode ?
            <Container>
            <div className="sth-spacer"/>
                <Row>
                    <Col>
                        <Stack gap={3} className="text-white">
                            <h1>{title}</h1>
                            <h2>By: {poster !== "" ?
                                    poster :
                                    "unknown"}</h2>
                            <div className="border"/>
                            <div className="mx-auto">
                                <Image className="postImage" 
                                        style={{minWidth: "65vh", minHeight: "35vh", maxWidth: "80vh", maxHeight: "65vh"}} 
                                        thumbnail src={img} />
                            </div>
                            <div className="border"/>
                            <p>{parse(body)}</p>
                            <div className="border"/>
                            <h4>Comments: </h4>
                            <Comments comments={comments} id={location.state.id}/>
                        </Stack>
                    </Col>
                </Row>
            </Container>
            :
            <Container>
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
        }
    </>
    );
}