<!-- TodoComponent.vue -->
<template>
  <div class="app">
    <div :class="cls">
      {{ msg }}&nbsp;<a href="javascript:void(0)" @click="removeMsg()">Clear</a>
    </div>
    <div class="sectionHeader">
      To-do list &nbsp;<a href="javascript:void(0)" @click="removeAll()"
        >Remove all todos
      </a>
    </div>
    <div>
      <TableComponent
        :headers="tableHeaders"
        :data="todos"
        :addData="addTodo"
        :updateData="updateTodo"
        :removeData="removeTodo"
        :priority="priority"
        :title="title"
      />
    </div>
  </div>
</template>

<script setup>
import TableComponent from "@/components/coreComponents/TableComponent.vue";
import todoSvc from "@/services/TodoSvc.js";
import { ref, onMounted } from "vue";
import messages from "@/messages/messages-en-En.js";

const tableHeaders = ["Priority", "Title", "Actions"];
const msg = ref("");
const cls = ref("hideMsg");
const todos = ref();
const addTodo = (priority, title) => {
  if (typeof title !== "undefined" && typeof priority !== "undefined") {
    todoSvc
      .saveTodo({ priority: priority, title: title })
      .then((response) => {
        showSuccessMsg(messages.DATA_SAVE_MSG);
        getAllTodos();
      })
      .catch((err) => {
        showMsg(messages.ERROR_SAVE_MSG);
      });
  } else {
    showMsg(messages.MANDATORY_MSG);
  }
};
const getAllTodos = () => {
  todoSvc
    .getAllTodos()
    .then((response) => {
      todos.value = response;
    })
    .catch((err) => {
      showMsg(messages.ERROR_FETCH_MSG);
    });
};
const removeTodo = (id) => {
    
    if (confirm(messages.DELETE_CONFIRM_MSG)) {
    todoSvc
      .deleteTodo(id)
      .then((response) => {
        getAllTodos();
      })
      .catch((err) => {
        showMsg(messages.ERROR_DELETE_MSG);
      });
  }
};
const updateTodo = (todo) => {
  if (title.value.trim() !== "") {
    todoSvc
      .updateTodo(todo)
      .then((response) => {
        getAllTodos();
      })
      .catch((err) => {
        cls.value = "showMsg";
        msg.value = `Error in saving todo data: ${err.message}`;
      });
  } else {
    cls.value = "showMsg";
    msg.value = `Please add value for title`;
  }
};
const removeMsg = () => {
  cls.value = "hideMsg";
};
const showMsg = (message) => {
  cls.value = "showMsgCls";
  msg.value = message;
};

const showSuccessMsg = (message) => {
  cls.value = "showSuccessMsgCls";
  msg.value = message;
};



onMounted(async () => {
  getAllTodos();
});
</script>

<style scoped>
.showMsgCls {
  display: block;
  height: 20px;
  width: 300px;
  float: none;
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 2px;
  text-align: center;
  background: #f00202ad;
  color: white;
  font-size: 12px;
  margin-left: auto;
  margin-right: auto;
}

.hideMsg {
  display: none;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 40px;
}

input[type="text"] {
  padding: 10px;
  font-size: 16px;
  width: 60%;
  margin-right: 10px;
}

.sectionHeader {
  text-align: center;
  content: "Dipannn";
}

.showSuccessMsgCls {
  display: block;
  height: 20px;
  width: 300px;
  float: none;
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 2px;
  text-align: center;
  background: #02f002ad;
  color: white;
  font-size: 12px;
  margin-left: auto;
  margin-right: auto;
}

</style>
