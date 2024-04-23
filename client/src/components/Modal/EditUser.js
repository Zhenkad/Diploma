import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Modal, Button, Container, Row, Col } from 'react-bootstrap';

const EditUser = observer(({ data, show, onHide }) => {

    const [selectedRole, setSelectedRole] = useState(data.role);
    const handleSelectChange = (e) => {
        setSelectedRole(e.target.value);
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать данные пользователя {data.user_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={12} sm={6}>
                            Имя пользователя
                            <Form.Control type="text" placeholder={data.user_name} readOnly />
                        </Col>
                        <Col xs={12} sm={6}>
                            Номер телефона
                            <Form.Control type="text" placeholder={data.phone_number} readOnly />
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col xs={12} sm={6}>
                            Дата регистрации
                            <Form.Control type="text" placeholder={data.createdAt} readOnly />
                        </Col>
                        <Col xs={12} sm={6}>
                            Выбирите роль пользователя
                            <Form.Select value={selectedRole} onChange={handleSelectChange}>
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={onHide}>Отправить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditUser