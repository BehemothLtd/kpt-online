<template>
  <div class="row">
    <div class="col-md-12 p20">
      <button class="btn btn-info" type="button" v-on:click="insertItem">リスト追加</button>
    </div>
    <div class="col-md-3 col-sm-3">
      <ul class="list-group drag p10">
        <draggable class="dragArea" :options="{group:'ITEMS'}" v-model="myList">
          <li class="list-group-item" v-for="item, index in myList" :key="item.no">
            <span class="badge">No.{{item.no}}</span>
            <label>{{item.name}}</label>
            <p>
              <span class="del" v-on:click="deleteItem(item, index, '')">削除</span>
            </p>
          </li>
        </draggable>
      </ul>
    </div>
    <div class="col-md-3 col-sm-3">
      <ul class="list-group drag p10">
        <draggable class="dragArea" :options="{group:'ITEMS'}" v-model="myList2">
          <li class="list-group-item" v-for="item, index in myList2" :key="item.no">
            <span class="badge">No.{{item.no}}</span>
            <label>{{item.name}}</label>
            <p>
              <span class="del" v-on:click="deleteItem(item, index, '2')">削除</span>
            </p>
          </li>
        </draggable>
      </ul>
    </div>
    <div class="col-md-3 col-sm-3">
      <ul class="list-group drag p10">
        <draggable class="dragArea" :options="{group:'ITEMS'}" v-model="myList3">
          <li class="list-group-item" v-for="item, index in myList3" :key="item.no">
            <span class="badge">No.{{item.no}}</span>
            <label>{{item.name}}</label>
            <p>
              <span class="del" v-on:click="deleteItem(item, index, '3')">削除</span>
            </p>
          </li>
        </draggable>
      </ul>
    </div>
    <div class="col-md-3 col-sm-3">
      <ul class="list-group drag p10">
        <draggable class="dragArea" :options="{group:'ITEMS'}" v-model="myList4">
          <li class="list-group-item" v-for="item, index in myList4" :key="item.no">
            <span class="badge">No.{{item.no}}</span>
            <label>{{item.name}}</label>
            <p>
              <span class="del" v-on:click="deleteItem(item, index, '4')">削除</span>
            </p>
          </li>
        </draggable>
      </ul>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      items: [
        { no: 1, name: "キャベツ", categoryNo: "1" },
        { no: 5, name: "きゅうり", categoryNo: "1" },
        { no: 9, name: "にんじん", categoryNo: "1" },
        { no: 10, name: "トマト", categoryNo: "1" }
      ],
      items2: [
        { no: 2, name: "ステーキ", categoryNo: "2" },
        { no: 6, name: "ハンバーグ", categoryNo: "2" },
        { no: 11, name: "とんかつ", categoryNo: "2" },
        { no: 12, name: "からあげ", categoryNo: "2" }
      ],
      items3: [
        { no: 3, name: "リンゴ", categoryNo: "3" },
        { no: 7, name: "バナナ", categoryNo: "3" },
        { no: 13, name: "ブドウ", categoryNo: "3" },
        { no: 14, name: "オレンジ", categoryNo: "3" }
      ],
      items4: [
        { no: 4, name: "冷蔵庫", categoryNo: "4" },
        { no: 8, name: "PS4", categoryNo: "4" },
        { no: 15, name: "電子レンジ", categoryNo: "4" },
        { no: 16, name: "Xbox", categoryNo: "4" }
      ],
      newNo: 0
    };
  },
  methods: {
    insertItem: function() {
      var self = this;
      var no = 0;
      if (self.items.concat().length > 0) {
        no =
          Math.max.apply(
            null,
            self.items.concat().map(function(item) {
              return item.no;
            })
          ) + 1;

        self.newNo = self.newNo < no ? no : self.newNo;
      }
      if (self.items2.concat().length > 0) {
        no =
          Math.max.apply(
            null,
            self.items2.concat().map(function(item) {
              return item.no;
            })
          ) + 1;

        self.newNo = self.newNo < no ? no : self.newNo;
      }
      if (self.items3.concat().length > 0) {
        no =
          Math.max.apply(
            null,
            self.items3.concat().map(function(item) {
              return item.no;
            })
          ) + 1;

        self.newNo = self.newNo < no ? no : self.newNo;
      }
      if (self.items4.concat().length > 0) {
        no =
          Math.max.apply(
            null,
            self.items4.concat().map(function(item) {
              return item.no;
            })
          ) + 1;

        self.newNo = self.newNo < no ? no : self.newNo;
      }

      this.items.push({
        no: this.newNo,
        name: "追加リスト" + this.newNo,
        categoryNo: "5"
      });
    },
    deleteItem: function(item, index, group) {
      switch (group) {
        case "":
          var ITEMS = this.items;
          break;
        case "2":
          var ITEMS = this.items2;
          break;
        case "3":
          var ITEMS = this.items3;
          break;
        case "4":
          var ITEMS = this.items4;
          break;
      }

      ITEMS.splice(index, 1);
    }
  },
  computed: {
    myList: {
      get() {
        return this.items;
      },
      set(value) {
        this.items = value;
      }
    },
    myList2: {
      get() {
        return this.items2;
      },
      set(value) {
        this.items2 = value;
      }
    },
    myList3: {
      get() {
        return this.items3;
      },
      set(value) {
        this.items3 = value;
      }
    },
    myList4: {
      get() {
        return this.items4;
      },
      set(value) {
        this.items4 = value;
      }
    }
  }
};
</script>

<style>
.p10 {
  padding: 10px;
}
.p20 {
  padding: 20px;
}

.normal {
  background-color: grey;
}

.dragArea {
  min-height: 10px;
}

.sortable-chosen {
  opacity: 0.7;
  background-color: #dcdcdc;
}
.sortable-ghost {
  background-color: #dcdcdc;
}

.del {
  cursor: pointer;
  color: red;
}
</style>