import { useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useGlobalState } from "../GlobalStateProvider";

export const Register = (props: any) => {
    const { setState } = useGlobalState();
    const navigate = useNavigate();
    const [ regUser, setRegUser ] = useState("");
    const [ regPass, setRegPass ] = useState("");
    const [ validated, setValidated ] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ errMsg, setErrMsg ] = useState("");
    const [ taken, setTaken ] = useState(false);    

    const pushToGlobalState = (data: Partial<User>) => {
        setState((prev) => ({ ...prev, ...data}))
      }

    const isNotValid = (value: any) => {
        setRegUser(value);
        if (regUser !== "") {
            props.users.forEach((user: Partial<User>) => {
                if (user.username === value) {
                    setValid(false);
                    setTaken(true);
                    setErrMsg("Username is already taken");
                }
            });
            if (!taken) {
                setValid(true);
            }
        } else if (regUser === "") {
            setValid(false);
            setErrMsg("Please enter a new username")
        }
    };

    const addUser = () => {
        axios.post("http://localhost:3001/insert", {
            id: null,
            active: 1,
            admin: 0,
            username: regUser,
            password: regPass
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        isNotValid(form[1].value);
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        if(taken) {
            setRegUser('');
            setTaken(false);
        }
        else if(!taken && valid){
            addUser();
            pushToGlobalState({
                id: props.users.length,
                active: true,
                admin: false,
                username: regUser,
                password: regPass
            });
            navigate('/home');
        }
        setValidated(true);
    };

    const handleChange = (value: any) => {
        isNotValid(value); 
    }

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Welcome, register here!
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={3}>
                    <Form.Label>Enter new username</Form.Label>
                    <Form.Control 
                        required
                        isValid={valid}
                        type="text"
                        value={regUser}
                        onChange={e => handleChange(e.target.value)}
                        placeholder='Username'
                    />
                    <Form.Control.Feedback type="invalid">{errMsg}</Form.Control.Feedback>
                    <Form.Label>Enter new password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        value={regPass}
                        onChange={e => setRegPass(e.target.value)}
                        placeholder='Password'
                    />
                    <Form.Control.Feedback type="invalid">Please enter a new password</Form.Control.Feedback>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" size="lg" type="submit">Register</Button>
                <Button variant="outline-dark" size="lg" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Form>
      </Modal>
    );
}