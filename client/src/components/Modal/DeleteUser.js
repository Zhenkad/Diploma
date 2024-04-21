<<<<<<< HEAD
import React from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button } from 'react-bootstrap';

const DeleteUser = observer(({ data, show, onHide }) => {
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить пользователя?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Вы действительно хотите удалить пользователя {data.user_name}?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={onHide}>Отправить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
=======
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Modal, ModalBody } from 'react-bootstrap';
import { deleteUser } from '../../http/userApi';
import {Button} from "react-bootstrap"

const DeleteUser = observer((show, onHide, userId, userName) => {
    return (
        <Modal show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление пользователя
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                Вы действительно хотите удалить пользователя с именем {userName}?
            </ModalBody>
            <Modal.Footer>
                <Button variant={"success"} onClick={() => deleteUser(userId)}>Удалить</Button>
                <Button variant={"danger"} onClick={() => onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
>>>>>>> 35dc76fc667277715a152cf3ca6ec81ad7bae73f
});

export default DeleteUser