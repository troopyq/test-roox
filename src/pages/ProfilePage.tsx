import axios, { AxiosResponse } from 'axios';
import React, { FC, RefObject, SetStateAction } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { User } from '../types';

type UserProps = (prev: User) => User

const ProfilePage: FC<RouteChildrenProps> = ({match}: any) => {
  // создавал UserProps для setUser, пытался типизировать это :)
  // @ts-ignore
  const [user, setUser] = React.useState<User>({
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      city: '',
      zipcode: ''
    },
    phone: '',
    website: '',
    comment: ''
  })
  const [isReadOnly, setIsReadOnly] = React.useState<boolean>(true)
  const [invalidList, setIsInvalidList] = React.useState<any>([])

  
  // вкл/откл редактирования
  function onEdit() {
    setIsReadOnly((prev: boolean) => !prev)
  }
  function toObjectTree(keys: string | null, value: string) {
    const arrKeys: string[] | undefined = keys?.split(' ')
    // если вложенности нет, то просто отдаем одновложенный объект
    if(typeof arrKeys === 'object' && arrKeys.length === 1){
      return {[arrKeys[0]]: value}
    }

    function createObjTree(arr: any, val: any = value): object {
      if (!arr.length) {
        return val;
      }
  
      const obj: any = {};
      obj[arr.pop()] = val;
  
      return createObjTree(arr, obj);
    }
    return createObjTree(arrKeys)
  }

  // редактирование полей
  function edit(e: any) {
    const target: HTMLInputElement = e.target
    const attr = target.getAttribute('name')
    const required = target.required
    const value = target.value.trim()
    
    if(!target.validity.valid){
      if(!invalidList.find((a: string)=> a === attr)){
        setIsInvalidList((prev: string[]) => ([...prev, attr]))
        target.classList.add('invalid')
      }
    } else{
      const invalid = invalidList.filter((el: string) => el !== attr)
      setIsInvalidList(invalid)
      target.classList.remove('invalid')
    }
    
    // если есть вложенность, то создаем дерево объектов для этого свойтсва
    const obj = toObjectTree(attr, value)
    
    setUser((prev: User) => ({...prev, ...obj }))
    
  }

  // отправка изменений
  function onSubmit(e: any) {
    if(e.target.disabled){
      return
    }
    console.log(JSON.stringify(user));
    console.log(user);
    
  }
  // получение пользователя по id
  function getUsers() {
    axios.get<User>(`https://jsonplaceholder.typicode.com/users/${match.params.id}`)
        .then((res) => {
          const userInfo: User = res.data
          setUser(userInfo)
        })
      
  }
  // загрузка пользователя при открытии страницы
  React.useEffect(() => {
    getUsers()
  }, [])


  return <div className='page'>
    <header className='page-header'>
    <h2>Профиль пользоваетля</h2>
    <button onClick={onEdit} className='btn'>Редактировать</button>
    </header>

    <div className="fields">
      <label htmlFor="name">
        <span className='label-up'>Name</span>
        <input onChange={edit} type="text" required id='name' name='name' value={user?.name} disabled={isReadOnly}/>
      </label>
      <label htmlFor="username">
        <span className='label-up'>User name</span>
        <input onChange={edit} type="text" required id='username' name='username' value={user?.username} disabled={isReadOnly}/>
      </label>
      <label htmlFor="email">
        <span className='label-up'>E-mail</span>
        <input onChange={edit} type="email" required id='email' name='email' value={user?.email} disabled={isReadOnly}/>
      </label>
      <label htmlFor="street">
        <span className='label-up'>Street</span>
        <input onChange={edit} type="text" required id='street' name='address street' value={user?.address?.street} disabled={isReadOnly}/>
      </label>
      <label htmlFor="city">
        <span className='label-up'>City</span>
        <input onChange={edit} type="text" required id='city' name='address city' value={user?.address?.city} disabled={isReadOnly}/>
      </label>
      <label htmlFor="zipcode">
        <span className='label-up'>Zip code</span>
        <input onChange={edit} type="text" required id='zipcode' name='address zipcode' value={user?.address?.zipcode} disabled={isReadOnly}/>
      </label>
      <label htmlFor="phone">
        <span className='label-up'>Phone</span>
        <input onChange={edit} type="phone" required id='phone' name='phone' value={user?.phone} disabled={isReadOnly}/>
      </label>
      <label htmlFor="website">
        <span className='label-up'>Website</span>
        <input onChange={edit} type="text" required id='website' name='website' value={user?.website} disabled={isReadOnly}/>
      </label>
      <label htmlFor="comment">
        <span className='label-up'>Comment</span>
        <textarea onChange={edit} id='comment' rows={5} name='comment' value={user?.comment} disabled={isReadOnly} ></textarea>
      </label>
    </div>

    <button  className='btn success btn-profile-save' disabled={isReadOnly || invalidList.length} onClick={onSubmit}>Отправить</button>
  </div>;
};

export default ProfilePage;
