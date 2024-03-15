import React from 'react';
import { Col, Card } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

const LevelItem = ({level}) => {
    return (
        <Col md={3}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={level.img} />
                <div>
                    <div>{level.name}</div>
                </div>

            </Card>
        </Col>
    );
};

export default LevelItem;