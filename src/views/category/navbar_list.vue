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
        <el-table-column label="导航栏icon图标">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.navbar_icon">
              {{ scope.row.navbar_icon }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否显示">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.show === 0"
              type="info"
            >
              隐藏
            </el-tag>
            <el-tag
              v-if="scope.row.show === 1"
              type="success"
            >
              显示
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否新窗口打开">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.new_tab === 0"
              type="info"
            >
              否
            </el-tag>
            <el-tag
              v-if="scope.row.new_tab === 1"
              type="success"
            >
              是
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否栏目">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.type === 1"
              type="success"
            >
              系统栏目
            </el-tag>
            <el-tag
              v-if="scope.row.type === 2"
              type="danger"
            >
              网址链接
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="查看地址">
          <template slot-scope="scope">
            <a
              :href="scope.row.url"
              target="_blank"
            >
              <el-tag>
                新窗口打开
              </el-tag>
            </a>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="getEditModal(scope.row)"
            >编辑</el-button>
            <el-button type="danger">删除</el-button>
          </template>
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
        label-width="120px"
      >
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
              v-for="item in list"
              :key="item.id"
              :label="item.navbar_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="是否显示">
          <el-select
            v-model="addform.show"
            placeholder="是否显示"
          >
            <el-option
              label="显示"
              :value="1"
            />
            <el-option
              label="隐藏"
              :value="0"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="是否新窗口打开">
          <el-select v-model="addform.new_tab">
            <el-option
              label="新窗口打开"
              :value="1"
            />
            <el-option
              label="本页面打开"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="栏目类型">
          <el-select
            v-model="addform.type"
          >
            <el-option
              label="系统栏目"
              :value="1"
            />
            <el-option
              label="网址链接"
              :value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="栏目地址">
          <el-select
            v-if="addform.type === 1"
            v-model="addform.type_id"
            placeholder="请选择栏目地址"
          >
            <el-option
              v-for="item in category_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-input
            v-if="addform.type === 2"
            v-model="addform.url"
          />
        </el-form-item>

        <el-form-item label="导航栏名称">
          <el-input v-model="addform.navbar_name" />
        </el-form-item>
        <el-form-item label="导航栏图标">
          <el-input v-model="addform.navbar_icon" />
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

    <!-- 编辑导航 -->
    <el-dialog
      title="编辑导航"
      :visible.sync="editFormDialogVisible"
      width="30%"
      center
    >
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editFormDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editData"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { getCategory } from '@/api/category'
import { getNavbar, NavbarSort, addNavbar, deleteNavbar, editNavbar } from '@/api/navbar'
export default {
  data() {
    return {
      addFormDialogVisible: false,
      editFormDialogVisible: false,
      category_list: [],
      addform: {
        pid: undefined,
        show: 1,
        new_tab: 1,
        type: undefined,
        type_id: undefined,
        url: undefined,
        navbar_name: undefined,
        navbar_icon: undefined
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
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      getNavbar().then(res => {
        if (res.code === 200) {
          this.list = res.data
          this.oldList = this.list.map(v => v.id)
          this.newList = this.oldList.slice()
        }
      })
      getCategory().then(res => {
        if (res.code === 200) {
          this.category_list = res.data
          this.tableData = res.data
        }
      })
      this.$nextTick(() => {
        this.setSort()
      })
    },
    // 排序
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
          // 排序操作
          NavbarSort(this.newList).then(res => {
            if (res.code === 200) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    addData() {

    },
    // 获取编辑模态框
    getEditModal(data) {
      this.editForm.id = data.id
      this.editForm.name = data.name
      this.editForm.pid = data.pid
      this.editForm.description = data.description
      this.editForm.alias = data.alias
      this.editFormDialogVisible = true
    },
    // 提交编辑的数据
    editData() {
      editNavbar(this.editForm).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.editFormDialogVisible = false
          this.getData()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style scoped>
.main {
  padding: 32px;
}
</style>
