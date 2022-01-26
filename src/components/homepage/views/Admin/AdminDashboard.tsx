import axios from "axios";
import { useState, useEffect } from "react";
import { Content } from '../../../Content/Content';

export const AdminDashboard = (posts: any) => {
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
        }).catch(error => {
            console.log(error);
        });
    };

    return (
    <>  
        <Content {...posts} />
    </>
    );
}