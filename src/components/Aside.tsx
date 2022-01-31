import React, { FC } from 'react';
import { useGlobalContext } from '../context';

const Aside: FC = () => {

  const {state, setState} = useGlobalContext()
  // сортировка пользователей по параметрам в алфвитном порядке
  function sortUsers(x: any, y: any, key: string){
    if(!key){
      console.log('Нет ключа для сортировки');
      return 0
    }

    if(key === 'company'){
      if (x[key].name.toLowerCase() < y[key].name.toLowerCase()) return -1;
      if (x[key].name.toLowerCase() > y[key].name.toLowerCase()) return 1;
      return 0
    }
    
    if(key === 'city'){
      
      if (x.address[key].toLowerCase() < y.address[key].toLowerCase()) return -1;
      if (x.address[key].toLowerCase() > y.address[key].toLowerCase()) return 1;
      return 0;
    }

    if (x[key].toLowerCase() < y[key].toLowerCase()) {return -1;}
    if (x[key].toLowerCase() > y[key].toLowerCase()) {return 1;}
    return 0;
  }

  function setSort(e: any) {
    const sortType = e.target.getAttribute('data-sort')
    setState((prev: any) => ({...prev, sort: sortType}))
  
    const usersSorted = state.users.sort((a: object, b: object) => sortUsers(a, b, sortType))
    setState((prev: any) => ({...prev, users: usersSorted}))

  }

  return <aside className='aside'>
    <p>Сортировка</p>
        <div className='sort'>
          <button onClick={setSort} data-sort='city' className='btn btn-primary'>по городу</button>
          <button onClick={setSort} data-sort='company' className='btn btn-primary'>по компании</button>
        </div>

  </aside>;
};

export default Aside;
