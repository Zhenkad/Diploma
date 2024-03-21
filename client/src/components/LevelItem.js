import React, {useContext} from 'react';
import {Col, Card} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import {Context} from "../index";
import {useHistory} from 'react-router-dom'
import {LOGIN_ROUTE} from "../utils/consts";


const LevelItem = ({level}) => {
    const {user} = useContext(Context)
    const navigate = useHistory()

    return (
        <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className="my-3" border={"light"}>
                <Image fluid
                       src={level.img ? level.img : "https://i.pinimg.com/originals/91/e0/4f/91e04f1dcac67b1ce312e40b8503b126.jpg"}/>
                <div>{level.name}</div>
                <Button className="mt-1 w-100" disabled={false} variant={"outline-dark"}
                        onClick={user.isAuth ? () => window.open('http://localhost:' + level.port, '_blank')
                            :
                            () => navigate.push(LOGIN_ROUTE)}>
                    {level.status ? 'Выполнено' : 'Приступить'}
                </Button>
            </Card>
        </Col>
    );
};

export default LevelItem;