<!-- TableComponent.vue -->
<template>
  <table class="list">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td
          v-for="(value, columnIndex) in row"
          :key="columnIndex"
        >
        <div v-if="columnIndex == 'priority'">
          <div v-if="value == '0'"><div class="badge-0"></div></div>
          <div v-else-if="value == '1'"><div class="badge-1"></div></div>
          <div v-else-if="value == '2'"><div class="badge-2"></div></div>
        </div>
        <div v-else-if="columnIndex == 'id'">
          <button @click="updateData(row)">Edit</button> |
          <button @click="removeData(value)">Remove</button>
        </div>
        <div v-else>
          {{ value }}
        </div>
        </td>
      </tr>
      <tr>
        <td>
          <select  v-model="priority">
            <option value="2">critical</option>
            <option value="1">moderate</option>
            <option value="0">optional</option>
          </select>
        </td>
        <td>
          <input
            v-model="title"
            placeholder="Enter a new todo"
            required="true"
          />
        </td>
        <td><button @click="addData(priority,title)">Add new</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  updateData : {
    type: Function,
    required: true,
  },
  removeData: {
    type: Function,
    required: true,
  },
  addData : {
    type: Function,
    required: true,
  }
});
</script>

<style scoped>
.list {
  border-collapse: collapse;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

.list td,
#list th {
  border: 1px solid #ddd;
  padding: 8px;
}

.list tr:nth-child(even) {
  background-color: #110c0c;
}

.list tr:hover {
  background-color: #b95f0549;
}

.list th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #04aa6d;
  border: 1px solid #ddd;
  color: rgb(3, 78, 22);
}
.badge-2 {
  text-align: center;
  color: rgb(238, 229, 229);
  text-align: center;
}

.badge-2::after {
  background-color: rgba(255, 30, 0, 0.712);
  border-radius: 5px;
  content: "critical";
  padding: 4px 8px;
}
.badge-1 {
  text-align: center;
  color: rgb(15, 14, 14);
  text-align: center;
}

.badge-1::after {
  background-color: rgba(200, 255, 0, 0.877);
  border-radius: 5px;
  content: "moderate";
  padding: 4px 8px;
}
.badge-0 {
  text-align: center;
  color: rgb(15, 14, 14);
  text-align: center;
}

.badge-0::after {
  background-color: rgba(0, 238, 255, 0.877);
  border-radius: 5px;
  content: "optional";
  padding: 4px 8px;
}
</style>
