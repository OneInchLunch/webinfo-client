import axios from "axios";
import { useState, useEffect } from "react"
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useGlobalState } from "../../../GlobalStateProvider";

export const UserAdminComments = (props: any) => {
    const [ userComment, setUserComment ] = useState<string>();
    const [ validated, setValidated ] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ errMsg, setErrMsg ] = useState("");
    const [ comments, setComments ] = useState<Comment[]>();
    const { state } = useGlobalState();

    useEffect(() => {
        setComments(props.comments)
    }, [props.comments]);

    useEffect(() => {
        setValidated(false);
    }, [comments])

    const getComments = () => {
        axios.get("http://localhost:3001/comments", {params: {id: props.id}})
        .then(result => setComments(result.data))
        .catch(error => console.log(error))
    };

    const isValid = (value: any) => {
        setUserComment(value);
        if (value.length > 0 && value.length < 2000)
            setValid(true);
        else if (value === "") {
            setValid(false);
            setErrMsg("Please enter something!");
        } else if (value.length > 2000){
            setValid(false);
            setErrMsg("Too many characters!");
        }
    }

    const postComment = () => {
        axios.post(`http://localhost:3001/postComment`, {
            id: null,
            sectionid: props.id,
            body: userComment,
            commenter: state.username
        }).then(() => {
            getComments();
        });
    };

    const deleteComment = (id: number) => {
        axios.delete('http://localhost:3001/deleteComment', {data: {id: id}})
        .then(() => {
            getComments();
        })
    }
    
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else if (valid) {
            postComment();
            setUserComment("");
        }
        console.log(errMsg);
        setValidated(true);
        setValid(false);
    }

    const handleChange = (value: any) => {
        isValid(value);
    }

    const handleDelete = (id: number) => {
        deleteComment(id);
    }

    return (
        <div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="comment">
            <Form.Control 
                style={{borderRadius: "0", borderColor: "black", height: "10vh"}}
                as="textarea"   
                isValid={valid}
                value={userComment}
                onChange={e => handleChange(e.target.value)}
                placeholder="Enter your comment here!" />
            </Form.Group>
            <Row>
                <Col>
                    <Button variant="outline-light" size="lg" type="submit" style={{borderRadius: "0", margin: "2vh"}}>Post</Button>
                </Col>
                <Col md={6}>
                    <h3 className="text-danger">{validated && !valid ? errMsg : ""}</h3>
                </Col>
                <Col>
                    <h3 style={{paddingTop: "3.5vh", textAlign: "right"}}>{userComment ? userComment.length : "0"}/2000</h3>
                </Col>
            </Row>
        </Form>
        <div className="tnth-spacer" />
        {comments && comments.slice(0).reverse().map((comment: any) => {
            return <Table key={comment.id}>
                <thead style={{backgroundColor: "grey"}}>
                    <tr>
                        <th>
                            <p>{comment.commenter} says:</p>
                        </th>
                        { state.admin ? <th>
                            <Button 
                                size="sm"
                                style={{float: "right",
                                        backgroundColor: "#945FF0",
                                        borderRadius: "0"}}
                                onClick={() => handleDelete(comment.id)}>
                                Delete 🗑️
                            </Button>
                        </th> : null}
                    </tr>
                </thead>
                <tbody style={{backgroundColor: "darkgrey"}}>
                    <tr>
                        <th style={{width: "100%"}}>
                            <p style={{fontWeight: "normal"}}>{comment.body}</p>
                        </th>
                    </tr>
                </tbody>
            </Table>
        })}
        <div className="spacer"/>
    </div>
    );
}