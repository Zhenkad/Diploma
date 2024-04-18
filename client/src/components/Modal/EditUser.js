import { observer } from 'mobx-react-lite'
import React from 'react'
import { Modal, ModalBody } from 'react-bootstrap'
import {Button} from "react-bootstrap"
import { deleteUser } from '../../http/userApi';

const EditUser = observer((show, onHide, userName, userId) => {
    return (
        <Modal show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактирование пользователя
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                Вы действительно хотите удалить пользователя с именем {userName}?
            </ModalBody>
            <Modal.Footer>
                <Button variant={"success"} onClick={() => {deleteUser(userId); window.location.reload()}}>Удалить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default EditUser