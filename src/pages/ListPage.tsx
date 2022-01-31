import React, { FC } from 'react';
import { UsersList } from '../components';


const ListPage: FC = () => {

  return <div className='page'>
    <h2>Список пользователей</h2>
    <div className="users-list">
      <UsersList />
      
    </div>
  </div>;
};

export default ListPage;
