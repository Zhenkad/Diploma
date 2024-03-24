import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite"

const CreateLevel = observer(({show, onHide}) => {
    const [name, setName] = useState('')
    const [port, setPort] = useState('')
    const selectFile = e => {
        console.log(e.target.files[0])
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
                    Добавить испытание
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} className="mt-3 mb-3" placeholder={"Введите название испытания"}/>
                    <Form.Control value={port} onChange={e => setPort(e.target.value)} className="mt-3 mb-3" placeholder={"Введите порт испытания"}/>
                    <Form.Control className="mt-3 mb-3" type="file"/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={onHide}>Добавить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateLevel;