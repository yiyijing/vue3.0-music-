<template>
  <div class="searchtop">
    <svg class="icon liebiao" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-xitongfanhui"></use>
    </svg>
    <input
      type="text"
      placeholder="陈奕迅"
      v-model="searchKey"
      @keydown.enter="enterKey"
    />
  </div>
  <div class="searchHistory">
    <p class="searchspan">历史</p>
    <span
      class="spanKey"
      v-for="(item, index) in keywordList"
      :key="index"
      @click="searchHistory(item)"
      >{{ item }}</span
    >
    <svg class="icon liebiao" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item, i) in data.searchlist" :key="i">
      <div class="itemLeft" @click="updataIndex(item)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.ar" :key="index">{{
            item1.name
          }}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0">
          <use xlink:href="#icon-bofangqi-bofangxiaodianshi"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-list"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
// import { log } from 'console';

import { getMusicSearch } from "@/request/api/home";
import store from "@/store";
import { defineComponent, reactive, ref, onMounted } from "vue";
export default defineComponent({
  setup() {
    // 关键字
    let keywordList = reactive([]);
    let data = reactive({
      searchlist: [],
    });
    let searchKey = ref("");
    // 按下搜索的回车键触发函数
    // console.log(keywordList);
    async function enterKey() {
      if (searchKey.value !== "") {
        // console.log(keywordList);
        // keywordList.push(...[searchKey.value]);
        // // 数组去重
        if (keywordList.includes(searchKey.value)) {
          keywordList.splice(keywordList.indexOf(searchKey.value), 1);
        }
        keywordList.unshift(searchKey.value);
        if (keywordList.length > 10) {
          keywordList.splice(keywordList.length - 1, 1);
        }
        let result = await getMusicSearch(searchKey.value);
        // console.log(result);
        data.searchlist = result.data.result.songs;
        // keywordList.push(...item);
        // keywordList = [...new Set(keywordList)];
        // console.log(...new Set(keywordList));
        localStorage.setItem("keywordList", JSON.stringify(keywordList));
        searchKey.value = "";
      }
    }
    // console.log(keywordList);
    // console.log(item);
    // 初始化就获取历史列表
    onMounted(() => {
      let arr = JSON.parse(localStorage.getItem("keywordList")) || [];
      keywordList.push(...arr);
      // keywordList=JSON.parse(localStorage.getItem("keywordList")) || []
    });
    // 删除缓存中的数据
    function delHistory() {
      localStorage.removeItem("keywordList");
      // 清空数据
      // 还是代理的问题，你用recative代理的空间通过 keywordList = [] 没有销毁 里边还有数据 所以 页面还有数据
      keywordList.splice(0, keywordList.length);
    }
    // onUpdated(()=>{
    //   delHistory()
    // })

    // 搜索列表
    async function searchHistory(item) {
      let result = await getMusicSearch(item);
      console.log(result);
      data.searchlist = result.data.result.songs;
    }

    // 播放音乐的列表
    function updataIndex(item,i){
      store.commit("pushPlayList",item)

    }
    // console.log(data.searchlist);
    return {
      keywordList,
      searchKey,
      enterKey,
      delHistory,
      data,
      searchHistory,
      updataIndex
    };
  },
});
</script>

<style lang="less" scoped>
.searchtop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchspan {
    font-size: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    background-color: rgb(185, 169, 169);
    display: inline-block;
  }
  .icon {
    width: 0.5rem;
    height: 0.5rem;
    right: 0.3rem;
    position: absolute;
  }
}
.itemList {
  width: 100%;
padding: .2rem;
  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .itemLeft {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;

      .leftSpan {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
      }

      div {
        p {
          width: 4.54rem;
          height: 0.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }

        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }

        margin-left: 0.3rem;
      }
    }

    .itemRight {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;

      .icon {
        fill: #999;
      }

      .bofang {
        position: absolute;
        left: 0;
      }

      .liebiao {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>