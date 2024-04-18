import React, { useContext, useState } from 'react';
import { Col, Card, CardHeader, CardBody } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import { Context } from "../index";
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE } from "../utils/consts";
import CheckToken from './Modal/CheckToken';


const LevelItem = ({ level }) => {
    const { user } = useContext(Context)
    const navigate = useHistory()
    const [tokenVisible, setTokenVisible] = useState(false)

    return (
        <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className="my-3 shadow" border={"light"}>
                <CardHeader className='p-0'>
                    <Image className='w-100 rounded-top'
                        src={level.img ? process.env.REACT_APP_API_URL + level.img : "https://i.pinimg.com/originals/91/e0/4f/91e04f1dcac67b1ce312e40b8503b126.jpg"} />

                </CardHeader>
                <CardBody>

                    <div>{level.name}</div>
                    <Button className="mt-1 w-100" disabled={level.tokenStatus} variant={level.tokenStatus === 0 ? "outline-dark" : "outline-success"}
                        onClick={user.isAuth ? () => window.open('http://localhost/' + level.url, '_blank')
                            :
                            () => navigate.push(LOGIN_ROUTE)}>
                        {level.tokenStatus === 1 ? 'Выполнено' : 'Приступить'}
                    </Button>
                    <Button className="mt-1 w-100" hidden={level.tokenStatus} variant="outline-dark" onClick={() => setTokenVisible(true)}>Ввести ключ</Button>
                    <CheckToken userId={user._user.id} levelId={level.id} show={tokenVisible} onHide={() => setTokenVisible(false)} />
                </CardBody>
            </Card>
        </Col>
    );
};

export default LevelItem;