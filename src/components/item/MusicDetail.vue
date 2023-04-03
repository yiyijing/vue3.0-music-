<template>
  <img :src="musiclist.al.picUrl" alt="" class="bgimg" />
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon" aria-hidden="true" @click="backHom">
        <use xlink:href="#icon-xitongfanhui"></use>
      </svg>
      <div>
        <!-- <p>{{ musiclist.al.name }}</p> -->
        <Vue3Marquee style="color: #fff">{{ musiclist.al.name }}</Vue3Marquee>
        <span v-for="(item, i) in musiclist.ar" :key="item">{{
          item.name
        }}</span>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-xiangyou"></use>
        </svg>
      </div>
    </div>
    <div class="detailRight">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-fenxiang1"></use>
      </svg>
    </div>
  </div>
  <!-- 圆圈 -->
  <div class="detailContent" v-show="!isLyricShow">
    <!-- 指针 -->
    <img
      src="@/assets/needle-ab.png"
      alt=""
      class="img_needle"
      :class="{ img_needle_active: isbtnShow }"
    />
    <img src="@/assets/cd.png" alt="" class="img_cd" />
    <!-- 动态图片 -->
    <img
      :src="musiclist.al.picUrl"
      alt=""
      class="img_ar"
      @click="isLyricShow = true"
      :class="{ img_ar_active: isbtnShow, img_ar_pauesd: !isbtnShow }"
    />
  </div>
  <!-- 歌词 -->
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
    <p v-for="item in lyric" :key="item" :class="{active:currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,}">{{ item.lrc }}</p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiai"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-tianchongxing-"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xinxi"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gl-repeatInfinite2"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input
        type="range"
        class="range"
        min="0"
        :max="duration"
        v-model="currentTime"
        step="0.05"
      />
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-24gf-previousSquare"></use>
      </svg>
      <svg
        class="icon bofang"
        aria-hidden="true"
        v-if="!isbtnShow"
        @click="play"
      >
        <use xlink:href="#icon-24gf-playCircle"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else-if="isbtnShow" @click="play">
        <use xlink:href="#icon-24gf-pauseCircle"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-24gf-nextSquare"></use>
      </svg>
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-menu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import { computed, watch,onMounted } from "vue";
import { useStore } from "vuex";
import "vue3-marquee/dist/style.css";
import { ref ,reactive} from "vue";

// import e from "express";
export default {
  props: ["musiclist", "palymusic", "isbtnShow","addDuration"],
  components: {
    Vue3Marquee,
  },
  setup(props, context) {
    // console.log(props);
    const store = useStore();
    let musiclist = computed(()=>{
      return props.musiclist
    });
    let play = computed(() => {
      return props.palymusic;
    });
  
    let isLyricShow = ref(null);
    let musicLyric=ref(null)
    let isbtnShow = computed(() => {
      return props.isbtnShow;
    });
    let duration = computed(()=>{
      return store.state.duration
    });
    // onMounted(()=>{
    //   duration()
    //   console.log(duration);
    // })
    // 获取state数据
    let playList = computed(() => store.state.playList);
    const playListIndex = computed(() => store.state.playListIndex);
    let lyricList = computed(() => store.state.lyricList);
    let currentTime=computed(() => store.state.currentTime);
    // console.log(currentTime.isRef());
    function backHom(){
      isLyricShow.value=false
      // console.log(isLyricShow.value);
      store.commit("updateDetailShow")
    }
    function goPlay(num){
      let index=playListIndex.value+num
      // console.log(playListIndex.value);
      // console.log(111);
      if(index<0){
        index=playList.value.length-1
      }else if(index==playList.value.length){
        index=0
      }
      store.commit("updatePlayListIndex",index)
    }
    // 歌词
    let lyric = computed(() => {
      let arr;
      if (lyricList.value.lyric) {
        arr = lyricList.value.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc=item.slice(11)
          let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
          if(isNaN(Number(lrc))){
            mill = item.slice(7, 9);
            lrc=item.slice(11)
            time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
          }
          return {min,sec,mill,lrc,time}
        });
        arr.forEach((item,i)=>{
          if(i===arr.length-1 || isNaN(arr[i + 1].time)){
            item.pre=100000
          }else{
            item.pre=arr[i+1].time
          }
        })
      }
      // console.log(arr);
      return arr
    });
    // 监视歌曲时间变化
    watch(currentTime,(newvalue,oldvalue)=>{
      let p = document.querySelector("p.active");
      if(p){
        if(p.offsetTop>300){
        musicLyric.value.scrollTop=p.offsetTop-300
      }
      };
      // console.log(playListIndex.value+1);
      // console.log(playList.length);
      // 当数据等于播放器的长度
      if(newvalue===duration.value){
        // console.log(playList);
        // 判断歌曲是否为最后一首歌曲，是：播放第一首，也就是循环
        if(playListIndex.value==playList.value.length-1){
          store.commit("updatePlayListIndex",0)
          play()
        }else{
          store.commit("updatePlayListIndex",playListIndex.value+1)
        }
        // play
      }
    })
    // console.log(props.musiclist);
    // console.log(lyric);
    return { musiclist, play, isbtnShow, isLyricShow, lyricList, lyric ,currentTime,musicLyric,backHom,playList,playListIndex,goPlay,duration};
  },
};

</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  p {
    color: rgb(190, 181, 181);
    margin-bottom: 0.3rem;
  }
  .active {
    color: #fff;
    font-size: 0.5rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>