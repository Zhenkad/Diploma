import React from 'react';
import { Col, Card } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";

const LevelItem = ({level}) => {
    return (
        <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className="my-3" border={"light"}>
                <Image fluid src={level.img ? level.img : "https://i.pinimg.com/originals/91/e0/4f/91e04f1dcac67b1ce312e40b8503b126.jpg"}/>
                <div>{level.name}</div>
                <Button className="mt-1 w-100" disabled={level.status} variant={"outline-dark"} onClick = {() => window.location.href = 'http://localhost:' + level.port}>
                    {level.status ? 'Выполнено' : 'Приступить'}
                </Button>
            </Card>
        </Col>
    );
};

export default LevelItem;