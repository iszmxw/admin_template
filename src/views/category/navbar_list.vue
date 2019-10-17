<template>
  <div class="main">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>导航栏列表</span>
        <span style="float:right">
          <el-button
            type="primary"
            @click="addFormDialogVisible = true"
          >添加导航</el-button>
        </span>
      </div>
      <el-table
        ref="dragTable"
        :data="list"
        row-key="id"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.sort"
              placeholder="排序"
              style="width:120px"
            >
              <el-button
                slot="append"
                icon="el-icon-sort"
              />
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
        />
        <el-table-column label="导航栏名称">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.navbar_name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="导航栏图标">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.navbar_icon }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否显示">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.hide }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否新窗口打开">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.new_tab }}
            </el-tag>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="是否栏目">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="查看地址">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.url }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
        <el-table-column
          align="center"
          label="拖拽"
          width="80"
        >
          <template slot-scope="{}">
            <svg-icon
              class="drag-handler"
              icon-class="drag"
            />
          </template>
        </el-table-column>
      </el-table>
      <div class="show-d">
        <el-tag>默认顺序:</el-tag> {{ oldList }}
      </div>
      <div class="show-d">
        <el-tag>拖拽后顺序 :</el-tag> {{ newList }}
      </div>
    </el-card>

    <!-- 添加导航 -->
    <el-dialog
      title="添加导航"
      :visible.sync="addFormDialogVisible"
      width="30%"
      center
    >
      <el-form
        ref="form"
        :model="addform"
        label-width="80px"
      >
        <el-form-item label="名称">
          <el-input v-model="addform.name" />
        </el-form-item>
        <el-form-item label="上级">
          <el-select
            v-model="addform.pid"
            placeholder="请选择上级"
          >
            <el-option
              label="设置为顶级"
              value="0"
            />
            <el-option
              v-for="item in navbar_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="addform.description" />
        </el-form-item>
        <el-form-item label="别名">
          <el-input v-model="addform.alias" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addFormDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addData"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { getNavbar, addNavbar, deleteNavbar, editNavbar } from '@/api/navbar'
export default {
  data() {
    return {
      addFormDialogVisible: false,
      editFormDialogVisible: false,
      navbar_list: [],
      addform: {
        name: undefined,
        pid: undefined,
        description: undefined,
        alias: undefined
      },
      editForm: {
        id: undefined,
        name: undefined,
        pid: undefined,
        description: undefined,
        alias: undefined
      },
      sortable: null,
      list: [],
      oldList: [],
      newList: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      getNavbar().then(res => {
        if (res.code === 200) {
          this.list = res.data
        }
      })
      this.oldList = this.list.map(v => v.id)
      this.newList = this.oldList.slice()
      this.$nextTick(() => {
        this.setSort()
      })
    },
    // 排序
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // 放置占位符的类名称，
        setData: function(dataTransfer) {
          // 避免Firefox错误
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)

          // 为了显示更改，您可以在代码中删除
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    },
    addData() {

    }
  }
}
</script>

<style scoped>
.main {
  padding: 32px;
}
</style>
