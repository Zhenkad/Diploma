import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Form , Modal, Button } from 'react-bootstrap';

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
                    Редактировать данные пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Выбирите роль пользователя</p>
                <Form.Select value={selectedRole} onChange={handleSelectChange}>
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={onHide}>Отправить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditUser