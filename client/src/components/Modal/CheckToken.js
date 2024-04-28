import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FormControl, Modal, Button } from 'react-bootstrap';
import { passLevel } from '../../http/levelAPI';
import { useForm } from 'react-hook-form'

const CheckToken = observer(({ show, onHide, levelId, userId }) => {
    const [token, setToken] = useState('');

    /**
    * Валидация с помощью React-hook-form
    */
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()

    /**
     * Отправка токена на проверку
     */
    const checkToken = async () => {
        try {
            await passLevel(userId, levelId, token)
            alert("Задание выполнено")
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
                    Ввести ключ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl {...register("token", {
                    required: "Поле обязательно к заполнению",
                    minLength: {
                        value: 24,
                        message: "Длина ключа должна быть 24 символа"
                    },
                    maxLength: {
                        value: 24,
                        message: "Длина ключа должна быть 24 символа"
                    },
                }
                )} value={token} onChange={e => setToken(e.target.value)} className="mt-3 mb-3" placeholder={"Введите ключ (строка из 24 символа)"}
                />

                {errors?.token && 
                <div class="alert alert-danger" role="alert">
                    {errors?.token?.message}
                </div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={handleSubmit(checkToken)}>Отправить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CheckToken