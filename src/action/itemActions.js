import axios from 'axios';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEM, ITEMS_LOADING} from './type';
import { tokenConfig } from './authActions';
import {returnErrors} from './errorActions';

//Send item to endpoint

export const getItems = (userId) => (dispatch, getState) => {
    dispatch(setItemsLoading());
    axios.get(`/api/items/${userId}`).then(res => dispatch({
        type: GET_ITEMS,
        payload: res.data,
    }))
    .catch (err=> dispatch(returnErrors(err.response.data, err.response.status)));
};
export const deleteItem = (id) => (dispatch, getState) => {
    axios.delete(`/api/items/${id}`,tokenConfig(getState)).then(res => dispatch(
    {
        type:DELETE_ITEM,
        payload: id
    }
    ))
    .catch (err=> dispatch(returnErrors(err.response.data, err.response.status)));
};
export const addItem = (item) => (dispatch,getState) => {
    axios.post('/api/items', item, tokenConfig(getState)).then(res => dispatch(
        {
            type:ADD_ITEMS,
            payload: res.data
        }
    ))
    .catch (err=> dispatch(returnErrors(err.response.data, err.response.status)));
};
export const setItemsLoading = () => {
    return {
        type:ITEMS_LOADING
    }
}