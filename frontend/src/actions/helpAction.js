import axios from "axios";
import { URL_BASE } from "../config";

import {
    GET_HELPS_PENDING,
    GET_HELPS_SUCCESS,
    GET_HELPS_REJECT,
    CREATE_HELP_PENDING,
    CREATE_HELP_SUCCESS,
    CREATE_HELP_REJECT,
    DELETE_HELP_PENDING,
    DELETE_HELP_SUCCESS,
    DELETE_HELP_REJECT,
    DETAIL_HELP_PENDING,
    DETAIL_HELP_SUCCESS,
    DETAIL_HELP_REJECT,
} from "../types/helpTypes";

export const getHelps = () => {
    return async function (dispatch) {
        dispatch({ type: GET_HELPS_PENDING });
        try{
            const json = await axios.get(`${URL_BASE}/help`);
            dispatch({ type: GET_HELPS_SUCCESS, payload: json.data });
        } catch (err) {
            dispatch({ type: GET_HELPS_REJECT });
        }
    };
};

export const createHelp = (input, history, path, addToast) => {
    return async function (dispatch) {
        dispatch({ type: CREATE_HELP_PENDING });
        try{
            const json =await axios.post(`${URL_BASE}/help`, input);
            history.push(path);
            dispatch({ type: CREATE_HELP_SUCCESS, payload: json.data });
            addToast({
                title: "Éxito",
                description: "Mensaje enviado.",
                status: "success",
            });
        } catch (err) {
            dispatch({ type: CREATE_HELP_REJECT, payload: err.response.data });
            addToast({
                title: "Error",
                description: err.response.data.msg,
                status: "error",
            });
        }
    };
};

export const deleteHelp = (id, history, path, addToast) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_HELP_PENDING });
        try{
            const json = await axios.delete(`${URL_BASE}/help/${id}`);
            history.push(path);
            dispatch({ type: DELETE_HELP_SUCCESS, payload: json.data });
            addToast({
                title: "Éxito",
                description: "Mensaje borrado",
                status: "success",
            });
        } catch (err) {
            dispatch({ type: DELETE_HELP_REJECT });
        }
    };
};

export const getHelpDetail = (id) => {
    return async function (dispatch) {
        dispatch({ type: DETAIL_HELP_PENDING });
        try {
            const json = await axios.get(`${URL_BASE}/help/${id}`);
            dispatch({ type: DETAIL_HELP_SUCCESS, payload: json.data });
        } catch (err) {
            dispatch({ type: DETAIL_HELP_REJECT });
        }
    };
};