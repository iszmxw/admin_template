<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
        <span style="float:right">
          <router-link to="/articles/add">
            <el-button type="primary">添加文章</el-button>
          </router-link>
        </span>
      </div>
      <el-table :data="tableData">
        <el-table-column
          prop="id"
          label="ID"
          width="50"
        />
        <el-table-column label="标题" width="350">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.category_name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="浏览量">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.views }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.created_at }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getData"
      />
    </el-card>
  </div>
</template>

<script>
import { getArticleList } from '@/api/articles'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  components: {
    Pagination
  },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getArticleList(this.listQuery).then(res => {
        if (res.code === 200) {
          this.total = res.data.total
          this.tableData = res.data.data
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
