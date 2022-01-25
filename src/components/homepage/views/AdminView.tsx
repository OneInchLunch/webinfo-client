import { Button } from 'react-bootstrap';
import { useGlobalState } from "../../../GlobalStateProvider";
import axios from "axios";
import { useState, useEffect } from "react";

export const AdminView = () => {
    const { state } = useGlobalState();
    const [ users, setUsers ] = useState<any>([]);

    const getData = async() => {
        await axios.get("http://localhost:3001/users").then((res) => {
        setUsers((res.data));
      })
    };

    useEffect(() => {
        getData();
    }, []);

    const logit = () => {
        console.log(users);
    };

    const handleAddUser = () => {
        axios.post("http://localhost:3001/insert", {
            id: null,
            active: 1,
            admin: 0,
            username: "test2",
            password: "test2"
        }).then(() => { 
            getData();
        });
    };

    return (
    <>  
        <Button onClick={logit}>
            logit
        </Button>
        <Button onClick={handleAddUser}>
            add user
        </Button>
        {users.map((user: User) => {
            console.log(user)
        })}
    </>
    );
}