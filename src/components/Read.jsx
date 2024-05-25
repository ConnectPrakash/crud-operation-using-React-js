import React, { useEffect, useState } from 'react'
import {Table,Button} from 'semantic-ui-react';
import { API_URL } from '../Constants/URL';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Read() {
    const [apiData,setAPIData] = useState([]);
    const navigate = useNavigate();

    const callGetApi = async()=>{
        const resp = await axios.get(API_URL);
        setAPIData(resp.data);
    }
    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`)
        callGetApi();
      };

    const handleUpdate = async({firstName,lastName,checked,id}) =>{
        localStorage.setItem('id',id)
        localStorage.setItem('firstName',firstName)
        localStorage.setItem('lastName',lastName)
        localStorage.setItem('checked',checked)

        navigate('/update')
    }
    useEffect(()=>{
            callGetApi();
    },[]);

    const handleCreate = () =>{
        navigate('/')
    }
  return (
    <div>
     <Table singleLine>
        <Table.Header>
            <Table.Row>
                 
                 <Table.HeaderCell>First Name</Table.HeaderCell>
                 <Table.HeaderCell>Last Name</Table.HeaderCell>
                 <Table.HeaderCell>checked</Table.HeaderCell>
                 <Table.HeaderCell>Delete</Table.HeaderCell>
                 <Table.HeaderCell>Update</Table.HeaderCell>

            </Table.Row>
        </Table.Header>
        <Table.Body>
        {apiData.map(data => (
            <Table.Row key={data.id}>
              <Table.Cell>{data.firstName}</Table.Cell>
              <Table.Cell>{data.lastName}</Table.Cell>
              <Table.Cell>{data.checked ? 'Checked' : 'Not Checked'}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => handleDelete(data.id)}>Delete</Button>
              </Table.Cell>
              <Table.Cell>
              <Button onClick={() => handleUpdate(data)}>Update</Button>
              </Table.Cell>
            </Table.Row>
          ))}
           
          
          
        </Table.Body>
     </Table>
     <br/>
     <Button onClick={handleCreate}>Create</Button>
    </div>
  )
}

export default Read
