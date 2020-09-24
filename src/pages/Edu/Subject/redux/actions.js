// 定义了一堆的方法

import {reqGetSubject,reqGetSecSubject,reqUpdateSubject,reqDelSubject} from '@api/edu/subject'

import {GET_SUBJECT_LIST,GET_SEC_SUBJECT_LIST,UPDATE_SUBJECT_LIST,DEL_SUBJECT_LIST} from './constants'

// 请求一级分类课程数据
const getSubjectListSync = (list) =>({
  type:GET_SUBJECT_LIST,
  data:list
})

export const getSubjectList = (page,limit) =>{
  return (dispatch) =>{
    return reqGetSubject(page,limit)
      .then((response)=>{
        dispatch(getSubjectListSync(response))
        return response.total
      })
  }
}

// 请求二级课程分类数据

const getSecSubjectListSync = (list) =>({
  type:GET_SEC_SUBJECT_LIST,
  data:list
})

export const getSecSubjectList = (parentId) =>{
  return (dispatch) =>{
    return reqGetSecSubject(parentId)
      .then((response)=>{
        dispatch(getSecSubjectListSync(response))
        return response.total
      })
  }
}

// 更新课程
const updateSubjectListSync = (data) => ({
  type:UPDATE_SUBJECT_LIST,
  data
})

export const updateSubjectList = (id,title) =>{
  return (dispatch) =>{
    return reqUpdateSubject(id,title)
      .then((response)=>{
        dispatch(updateSubjectListSync({id,title}))
        return response.title
      })
  }
}

// 删除课程
const delSubjectListSync = (data) =>({
  type:DEL_SUBJECT_LIST,
  data
})

export const delSubjectList = (id) =>{
  return (dispatch)=>{
    return reqDelSubject(id)
      .then((response)=>{
        dispatch(delSubjectListSync(id))
        return response.total
      })
  }
}
