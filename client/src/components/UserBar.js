import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../http/userApi';
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";
import 'datatables.net-bs5'
import $, { data } from 'jquery'

const UserBar = observer(() => {

    var [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            fetchUsers().then((data) => setUsers(data.data)).finally(() => setLoading(false))
        }, 1000)
    }, []);

    if (loading) {
        return (
            <div className='position-absolute top-50 start-50 translate-middle'>
                <Spinner animation={"grow"} role='status' />
            </div>
        )
    }

    console.log(users)

    $('#example').DataTable({
        data: users,
        columns: [
            { data: 'id' },
            { data: 'user_name' },
            { data: 'role' },
            {
                data: 'edit',
                defaultContent: '<Button>'
            }
        ],
        retrieve: true
    });

    return (
        <table id="example" className="table display w-100">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя Пользователя</th>
                    <th>Роль</th>
                    <th>Редактировать</th>
                </tr>
            </thead>
        </table>
    )
});

export default UserBar;