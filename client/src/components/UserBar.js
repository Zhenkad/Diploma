import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../http/userApi';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { observer } from "mobx-react-lite";

const UserBar = observer(() => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then((data) => setUsers(data.data))
    }, [])
    console.log(users)
    return (
        <DataTable value={users} >
            {users.map((user) => (
                <Column key={user.id} field={user.user_name} header={user.id} />
            ))}
        </DataTable>
    );
});

export default UserBar;