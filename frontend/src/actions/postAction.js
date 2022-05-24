import axios from "axios";
import { URL_BASE } from "../config";

import {
  GET_POST_PENDING,
  GET_POST_SUCCESS,
  GET_POST_REJECT,
  DETAIL_POST_PENDING,
  DETAIL_POST_SUCCESS,
  DETAIL_POST_REJECT,
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,
  CREATE_POST_REJECT,
  DELETE_POST_PENDING,
  DELETE_POST_SUCCESS,
  DELETE_POST_REJECT,
  EDIT_POST_PENDING,
  EDIT_POST_SUCCESS,
  EDIT_POST_REJECT,
  GET_POSTCOMMENTS_PENDING,
  GET_POSTCOMMENTS_SUCCESS,
  GET_POSTCOMMENTS_REJECT,
  CREATE_POSTCOMMENTS_PENDING,
  CREATE_POSTCOMMENTS_SUCCESS,
  CREATE_POSTCOMMENTS_REJECT,
  EDIT_POSTCOMMENTS_PENDING,
  EDIT_POSTCOMMENTS_SUCCESS,
  EDIT_POSTCOMMENTS_REJECT,
  DELETE_POSTCOMMENTS_PENDING,
  DELETE_POSTCOMMENTS_SUCCESS,
  DELETE_POSTCOMMENTS_REJECT,
  SEARCH_BY_TITLE_POSTS_PENDING,
  SEARCH_BY_TITLE_POSTS_SUCCESS,
  SEARCH_BY_TITLE_POSTS_REJECT,
  FILTER_BY_CATEGORY_POSTS_PENDING,
  FILTER_BY_CATEGORY_POSTS_SUCCESS,
  FILTER_BY_CATEGORY_POSTS_REJECT,
} from "../types/postTypes";

//DB-falsa

// import { dataPost } from "../db_para_pruebas/dataPost";

// // funcion que llama a los paseadores con el registors de sus paseos disponibles
// export const getPostFake = () => (dispatch) => {
//   const j = dataPost;
//   return dispatch({ type: GET_POST_SUCCESS, payload: j });
// };

export const getPost = () => {
  return async function (dispatch) {
    dispatch({ type: GET_POST_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/posts`);
      dispatch({ type: GET_POST_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: GET_POST_REJECT });
    }
  };
};

export const getPostDetail = (id) => {
  return async function (dispatch) {
    dispatch({ type: DETAIL_POST_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/posts/${id}`);
      dispatch({ type: DETAIL_POST_SUCCESS, payload: json.data });
      // const json = dataPost.find((e) => e.id === parseInt(id));
      // dispatch({ type: DETAIL_POST_SUCCESS, payload: json });
    } catch (err) {
      dispatch({ type: DETAIL_POST_REJECT });
    }
  };
};

export const createPost = (input, history, path, addToast) => {
  return async function (dispatch) {
    dispatch({ type: CREATE_POST_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/posts`, input);
      history.push(path);
      dispatch({ type: CREATE_POST_SUCCESS, payload: json.data });
      addToast({
        title: "Éxito",
        description: "Publicación creada",
        status: "success",
      });
    } catch (err) {
      dispatch({ type: CREATE_POST_REJECT, payload: err.response.data });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const deletePost = (id, history, path, addToast) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_POST_PENDING });
    try {
      const json = await axios.delete(`${URL_BASE}/posts/${id}`);
      history.push(path);
      dispatch({ type: DELETE_POST_SUCCESS, payload: json.data });
      addToast({
        title: "Éxito",
        description: "Publicación borrada",
        status: "success",
      });
    } catch (err) {
      dispatch({ type: DELETE_POST_REJECT });
    }
  };
};

export const editPost = (input, history, path, addToast) => {
  return async function (dispatch) {
    dispatch({ type: EDIT_POST_PENDING });
    try {
      const json = await axios.put(`${URL_BASE}/posts/${input.id}`, input);
      history.push(path);
      dispatch({ type: EDIT_POST_SUCCESS, payload: json.data });
      addToast({
        title: "Éxito",
        description: "Publicación actualizada",
        status: "success",
      });
    } catch (err) {
      dispatch({ type: EDIT_POST_REJECT, payload: err.response.data });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const getPostComments = (postId) => {
  return async function (dispatch) {
    dispatch({ type: GET_POSTCOMMENTS_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/comments/${postId}`);
      dispatch({ type: GET_POSTCOMMENTS_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: GET_POSTCOMMENTS_REJECT });
    }
  };
};

export const createComments = (input, postId) => {
  return async function (dispatch) {
    dispatch({ type: CREATE_POSTCOMMENTS_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/comments/${postId}`, input);
      dispatch({ type: CREATE_POSTCOMMENTS_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: CREATE_POSTCOMMENTS_REJECT });
    }
  };
};

export const editComments = (input, history, path) => {
  return async function (dispatch) {
    dispatch({ type: EDIT_POSTCOMMENTS_PENDING });
    try {
      const json = await axios.put(`${URL_BASE}/comments/${input.id}`, input);
      history.push(path);
      dispatch({ type: EDIT_POSTCOMMENTS_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: EDIT_POSTCOMMENTS_REJECT, payload: err.response.data });
    }
  };
};

export const deleteComments = (commentId, addToast) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_POSTCOMMENTS_PENDING });
    try {
      const json = await axios.delete(`${URL_BASE}/comments/${commentId}`);
      dispatch({
        type: DELETE_POSTCOMMENTS_SUCCESS,
        payload: json.data,
      });
      addToast({
        title: "Éxito",
        description: "Comentario eliminado",
        status: "success",
      });
    } catch (err) {
      dispatch({ type: DELETE_POSTCOMMENTS_REJECT });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const getPostsByTitle = (title) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_BY_TITLE_POSTS_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/posts?title=${title}`);
      return dispatch({
        type: SEARCH_BY_TITLE_POSTS_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: SEARCH_BY_TITLE_POSTS_REJECT });
    }
  };
};

export const getPostsByCategory = (category) => {
  return async (dispatch) => {
    dispatch({ type: FILTER_BY_CATEGORY_POSTS_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/posts?category=${category}`);
      return dispatch({
        type: FILTER_BY_CATEGORY_POSTS_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: FILTER_BY_CATEGORY_POSTS_REJECT });
    }
  };
};
