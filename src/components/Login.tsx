import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {Row, Col, Button, Stack} from 'react-bootstrap';
import { useGlobalState } from '../GlobalStateProvider';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Register } from './Register';

export const Login = () => {
    const { setState } = useGlobalState();
    const navigate = useNavigate();
    const [ users, setUsers ] = useState<any>([]);
    const [ loginUser, setLoginUser ] = useState("");
    const [ loginPass, setLoginPass ] = useState("");
    const [ modalShow, setModalShow ] = useState(false);

    const guest: Partial<User> = {id: 0, active: true, admin: false, username: "", password: ""};
    const getData = async() => {
        await axios.get("http://localhost:3001/users").then((res) => {
        setUsers((res.data));
      })
    }

    const pushToGlobalState = (data: Partial<User>) => {
      setState((prev) => ({ ...prev, ...data}))
    }

    const authLogin = () => {
        users.forEach((user: Partial<User>) => {
            if (user.username === loginUser)
                if (user.password === loginPass) {
                    if(user.active)
                        pushToGlobalState(user);
                        navigate('/home');
                }
        })
    }

    const guestLogin = () => {
        pushToGlobalState(guest);
        navigate('/home');
    }
    
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
        <div className="spacer" />
        <Container>
            <Row>
                <Col md={{span: 4, offset: 4}}>
                    <Stack gap={3}>
                        <Form.Control 
                            type="text"
                            value={loginUser}
                            onChange={e => setLoginUser(e.target.value)}
                            placeholder='Username'
                        />
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            value={loginPass}
                            onChange={e => setLoginPass(e.target.value)}
                            placeholder='Password'
                        />
                        <div className="d-grid gap-2">
                            <Button variant="dark" size="lg" onClick={authLogin}>
                                Login
                            </Button>
                        </div>
                        <div className="d-grid gap-2">
                            <Button variant="outline-dark" size="lg" onClick={() => setModalShow(true)}>
                                Register
                            </Button>
                            <Register 
                                users={users}
                                show={modalShow}
                                onHide={() => {setModalShow(false);
                                        getData();}}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <Button variant="link" size="sm" style={{color: "gray"}} onClick={guestLogin}>
                                Login as guest
                            </Button>
                        </div>
                    </Stack>
                </Col>
            </Row>
        </Container>
    
        </>
    );
}