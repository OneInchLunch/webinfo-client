import { useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { isAsteriskToken } from "typescript";

export const Register = (props: any) => {
    const [ regUser, setRegUser ] = useState("");
    const [ regPass, setRegPass ] = useState("");
    const [ validated, setValidated ] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ errMsg, setErrMsg ] = useState("");
    const [ taken, setTaken ] = useState(false);

    const isNotValid = (value: any) => {
        setRegUser(value);
        if (regUser !== "") {
            props.users.forEach((user: Partial<User>) => {
                if (user.username === value) {
                    setValid(false);
                    setTaken(true);
                    setErrMsg("Username is already taken");
                    console.log(taken);
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

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        isNotValid(form[1].value);
        if (form.checkValidity() === false) {
            setValidated(true);
            event.stopPropagation();
        }
        console.log("Taken: " + taken)
        console.log("Valid: " + valid)
        if(taken) {
            setRegUser('');
            setTaken(false);
        }
    };

    const handleChange = (value: any) => {
        console.log(value);
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