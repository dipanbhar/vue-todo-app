import axios from "axios";
import APP_CONSTANTS from "@/utils/AppConstants.js";

const saveTodo = (todoData) => {
  const result = axios
    .post(APP_CONSTANTS.REST_API_SERVER_HOST+"/svc/todo/saveTodo", todoData)
    .then((response) => {
      return response.data;
      //return JSON.parse(JSON.stringify(response.data));
    })
    .catch((err) => {
      console.log(`Error in saving todo data: ${err.message}`);
      throw err;
    });
    return result;
};

const getAllTodos = () => {
  const result =  axios
    .get(APP_CONSTANTS.REST_API_SERVER_HOST+"/svc/todo/getAll")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(`Error in saving todo data: ${err.message}`);
      throw err;
    });
    return result;
};

const deleteTodo = (id) => {
  const result =  axios
    .delete(APP_CONSTANTS.REST_API_SERVER_HOST+"/svc/todo/deleteTodo/"+id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(`Error in saving todo data: ${err.message}`);
      throw err;
    });
    return result;
};

const updateTodo = (todoData) => {
  const result = axios
    .put(APP_CONSTANTS.REST_API_SERVER_HOST+"/svc/todo/updateTodo", todoData)
    .then((response) => {
      return response.data;
      //return JSON.parse(JSON.stringify(response.data));
    })
    .catch((err) => {
      console.log(`Error in updating todo data: ${err.message}`);
      throw err;
    });
    return result;
};

const todoSvc = {
  saveTodo: saveTodo,
  getAllTodos:getAllTodos,
  deleteTodo:deleteTodo,
  updateTodo:updateTodo
};

export default todoSvc;
