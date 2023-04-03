<template>
  
  <router-view/>
  <FooterMusic v-if="footermusicshow"/>
</template>
<script>
import FooterMusic from "@/components/item/footMuisic"
import { useStore } from "vuex";
import { computed } from 'vue'
export default {
  components:{
    FooterMusic
  },
  setup() {
    const store = useStore();
   let footermusicshow=computed(()=>store.state.footermusicshow)
  //  let isbtnShow = computed(() => store.state.isShowplay);
  
  // if($router.push("/logn"))
  //  console.log(footermusicshow);
  //  console.log($router.push("/logn"));
   return {footermusicshow}
  }
}
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  width: 98%;
  height: 98%;
}
.icon{
  width: .5rem;
  height: .5rem;
}
a{
  color: black;
}
</style>
