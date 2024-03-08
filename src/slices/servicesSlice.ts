import { createSlice, createAction } from '@reduxjs/toolkit';

type Data = {
    id: string,
    name: string,
    price: number,
    content: string,
};

type serviceSliceState = {
    data: Array<Data>;
    status: "idle" | "pending" | "success" | "error";
    error: string;
    item: object;
}

const initialState: serviceSliceState = {
    data: [],
    status: "idle",
    error: "",
    item: {},
}

const servicesSlice = createSlice({
    name: 'services',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setRequestServices, (state) => {
                state.status = "pending";
            })
            .addCase(setRequestServiceById, (state) => {
                state.status = "pending";
            })
            .addCase(setRequestServicesSuccess, (state, action) => {
                if(Array.isArray(action.payload)) {
                    state.data = action.payload;
                } else if (typeof action.payload === 'object'){
                    state.item = action.payload;
                }
                state.status = "success";
            })
            .addCase(setRequestServicesFailure, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            })
    },
});

export const servicesData = ({services}: {services: serviceSliceState}) => services.data;
export const servicesItem = ({services}: {services: serviceSliceState}) => services.item;
export const servicesStatus = ({services}: {services: serviceSliceState}) => services.status;
export const servicesError = ({services}: {services: serviceSliceState}) => services.error;

export const setRequestServices = createAction('setRequestServices');
export const setRequestServiceById = createAction<string>('setRequestServiceById');
export const setRequestServicesSuccess = createAction('setRequestServicesSuccess');
export const setRequestServicesFailure = createAction('setRequestServicesFailure');

export default servicesSlice.reducer;