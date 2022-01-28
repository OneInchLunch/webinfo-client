import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { ModifyUser } from './ModifyUser';

export const UserList = () => {
    const [ users, setUsers ] = useState<User[]>();
    const [ modalShow, setModalShow ] = useState(false);
    const [ modalUser, setModalUser ] = useState
        ({
            id: null,
            admin: 0,
            active: 0,
            username: "",
            password: ""
        })
    const [ newUser, setNewUser ] = useState<boolean>();

    

    useEffect(() => {
        const getData = () => {
            axios.get("http://localhost:3001/users").then((res) => {
                setUsers((res.data));
            })
            .catch((error) => {
                console.log(error)
            })
        };
        getData();
    }, [modalShow])

    const handleClick = (user: any, type: boolean) => {
        setModalUser(user);
        type ? setNewUser(true) : setNewUser(false)
        setModalShow(true);
    } 

    return (
        <>
        <div className="rd-spacer"/>
        <Table variant="dark" striped bordered hover>
            <thead>
                <tr>
                <th>id</th>
                <th>admin</th>
                <th>active</th>
                <th>username</th>
                <th>password</th>
                </tr>
            </thead>
            <tbody>
                <tr onClick={() => handleClick(modalUser, true)}>
                    <td className='text-center fst-italic text-muted' colSpan={5}>New User</td>
                </tr>
                {users?.map(user => 
                <tr onClick={() => handleClick(user, false)} key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.admin}</td>
                        <td>{user.active}</td>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                    </tr>
                    )}
            </tbody>
        </Table>
        {users ? <ModifyUser 
            user={modalUser}
            users={users}
            show={modalShow}
            onHide={() => {setModalShow(false);}}
            new={newUser ? 1 : 0} /> : ""}
        </>

    );
}