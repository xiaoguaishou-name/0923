import {reqAllCourse} from '@api/edu/course'
import {reqGetChapterList} from '@api/edu/chapter'
import {reqGetLessonList} from '@api/edu/lesson'
import {GET_ALL_COURSE,GET_CHAPTER_LIST,GET_LESSON_LIST} from './constants'

// 请求所有课程列表数据
function getCourseListSync(data){
  return{
    type:GET_ALL_COURSE,
    data
  }
}

export function getCourseList(){
  return dispatch =>{
    reqAllCourse().then((res)=>{
      dispatch(getCourseListSync(res))
    })
  }
}

// 请求章节分页列表数据

function getChapterListSync(data){
  return {
    type:GET_CHAPTER_LIST,
    data
  }
}

export function getChapterList(courseId){
  return dispatch =>{
    reqGetChapterList(courseId).then((res)=>{
      dispatch(getChapterListSync(res))
    })
  }
}

// 章节所有课时列表数据请求

function getLessonListSync(data){
  return{
    type:GET_LESSON_LIST,
    data
  }
}

export function getLessonList(chapterId){
  return dispatch =>{
    reqGetLessonList(chapterId).then((res)=>{
      dispatch(getLessonListSync({res,chapterId}))
    })
  }
}