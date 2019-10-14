<template>
  <div class="main">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>栏目列表</span>
        <span style="float:right">
          <el-button
            type="primary"
            @click="DialogVisible = true"
          >添加栏目</el-button>
        </span>
      </div>
      <el-table :data="tableData">
        <el-table-column
          prop="id"
          label="ID"
        />
        <el-table-column label="序号">
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
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.description }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="别名">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.alias }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="文章">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.article_num }}
            </el-tag>
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
      </el-table>
    </el-card>

    <!-- 添加栏目 -->
    <el-dialog
      title="添加栏目"
      :visible.sync="DialogVisible"
      width="30%"
      center
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="上级">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级"
          >
            <el-option
              label="设置为顶级"
              value="0"
            />
            <el-option
              v-for="item in category_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="别名">
          <el-input v-model="form.alias" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addData"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑栏目 -->
    <el-dialog
      title="编辑栏目"
      :visible.sync="editFormDialogVisible"
      width="30%"
      center
    >
      <el-form
        ref="form"
        :model="editForm"
        label-width="80px"
      >
        <el-form-item label="名称">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="上级">
          <el-select
            v-model="editForm.pid"
            placeholder="请选择上级"
          >
            <el-option
              label="设置为顶级"
              value="0"
            />
            <el-option
              v-for="item in category_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editForm.description" />
        </el-form-item>
        <el-form-item label="别名">
          <el-input v-model="editForm.alias" />
        </el-form-item>
      </el-form>
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
import { getCategory, addCategory } from '@/api/category'
export default {
  data() {
    return {
      DialogVisible: false,
      editFormDialogVisible: false,
      category_list: [],
      form: {
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
      tableData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getCategory().then(res => {
        if (res.code === 200) {
          this.category_list = res.data.data
          this.tableData = res.data.data
        }
      })
    },
    // 提交表单添加栏目
    addData() {
      addCategory(this.form).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.$router.go(0)
        } else {
          this.$message.error(res.message)
        }
      })
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

    }
  }
}
</script>

<style scoped>
.main {
  padding: 32px;
}
</style>
