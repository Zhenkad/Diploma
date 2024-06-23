import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { deleteLevel } from "../../http/levelAPI";


const DeleteLevel = ({ data, show, onHide }) => {
    const [success, setSuccess] = useState(false)
    const [errorMassage, setErrorMassage] = useState('')

    const levelDelete = async () => {
        try {
            await deleteLevel(data.id)
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
                    Удалить задание?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body id="body">
                <div>
                    <p>Вы действительно хотите удалить задание {<b>{data.name}</b>}?</p>
                </div>
                {errorMassage !== '' && <Alert className="mt-3 p-1 text-center" variant={"danger"}>{errorMassage}</Alert>}
                {success && <Alert className="mt-3 p-1 text-center" variant={"success"}>Задание удалено</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button className="px-4" variant={"success"} onClick={levelDelete} size="lg">Да</Button>
                <Button variant={"danger"} onClick={onHide} size="lg">Нет</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteLevel;