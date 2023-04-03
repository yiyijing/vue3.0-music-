import { createStore } from 'vuex'
import {getLydrice} from '@/request/api/home'
import {getPheno} from '@/request/api/home'

export default createStore({
  state: {
    playList: [{ //播放列表
      al: {
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      id: 1446137141,
      name: "雨爱（抖音版）",
      ar: [{ name: "灏灏灏仔" }]
    }],
    isShowplay: false,
    playListIndex: 0, //默认下标为0
    DetailShow:false ,  //详情页的设置
    lyricList:{},      //歌词
    currentTime:0,   //当前时间
    duration:0,      //总时长
    isLogin:false,    //是否登录
    footermusicshow:true     //是否显示底部组件
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow: function (state, value) {
      state.isShowplay = value
    },
    pushPlayList: function (state, value) {
      state.playList.push(value)
      state.playListIndex=state.playList.length-1
    },
    updatePlayList: function (state, value) {
      state.playList = value
      //console.log(state.playList);
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
    },
    updateDetailShow: function (state) {
      state.DetailShow = !state.DetailShow
    },
    updateLyricList: function (state, value) {
      state.lyricList = value
    },
    updateCurrentTime: function (state, value) {
      // console.log(state.currentTime);
      state.currentTime = value
    },
    updateDuration: function (state, value) {
      state.duration = value
      // console.log(state.duration);
    },
    updateIsLogin: function (state, value) {
      state.isLogin = true
    },
    updateToken: function (state, value) {
      state.token = value
      localStorage.setItem('token', state.token)
    },
    updateUser: function (state, value) {
      state.user = value
    }
  },
  actions: {
    getLydrice:async function(context,value){
      let result =await getLydrice(value)
      // console.log(result);
      context.commit('updateLyricList',result.data.lrc)
    },

    async getLogin(context,data){
      let result=await getPheno(data)
      return result
    }
  },
  
  modules: {
  }
})
