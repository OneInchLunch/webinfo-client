import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";

export const ModifyUser = (props: any) => {
    const [ validated, setValidated ] = useState(false);
    const [ justAdded, setJustAdded] = useState([]);
    const [ valid, setValid ] = useState(false);
    const [ taken, setTaken ] = useState(false);
    const [ errMsg, setErrMsg ] = useState("");
    const [ id, setId ] = useState<any>();
    const [ admin, setAdmin ] = useState<number>();
    const [ active, setActive ] = useState<number>();
    const [ username, setUsername ] = useState<string>();
    const [ password, setPassword ] = useState<string>();
    const [ res, setRes ] = useState(2406);

    useEffect(() => {
        setValidated(false);
        setRes(2406);
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
    }, [props.new, props.user, props.modalShow])

    const isValid = (value: any) => {
        setUsername(value);
        if(value !== "") {
            props.users.forEach((oldUser: Partial<User>) => {
                if (oldUser.username === value) {
                    setTaken(true);
                    setErrMsg("Username is already taken!")
                    if(!props.new)
                        setTaken(false);
                }
            });
            justAdded.forEach((jA) => {
                if (props.new && jA === value) {
                    setTaken(true);
                    setErrMsg("Username is already taken!");
                }
            });
            if(!taken && password !== ""){
                setValid(true);
                setJustAdded(newArr => newArr.concat(value))
                console.log(justAdded)}    
            else
                setValid(false);
        }else if (value === "") {
            setValid(false);
            setErrMsg("Please enter a new username");
        }
    }

    
    const newUser = () => {
        axios.post("http://localhost:3001/insert", {id, admin, active, username, password})
        .then((response) => {setRes(response.status);})
        .catch((error) => console.log(error));
    };
    
    const modifyUser = () => {
        axios.put("http://localhost:3001/updateUser", {id,admin,active,username,password})
        .then((response) => {setRes(response.status);})
        .catch((error) => console.log(error));
    }
    
    const handleSubmit = (event: any) => {
        setValidated(false);
        event.preventDefault();
        const form = event.currentTarget;
        setPassword(form[5].value);
        isValid(form[4].value);
        console.log("Valid: " + valid + "\nTaken: " + taken);
        if (form.checkValidity() === false) {
            console.log("just to suffer")
            event.stopPropagation();
        }
        if(taken) {
            setUsername('');
            setTaken(false);
        }
        else if(!taken && valid) {
            props.new ?
                newUser() :
                modifyUser();
        }

        setValidated(true);
        }
        
    const handleUserChange = (value: any) => {
        isValid(value);
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
                    <Form.Switch
                        checked={admin ? true : false}
                        onChange={e => setAdmin(+ e.target.checked)}
                    />
                     <Form.Label>Active</Form.Label>    
                    <Form.Switch
                        checked={active ? true : false}
                        onChange={e => setActive(+ e.target.checked)}
                    />
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        required
                        isValid={valid}
                        type="text"
                        value={username}
                        onChange={e => handleUserChange(e.target.value)}
                        placeholder='Username'
                    />
                    <Form.Control.Feedback type="invalid">{errMsg}</Form.Control.Feedback>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        isValid={valid}
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                    <Form.Control.Feedback type="invalid">Please enter a new password</Form.Control.Feedback>
                </Stack>
            </Modal.Body>
            <Modal.Footer style={{justifyContent: "space-between"}}>
            Sometimes it doesn't submit the first time,<br /> keep submitting until it says you succeeded.
                <div>{props.new ? 
                    <Button variant="dark" size="lg" type="submit">Add user</Button> 
                    :
                    <Button variant="dark" size="lg" type="submit">Update</Button>
                }
                <Button style={{marginLeft: "0.75rem"}} variant="outline-dark" size="lg" onClick={props.onHide}>Close</Button></div>
            </Modal.Footer>
        </Form>
      </Modal>
    );
};