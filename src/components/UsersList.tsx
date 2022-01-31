import axios from 'axios';
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context, useGlobalContext } from '../context';
import { User } from '../types';



const UsersList: FC = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const {state, setState} = useGlobalContext();

  const {users} = state
  
  // получение пользователей
  function getUsers(): void {
    setIsLoading(true)
    axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
        .then(res => {
          if(res.status !== 200){
            throw new Error("Status not code 200");
          } 
          
          const usersList: User[] = res.data

          setState((prev: any) => ({...prev, users: usersList, isLoad: false}))
          setIsLoading(false)
          setError('')
        })
        .catch(e => {
          setError(e.toString())
          console.log(e);
          
        })
      
  }

  useEffect(() => {
    getUsers()
    
  }, [])  


  return  (<div className='users-list'>
    {isLoading ? error ? <div>{error}</div> : <div>Загрузка...</div>
     :
     users.map((user: any) => {
    return <div key={user.id} className='user'>
      <div className="user__info">
        <div className="user__name">ФИО: <span className='user__info--data'>{user.name}</span></div>
        <div className="user__city">город: <span className='user__info--data'>{user.address.city}</span></div>
        <div className="user__company">компания: <span className='user__info--data'>{user.company.name}</span></div>
      </div>
      <Link className='link' to={`/user/${user.id}`} >Подробнее</Link>
    </div>
  } )}
      </div>)

}

export default UsersList;
