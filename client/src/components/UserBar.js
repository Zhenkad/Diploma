import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../http/userApi';
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component"
import EditUser from './Modal/EditUser';
import { Button } from 'react-bootstrap'
import DeleteUser from './Modal/DeleteUser';
import {Modal} from "react-bootstrap";

const UserBar = observer(() => {

    var [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)
    const [editUserVisible, setEditUserVisible] = useState(false)
    const [deleteUserVisible, setDeleteUserVisible] = useState(false)

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

    const columns = [
        { name: 'ID', selector: 'id', sortable: true },
        { name: 'Имя пользователя', selector: 'user_name', sortable: true },
        { name: 'Роль', selector: 'role', sortable: true },
        {
            name: 'Админитсрирование', cell: (row) => {return(
                <div className="d-inlin">
                    <Button onClick={() => setEditUserVisible(true)} style={{ marginRight: "5px" }} variant={"primary"} className="btn-sm bi bi-pencil-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Редактировать"></Button>
                    <EditUser userId={row.id} show={editUserVisible} onHide={() => setEditUserVisible(false)} />
                    <Button onClick={() => openDelete(row.id)} style={{ marginRight: "5px" }} variant={"danger"} className="btn-sm bi bi-person-x-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Удалить"></Button>
                    <DeleteUser userId={row.id} show={deleteUserVisible} onHide={() => setDeleteUserVisible(false)} />
                </div>
            )},
        },
    ]
    
    return (
        <>
        
            <DataTable
                columns={columns}
                data={users}
                pagination
                highlightOnHover
                responsive
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            />
        </>
    )
});

export default UserBar;