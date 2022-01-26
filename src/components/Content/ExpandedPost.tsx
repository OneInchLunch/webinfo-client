import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Comments } from "./Comments/Comments";
import { Container, Row, Col, Stack, Image, Form, Button} from "react-bootstrap";
import { useIsMounted } from "../../isMounted";


export const ExpandedPost = () => {
    const location: any = useLocation();
    const [ comments, setComments ] = useState<Comment[]>([]);
    const [ editMode, setEditMode ] = useState(false);
    const [ post, setPost ] = useState<any>();
    const [ title, setTitle ] = useState("");
    const [ poster, setPoster ] = useState("");
    const [ body, setBody ] = useState("");
    const [ img, setImg ] = useState("");
    const isMounted = useIsMounted();

    useEffect(() => {
        setPost(location.state);
    }, [location.state])

    const toggleEdit = () => {
        setEditMode(!editMode);
    }

    useEffect(() => {
        if (editMode) {
            setTitle(location.state.title);
            setPoster(location.state.poster);
            setBody(location.state.body);
            setImg(location.state.img);
        } else
            setPost({id: null,
                    title: title,
                    poster: poster,
                    body: body,
                    img: img})
    }, [editMode]);

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
    }, [location.state.id, isMounted]);

    return (
    <>
        <Button onClick={toggleEdit}>{editMode ? "Edit: On" : "Edit: Off"}</Button>  
        { !editMode ?
            <Container>
            <div className="sth-spacer"/>
                <Row>
                    <Col>
                        <Stack gap={3} className="text-white">
                            <h1>{post.title}</h1>
                            <h2>By: {post.poster !== "" ?
                                    post.poster :
                                    "unknown"}</h2>
                            <div className="border"/>
                            <div className="mx-auto">
                                <Image className="postImage" 
                                        style={{minWidth: "65vh", minHeight: "35vh", maxWidth: "80vh", maxHeight: "65vh"}} 
                                        thumbnail src={post.img} />
                            </div>
                            <div className="border"/>
                            <p>{post.body}</p>
                            <div className="border"/>
                            <h4>Comments: </h4>
                            <Comments comments={comments} id={post.id}/>
                        </Stack>
                    </Col>
                </Row>
            </Container>
            :
            <Container>
            <div className="sth-spacer"/>
                <Row>
                    <Col>
                        <Form>
                        <Stack gap={3} className="text-white">
                            <Form.Control 
                                placeholder="title"
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                            <Form.Control 
                                placeholder="author"
                                type="text"
                                id="poster"
                                value={poster}
                                onChange={(e) => setPoster(e.target.value)}
                                />
                            <div className="border"/>
                            <div className="mx-auto">
                                <Form.Control 
                                    placeholder="image"
                                    type="text"
                                    id="img"
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                    />                            
                            </div>
                            <div className="border"/>
                            <Form.Control 
                                    placeholder="body"
                                    type="text"
                                    id="body"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    /> 
                            <div className="border"/>
                            <h4>Comments: </h4>
                            <Comments comments={comments} id={location.state.id}/>
                        </Stack>
                        </Form>
                    </Col>
                </Row>
            </Container>
        }
    </>
    );
}