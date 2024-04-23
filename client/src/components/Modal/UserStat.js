import React from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button } from 'react-bootstrap';

const UserStat = observer(({ data, show, onHide }) => {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Статистика пользователя {data.user_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                !!!!
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={onHide}>Отправить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UserStat