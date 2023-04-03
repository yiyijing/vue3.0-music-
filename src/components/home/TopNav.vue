<template>
  <div class="topnav">
    <div class="left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caidan"></use>
      </svg>
    </div>
    <div class="center">
        <span @click="$router.push('/infoUser')">我的</span>
        <span class="active">发现</span>
        <span>云衬</span>
        <span>视频</span>
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-search"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
};
</script>

<style lang="less">
.topnav{
    width: 100%;
    height: 1rem;
    padding: .2rem;
    display: flex;
    justify-content: space-between;
    .center{
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        font-size: .36rem;
        .active{
            font-weight: 900;
        }
    }
}
</style>