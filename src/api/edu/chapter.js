import request from '@utils/request'

const BASE_URL = "/admin/edu/chapter"

// 获取章节分页列表数据

export function reqGetChapterList(courseId){
  return request({
    url:`${BASE_URL}/1/5`,
    method:"GET",
    params:{
      courseId
    }
  })
}