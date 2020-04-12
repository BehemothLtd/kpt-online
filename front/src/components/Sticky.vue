<template>
  <div class="note">
    <div class="note-header">
      <div class="add" @click="add"></div>
      <div class="title">
        <input v-model="data.title" placeholder="Enter title" v-debounce:300ms="changed" />
      </div>
      <div class="close" @click="close"></div>
    </div>
    <div class="note-body">
      <textarea v-model="data.content" v-debounce:300ms="changed"></textarea>
    </div>
    <div class="note-footer">{{ data.created_at }}</div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  props: {
    data: Object,
    index: Number
  },
  data() {
    return {
      socket: io("localhost:3001")
    };
  },
  mounted() {
    this.socket.on("STICKY_UPDATED", data => {
      if (this.data.id == data.id) {
        this.$set(this.data, "title", data.title);
        this.$set(this.data, "content", data.content);
      }
    });
  },
  methods: {
    add() {
      this.$emit("add");
    },
    close() {
      this.$emit("close", this.index);
    },
    changed(value) {
      this.socket.emit("UPDATE_STICKY", this.data);
    }
  }
};
</script>

<style scoped>
.note {
  width: 100%;
  height: 210px;
  position: relative;
  vertical-align: top;
  display: flex;
  flex-flow: column;
  color: #4b453c;
  background: #f7e999;
  line-height: 34px;
  text-align: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.note-header {
  position: relative;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  height: 34px;
}

.note-header .add {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  opacity: 0.3;
  z-index: 2;
}

.note-header .add::before,
.note-header .add::after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 16px;
  width: 2px;
  background-color: #333;
}

.note-header .add::after {
  transform: rotate(-90deg);
}

.note-header .title {
  color: #747474;
  text-decoration: none;
  transition: all 0.4s ease;
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  left: 0;
}

.note-header .title input {
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 0 40px;
  border: none;
  box-shadow: none;
  outline: none;
  background: transparent;
}

.note-header .close {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  opacity: 0.3;
}

.note-header .close::before,
.note-header .close::after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 16px;
  width: 2px;
  background-color: #333;
  transform: rotate(45deg);
}

.note-header .close::after {
  transform: rotate(-45deg);
}

.note-body {
  padding: 10px;
  font-size: 12px;
  color: #747474;
  line-height: 20px;
  flex: 1;
  display: flex;
}

.note-body textarea {
  width: 100%;
  resize: none;
  border: none;
  box-shadow: none;
  outline: none;
  background: transparent;
}

.note-footer {
  color: #747474;
  text-decoration: none;
  transition: all 0.4s ease;
  text-align: right;
  width: 100%;
  padding-right: 10px;
  font-size: 9px;
  height: 34px;
}
</style>