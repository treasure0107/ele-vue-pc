<template>
  <div class="scroll-main clearFix" id="scollBox">
    <ul class="lists  clearFix">
      <li class="list_item " v-for="(item,index) in comeOutData">
        <img :src="item.photo"/>
        <p>{{item.username}}</p>
        <p>买 {{item.num}}</p>
      </li>
    </ul>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  import imgScrool from  "@/scripts/imgScrool";
  export default {
    props: ["comeOutData"],
    data(){
      return {
      }
    },
    updated(){
      imgScrool.switchPhotos('scollBox');
    },
    methods: {},
    components: {}
  }

</script>
<style lang="scss" scoped>
  .scroll-main {
    position: relative;
    width: 1200px;
    height: 168px;
    margin: 0 auto;
    overflow: hidden;
    .lists {
      white-space: nowrap;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .list_item {
        white-space: nowrap;
        float: left;
        text-align: center;
        width: 120px;
        padding: 20px 0;
     /*   cursor: pointer;*/
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        p {
          color: #666;
          margin: 10px 0 0 0;
        }
      }
    }
  }
</style>
