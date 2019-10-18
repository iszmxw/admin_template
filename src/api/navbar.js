import request from '@/utils/request'

// 获取导航栏列表
export function getNavbar(params) {
  return request({
    url: '/navbar/navbar_list',
    method: 'post',
    params
  })
}

// 导航栏排序
export function NavbarSort(data) {
  return request({
    url: '/navbar/navbar_sort',
    method: 'post',
    data
  })
}

// 添加导航栏
export function addNavbar(data) {
  return request({
    url: '/navbar/navbar_add',
    method: 'post',
    data
  })
}

// 删除导航栏
export function deleteNavbar(data) {
  return request({
    url: '/navbar/navbar_delete',
    method: 'post',
    data
  })
}

// 编辑导航栏
export function editNavbar(data) {
  return request({
    url: '/navbar/navbar_edit',
    method: 'post',
    data
  })
}
