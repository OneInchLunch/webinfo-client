import { useState } from "react";
import { Container, Row, ToggleButtonGroup, Col, ToggleButton } from "react-bootstrap";
import { NewPost } from "./NewPost";
import { UserList } from "./UserList";

export const AdminDashboard = (posts: any) => {
    const [ radioValue, setRadioValue ] = useState('1');

    const radios = [
        { name: 'Users', value: '1' },
        { name: 'New Post', value: '2' },
      ];

    return (
    <Container>  
        <Row>
            <Col md={{offset: 4, span: 4}}>
                <ToggleButtonGroup type="radio" name="options" defaultValue={radios[0].value} style={{width: "100%"}}>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="outline-light"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
                </ToggleButtonGroup>
            </Col>
        </Row>
        <Row>
            <Col>
                {radioValue === '1' ? 
                    <UserList />
                :
                    <NewPost />}
            </Col>
        </Row>
    </Container>
    );
}