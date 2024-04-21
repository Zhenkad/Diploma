import React from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button } from 'react-bootstrap';
import { deleteUser } from '../../http/userApi';

const DeleteUser = observer(({ data, show, onHide }) => {

    const userDelete = async () => {
        if(!window.confirm('Вы действительно хотите удалить пользователя?\n Это действие нельзя отменить!')) return;
        try {
            await deleteUser(data.id)
            alert("Пользователь удален")
            window.location.reload()
        }
        catch (e) {
            alert(e.response.data.message)
        }
    }

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
                <div>
                    <p>Вы действительно хотите удалить пользователя {<b>{data.user_name}</b>}?</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={userDelete}>Да</Button>
                <Button variant={"danger"} onClick={onHide}>Нет</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default DeleteUser