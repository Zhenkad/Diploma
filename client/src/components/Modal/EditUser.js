import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Modal, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { changeRole } from '../../http/userApi';

const EditUser = observer(({ data, show, onHide }) => {

    const [selectedRole, setSelectedRole] = useState(data.role);
    const [success, setSuccess] = useState(false)
    const [errorMassage, setErrorMassage] = useState('')
    const handleSelectChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const changeUserRole = async () => {
        await changeRole(data.id, selectedRole)
            .then(() => setErrorMassage(''))
            .then(() => setSuccess(true))
            .then(() => setTimeout(() => window.location.reload(), 2000))
            .catch((e) => setErrorMassage(e.response.data.message))
    }

    //Преобразование строки в Дату
    const [dateStr, timeStr] = data.createdAt.split(' ');
    //console.log(dateStr); // 06-15-2022
    //console.log(timeStr); // 09:13:50
    
    const [year, month, day] = dateStr.split('-');
    const [hours, minutes, seconds] = timeStr.split(':');
    
    //console.log(month); // 06
    //console.log(day); // 15
    //console.log(year); // 2022
    
    /*const date = new Date(
      +year,
      +month - 1,
      +day,
      +hours,
      +minutes,
      +seconds
    );
    */

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
                            <Form.Control type="text" placeholder={`${day}.${month}.${year} ${hours}:${minutes}:${seconds}`} readOnly />
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
                {success && <Alert className="mt-3 p-2 text-center" variant="success">Данные пользователя {data.user_name} изменены на {selectedRole}</Alert>}
                {errorMassage !== '' && <Alert className="mt-3 p-2 text-center" variant="danger">{errorMassage}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={changeUserRole}>Отправить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditUser