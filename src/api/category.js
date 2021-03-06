import request from '@/utils/request'

// 获取栏目列表
export function getCategory(params) {
  return request({
    url: '/category/category_list',
    method: 'post',
    params
  })
}

// 添加栏目
export function addCategory(data) {
  return request({
    url: '/category/category_add',
    method: 'post',
    data
  })
}

// 删除栏目
export function deleteCategory(data) {
  return request({
    url: '/category/category_delete',
    method: 'post',
    data
  })
}

// 编辑栏目
export function editCategory(data) {
  return request({
    url: '/category/category_edit',
    method: 'post',
    data
  })
}
