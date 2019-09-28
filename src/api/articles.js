import request from '@/utils/request'

export function getArticleList(data) {
  return request({
    url: '/article/article_list',
    method: 'post',
    data
  })
}
