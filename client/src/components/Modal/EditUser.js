import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FormControl, Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'

const EditUser = observer(({ data, show, onHide }) => {
    
    /**
    * Валидация с помощью React-hook-form
    */
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm()

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать данные пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Data: {data.role}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={onHide}>Отправить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditUser