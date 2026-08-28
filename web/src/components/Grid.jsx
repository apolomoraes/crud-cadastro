/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
  width: ${(props) => (props.width ? props.width : 'auto')};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && 'display: none;'}
  }
`;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && 'display: none;'}
  }
`;

const Grid = ({users, setUsers, setOnEdit}) => {

  const handleEdit = (user) => {
    setOnEdit(user);
  };

  const handleDelete = async (id) => {
    await axios.delete("http://localhost:3000/" + id)
    .then(({data}) => {
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);
      toast.success(data);
    })
    .catch(({data}) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>E-mail</Th>
          <Th onlyWeb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user, index) => (
          <Tr key={index}>
            <Td width="30%">{user.nome}</Td>
            <Td width="30%">{user.email}</Td>
            <Td width="20%" onlyWeb>{user.fone}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(user)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(user.id)}/>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default Grid;