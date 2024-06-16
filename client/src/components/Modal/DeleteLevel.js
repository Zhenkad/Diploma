import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteLevel } from "../../http/levelAPI";


const DeleteLevel = ({ data, show, onHide }) => {

    const levelDelete = async () => {
        if (!window.confirm('Вы действительно хотите удалить задание?\nЭто действие нельзя отменить!')) return;
        try {
            await deleteLevel(data.id)
                .then(() => setTimeout(() => document.getElementById("body").innerHTML += `<div class="alert alert-success" role="alert">Задание удалено</div>`), 2000)
                .then(() => window.location.reload())
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
                    Удалить задание?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body id="body">
                <div>
                    <p>Вы действительно хотите удалить задание {<b>{data.name}</b>}?</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="px-4" variant={"success"} onClick={levelDelete} size="lg">Да</Button>
                <Button variant={"danger"} onClick={onHide} size="lg">Нет</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteLevel;