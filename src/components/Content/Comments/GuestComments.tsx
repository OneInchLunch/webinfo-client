import axios from "axios";
import { useState, useEffect } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Register } from "../../Register";
import { useIsMounted } from "../../../isMounted";

export const GuestComments = (props: any) => {
    const [ commentCount, setCommentCount ] = useState<number>();
    const [ users, setUsers ] = useState<any>([]);
    const [ modalShow, setModalShow ] = useState(false);
    const isMounted = useIsMounted();

    useEffect(() => {
        const getData = () => {
            axios.get("http://localhost:3001/users").then((res) => {
            if (isMounted()) setUsers((res.data));
          })
        }
        getData();
    }, [])

    useEffect(() => {
        console.log(props.comments);
        if(props.comments.length < 3)
            setCommentCount(props.comments.length);
        else
            setCommentCount(3);
    }, [props.comments])
    
    return (
        <div>
        {props && props.comments.slice(0,commentCount).map((comment: any) => {
            return <Table key={comment.id}>
                <thead style={{backgroundColor: "grey"}}>
                    <tr>
                        <th>
                            {comment.commenter} says:
                        </th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor: "darkgrey"}}>
                    <tr>
                        <th>
                            <p style={{fontWeight: "normal"}}>{comment.body}</p>
                        </th>
                    </tr>
                </tbody>
            </Table>
        })}
        <Register 
            users={users}
            show={modalShow}
            onHide={() => {setModalShow(false);}}
            />
            <div className="sth-spacer"/>
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th className="text-center text-white">
                        ↓ TO POST AND SEE MORE COMMENTS REGISTER BELOW ↓
                            </th>
                        </tr>
                    </thead>
                </Table>
                <div className="sth-spacer"/>
                <Row>
                    <Col md={{span: 4, offset: 4}}>
                        <Button 
                                style={{width: "100%"}}
                                variant="outline-light" 
                                size="lg"
                                onClick={() => setModalShow(true)}>
                            Register
                        </Button>
                    </Col>
                </Row>
            </Container>
            <div className="trd-spacer"/>
    </div>
    );
}