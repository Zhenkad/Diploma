import React from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LevelBar from '../components/LevelBar';

const MainPage = () => {
    return (
        <Container>
            <Row>
                <Col md={9}>
                    <LevelBar />
                </Col>
            </Row>
        </Container>
    );
};

export default MainPage;