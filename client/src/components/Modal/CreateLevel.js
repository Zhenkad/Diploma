import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { observer } from "mobx-react-lite"
import { createLevel } from '../../http/levelAPI';
import { useForm } from 'react-hook-form'

const CreateLevel = observer(({ show, onHide }) => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [file, setFile] = useState(null)
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()

    const addLevel = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('url', url)
        formData.append('img', file)
        await createLevel(formData).then(data => onHide()).finally(window.location.reload())
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

                    <Form.Control {...register("levelName", {
                        required: "Поле обязательно к заполнению",
                    }
                    )} value={name} onChange={e => setName(e.target.value)} className="mt-3 mb-3" placeholder={"Введите название испытания"} />
                    <div>{errors?.levelName && <p style={{color: "red"}}>{errors?.levelName?.message}</p>}</div>

                    <Form.Control {...register("levelUrl", {
                        required: "Поле обязательно к заполнению",
                    }
                    )} value={url} onChange={e => setUrl(e.target.value)} className="mt-3 mb-3" placeholder={"Введите url испытания"} />
                    <div>{errors?.levelUrl && <p style={{color: "red"}}>{errors?.levelUrl?.message}</p>}</div>

                    <Form.Control {...register("levelImg", {
                        required: "Поле обязательно к заполнению",
                    }
                    )} className="mt-3 mb-3" type="file" onChange={selectFile} />
                    <div>{errors?.levelImg && <p style={{color: "red"}}>{errors?.levelImg?.message}</p>}</div>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={handleSubmit(addLevel)}>Добавить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateLevel;