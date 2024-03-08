import {spawn, takeLatest, put} from 'redux-saga/effects';
import {getServices, getServiceById} from '../fetch/fetchApi';
import {
    setRequestServices,
    setRequestServiceById,
    setRequestServicesSuccess,
    setRequestServicesFailure
} from '../slices/servicesSlice';

export default function* saga() {
    yield spawn(watchGetServicesSaga);
    yield spawn(watchGetServiceByIdSaga);
}

function* watchGetServicesSaga() {
    yield takeLatest(setRequestServices, handleGetServicesSaga);
}

function* handleGetServicesSaga() {
    try {
        const data = yield getServices();
        yield put(setRequestServicesSuccess(data));
    } catch (e) {
        yield put(setRequestServicesFailure(e.message));
    }
}

function* watchGetServiceByIdSaga() {
    yield takeLatest(setRequestServiceById, handleGetServiceByIdSaga);
}

function* handleGetServiceByIdSaga({payload}: {payload: string}) {
    try {
        const data = yield getServiceById(payload);
        yield put(setRequestServicesSuccess(data));
    } catch (e) {
        //TODO что делать с e? там при любом раскладе ошибка TS
        yield put(setRequestServicesFailure(e.message));
    }
}