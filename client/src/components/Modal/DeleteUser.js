import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button, Alert } from 'react-bootstrap';
import { deleteUser } from '../../http/userApi';

const DeleteUser = observer(({ data, show, onHide }) => {
    const [success, setSuccess] = useState(false)
    const [errorMassage, setErrorMassage] = useState('')

    const userDelete = async () => {
        try {
            await deleteUser(data.id)
                .then(() => setErrorMassage(''))
                .then(() => setSuccess(true))
                .then(() => setTimeout(() => window.location.reload(), 2000))
        }
        catch (e) {
            setErrorMassage(e.response.data.message)
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
                {errorMassage !== '' && <Alert className="mt-3 p-2 text-center" variant={"danger"}>{errorMassage}</Alert>}
                {success && <Alert className="mt-3 p-2 text-center" variant={"success"}>Пользователь удален</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={userDelete}>Да</Button>
                <Button variant={"danger"} onClick={onHide}>Нет</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default DeleteUser