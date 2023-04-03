<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="playdetail">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <svg
        class="icon liebiao"
        aria-hidden="true"
        @click="palymusic"
        v-if="!isbtnShow"
      >
        <use xlink:href="#icon-24gf-playCircle"></use>
      </svg>
      <svg
        class="icon liebiao"
        aria-hidden="true"
        @click="palymusic"
        v-else-if="isbtnShow"
      >
        <use xlink:href="#icon-24gf-pauseCircle"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-menu"></use>
      </svg>
    </div>
    <audio
      ref="musicaudio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup v-model:show="DetailShow" position="bottom" :style="{ height: '100%',height:'100%' }" >
      <MusicDetail :musiclist="playList[playListIndex]" :palymusic="palymusic" :isbtnShow="isbtnShow" :addDuration="addDuration"/>
    </van-popup>
  </div>
</template>

<script>
import MusicDetail from "@/components/item/MusicDetail.vue"
import { useStore } from "vuex";
import { computed,onUpdated,onMounted} from "vue";
import { ref,watch} from "vue";
// import { log } from "console";
// import mitt from "@/hooks"
export default {
  setup() {
    const store = useStore();
    // 获取state数据
    let playList = computed(() => store.state.playList);
    const playListIndex = computed(() => store.state.playListIndex);
    let isbtnShow = computed(() => store.state.isShowplay);
    let DetailShow = computed(() => store.state.DetailShow);
    
    let interval=ref(0)
    // 获取audio标签
    let musicaudio = ref(null);
    // let duration=ref()
    // 点击哪个播放按钮
    function palymusic() {
      if (isbtnShow) {
        musicaudio.value.play();
        store.commit("updateIsbtnShow", true);
        updataTime()
      } else {
        musicaudio.value.pause();
        store.commit("updateIsbtnShow", false);
        clearInterval(interval)
      }
      isbtnShow = !isbtnShow;
    }
    // console.log(musicaudio);
    function playdetail(){
      store.commit("updateDetailShow")
    }
    // 实现实时更新进度条
    function updataTime(){
      interval= setInterval(()=>{
        store.commit("updateCurrentTime",musicaudio.value.currentTime)
      },1000)
    }
    function addDuration(){
      store.commit("updateDuration",musicaudio.value.duration)
        // console.log(musicaudio.value.duration);
    }
    watch(playListIndex,(newvalue,oldvalue)=>{
      // 如果发生改变就自动播放音乐
      musicaudio.value.autoplay=true;
      // 如果是暂停状态，就改变图标
      if(musicaudio.value.pause){
        store.commit("updateIsbtnShow",true)
      }
    })
    // 监视是否从列表选择歌曲
    watch(playList,(newvalue,oldvalue)=>{
      if(isbtnShow){
        musicaudio.value.autoplay=true;
        store.commit("updateIsbtnShow",true)
        updataTime()
      }
    }),

    // function addDuration(){
    //   store.commit("updateDuration",musicaudio.value.duration)
    //   console.log(musicaudio.value.duration);
    // }
    onMounted(()=>{
      store.dispatch("getLydrice",playList.value[playListIndex.value].id)
      // 开启定时器
      // updataTime()
      addDuration()

    })
    onUpdated(()=>{
      store.dispatch("getLydrice",playList.value[playListIndex.value].id)
      addDuration()
      
    })
    return {
      musicaudio,
      playList,
      playListIndex,
      isbtnShow,
      DetailShow,
      MusicDetail,
      palymusic,
      playdetail,
      updataTime,
      interval,
      addDuration,
    };
  },
};
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    width: 25%;
    height: 100%;
    padding: 0.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>
