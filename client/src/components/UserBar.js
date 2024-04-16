import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../http/userApi';
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";
import DataTable from 'datatables.net-bs5'

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

    let table = new DataTable('#example', {
        data: users,
        columns: [
            { data: 'id' },
            { data: 'user_name' },
            { data: 'role' },
            {
                data: 'edit',
                render: function (data, type, row, meta) {
                    return '<div class="d-inlin">\n' +
                        '<button type="button" onclick="alert(' + row.id + ')" class="btn btn-primary btn-sm bi bi-pencil-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Редактировать"></button>\n' +
                        '<button type="button" onclick="alert(' + row.id + ')" class="btn btn-danger btn-sm bi bi-trash3-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Удалить"></button>\n' +
                        '</div>'
                }
            }
        ],
        retrieve: true
    });
    table.draw()

    return (
        <table id="example" className="table display w-100">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя Пользователя</th>
                    <th>Роль</th>
                    <th>Управление</th>
                </tr>
            </thead>
        </table>
    )
});

export default UserBar;