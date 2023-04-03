<template>
  <ItemMusicTop :playlist="state.playlist" />
  <!-- <ItemMusicTop /> -->
  <itemMusicList
    :itemList="state.songs"
    :subscribedCount="state.playlist.subscribedCount"
  />
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicitem, getMusicList } from "@/request/api/item";
import { ItemMusicTop } from "@/components/item/ItemMusicTop.vue";
import { itemMusicList } from "@/components/item/itemMusicList.vue";
export default {
  // name:'ItemMusic',
  components: {
    ItemMusicTop,
    itemMusicList,
  },
  setup() {
   
    const state = reactive({
      playlist: {}, //歌单的详情页的数据
      songs: [],
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      // console.log(useRoute());
      // console.log(id);
      //   歌单详情页面
      let res = await getMusicitem(id);
      // console.log(res);
      state.playlist = res.data.playlist;
      //   获取所有歌曲
      let result = await getMusicList(id);
      // console.log(result);
      state.songs = result.data.songs;
      //   防止页面刷新，数据丢失，将数据保存到sessionStorage中
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });
    return { state };
  },
};
</script>

<style>
</style>