import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../http/userApi';
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component"

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

    const columns = [
        { name: 'ID', selector: 'id', sortable: true },
        { name: 'Имя пользователя', selector: 'user_name', sortable: true },
        { name: 'Роль', selector: 'role', sortable: true },
        {
            name: 'Админитсрирование', cell: row =>
                <div class="d-inlin">
                    <button onClick={() => alert(row.id)} style={{marginRight: "5px"}} className="btn btn-primary btn-sm bi bi-pencil-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Редактировать"></button>
                    <button onClick={() => alert(row.id)} style={{marginRight: "5px"}} className="btn btn-danger btn-sm bi bi-trash3-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Удалить"></button>
                </div>
        },
    ]

    return (

        <DataTable
            columns={columns}
            data={users}
            pagination
            highlightOnHover
            responsive
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
        />
    )
});

export default UserBar;