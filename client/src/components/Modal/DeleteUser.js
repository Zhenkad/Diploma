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
})

export default DeleteUser