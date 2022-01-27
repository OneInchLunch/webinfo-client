import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";

export const ModifyUser = (props: any) => {
    const [ validated, setValidated ] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ errMsg, setErrMsg ] = useState("");
    const [ id, setId ] = useState<any>();
    const [ admin, setAdmin ] = useState<number>();
    const [ active, setActive ] = useState<number>();
    const [ username, setUsername ] = useState<string>();
    const [ password, setPassword ] = useState<string>();
    const [ res, setRes ] = useState(2406);

    useEffect(() => {
    setRes(2406);
    setValidated(false);
    if(!props.new) {
        setId(props.user.id);
        setAdmin(props.user.admin);
        setActive(props.user.active);
        setUsername(props.user.username);
        setPassword(props.user.password);
    } else {
        setId(null);
        setAdmin(0);
        setActive(1);
        setUsername("");
        setPassword("");
    }
    }, [props])

    const newUser = () => {
        axios.post("http://192.168.1.10:3001/insert", {id, admin, active, username, password})
        .then((response) => {setRes(response.status);})
        .catch((error) => console.log(error));
    };

    const modifyUser = () => {
        axios.put("http://192.168.1.10:3001/updateUser", {id,admin,active,username,password})
        .then((response) => {setRes(response.status);})
        .catch((error) => console.log(error));
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        props.new ?
            newUser() :
            modifyUser();
        
        setValidated(true);
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
            { res === 2406 ? "User editor" : 
                    res === 200 ?  
                        <div className="text-success">{props.new ? "User added successfully" : "Update successful"}</div>
                    :
                        <div className="text-danger">{props.new ? `Update user failed with code: ${res}` : `Add user failed with code: ${res}`}</div>
                    }
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={3}>
                    <Form.Label>Id</Form.Label>
                    <Form.Control 
                        disabled
                        type="text"
                        value={!props.new ? props.user.id : ""}
                        placeholder='Automatic'
                    />
                    <Form.Label>Admin</Form.Label>
                    <Form.Control 
                        required
                        isValid={valid}
                        type="number"
                        value={admin}
                        onChange={e => setAdmin(+ e.target.value)}
                        placeholder='Admin'
                    />
                    <Form.Control.Feedback type="invalid">{errMsg}</Form.Control.Feedback>
                    <Form.Label>Active</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        value={active}
                        onChange={e => setActive(+ e.target.value)}
                        placeholder='Active'
                    />
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        required
                        isValid={valid}
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder='Username'
                    />
                    <Form.Control.Feedback type="invalid">{errMsg}</Form.Control.Feedback>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                    <Form.Control.Feedback type="invalid">Please enter a new password</Form.Control.Feedback>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                {props.new ? 
                    <Button variant="dark" size="lg" type="submit">Add user</Button> 
                    :
                    <Button variant="dark" size="lg" type="submit">Update</Button>
                }
                <Button variant="outline-dark" size="lg" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Form>
      </Modal>
    );
};