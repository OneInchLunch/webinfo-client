import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Comments } from "./Comments/Comments";
import { Container, Row, Col, Stack, Image} from "react-bootstrap";
import { useIsMounted } from "../../isMounted";


export const ExpandedPost = () => {
    const location: any = useLocation();
    const [ comments, setComments ] = useState<Comment[]>([]);
    const isMounted = useIsMounted();

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
        <Container>
        <div className="sth-spacer"/>
            <Row>
                <Col>
                    <Stack gap={3} className="text-white">
                        <h1>{location.state.title}</h1>
                        <h2>By: {location.state.poster !== "" ?
                                location.state.poster :
                                "unknown"}</h2>
                        <div className="border"/>
                        <div className="mx-auto">
                            <Image className="postImage" style={{width: "65vh", maxHeight: "65vh"}} thumbnail src={location.state.img} />
                        </div>
                        <div className="border"/>
                        <p>{location.state.body}</p>
                        <div className="border"/>
                        <h4>Comments: </h4>
                        <Comments comments={comments} id={location.state.id}/>
                    </Stack>
                </Col>
            </Row>
        </Container>
    </>
    );
}