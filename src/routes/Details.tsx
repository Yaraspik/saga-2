import {useAppSelector, useAppDispatch} from '../store/store';
import {
    servicesItem,
    setRequestServiceById,
    servicesStatus,
    servicesError,
} from '../slices/servicesSlice';
import {useEffect} from 'react';
import {useLoaderData} from "react-router-dom";
// TODO как правильно желать импорт изображений?
import loading from "../assets/loading.gif";

const Details = () => {
    const dispatch = useAppDispatch();
    const rawId = useLoaderData();
    const id = isString(rawId) ? rawId : "";
    const item = useAppSelector(servicesItem);
    const status = useAppSelector(servicesStatus);
    const error = useAppSelector(servicesError);

    function isString(value: unknown): value is string {
        return typeof value === 'string';
    }

    useEffect(() => {
        dispatch(setRequestServiceById(id));
    }, [dispatch, id]);

    return (
        <>
            {
                status === "pending" ? <img src={loading}/> :
                    status === "error" ? <div><p>{error}</p>
                            <button onClick={() => dispatch(setRequestServiceById(id))}>Повторить</button>
                        </div> :
                        <div>{<p>{item.name}</p>}{<p>{item.content}</p>}{<p>{item.price}</p>}</div>
            }
        </>
    );
}

export default Details;