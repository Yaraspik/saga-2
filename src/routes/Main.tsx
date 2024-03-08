import {useAppSelector, useAppDispatch} from '../store/store';
import {servicesData, setRequestServices, servicesStatus, servicesError} from '../slices/servicesSlice';
import {useEffect } from 'react';
import {Link} from 'react-router-dom';
import loading from '../assets/loading.gif';

const Menu = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(servicesData);
  const status = useAppSelector(servicesStatus);
  const error = useAppSelector(servicesError);

  useEffect(() => {
      dispatch(setRequestServices());
  }, [dispatch])

  return (
    <>
      {
        status === "pending" ? <img src={loading} /> :
        status === "error" ? <div><p>{error}</p><button onClick={() => dispatch(setRequestServices())}>Повторить</button></div> :
        data ? data.map((el) => <div key={el.id}><Link to={`/${el.id}/details`}>{el.name} {el.price}</Link></div>) :
        <></>
      }
    </>
  );
}

export default Menu;