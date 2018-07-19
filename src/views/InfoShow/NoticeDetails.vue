<template>
  <div class="container article">
    <p class='title'>{{article.title}}
      <span class='fr'>{{article.createtime}}</span>
    </p>
    <div class='details' v-html='article.content'></div>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        article: {}
      }

    },
    mounted(){
      try {
        let url = baseUrl + "/Article/getArticleDetail";
        let config = {
          method: "POST",
          url: url + "?r=" + Math.random(),
          data: {id: this.$route.query.id}
        };
        this.$axios(config).then(result => {
          if (until.responesValidate(result)) {
            console.log(result)
            this.article = result.data.data
          }
        });
      } catch (ex) {
        until.consoleLog(ex);
      }
    },
    methods: {},
    components: {}
  }

</script>

<style lang="scss" scoped>
  div.article {
    padding: 56px 60px;
    p.title {
      font-weight: bold;
      font-size: 24px;
      font-family: MicrosoftYaHei-Bold;
      color: #333;
      line-height: 60px;
      span {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #999;
        line-height: 60px;
      }
    }
    .details {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: #333;
      line-height: 20px;
      /deep/ p {
        line-height: 30px;
        text-align: left;
      }
      /deep/ img {
        padding: 5px 0;
      }
    }
  }
</style>
