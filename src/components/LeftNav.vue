<template>
  <div class="left-nav">
    <div class="msg-box clearFix" v-if="userInfo!=null">
      <img :src="userInfo.avatar" alt="" class="head"/>
      <div class="user-msg">
        <span class="tel" v-text="userInfo.username" :title="userInfo.username"></span>
        <span class="id">ID&nbsp;{{userInfo.uuid}}</span>
      </div>
    </div>
    <ul class="nav-item">
      <li>
        <router-link to="/Account">账户总览</router-link>
      </li>
      <li>
        <router-link to="/CollectSet">收款设置</router-link>
      </li>
      <!--      <li>
              <router-link to="/OrderList">订单列表</router-link>
            </li>-->
      <!--  <li>
          <router-link to="/AppeaLine">发起申诉</router-link>
        </li>-->
<!--      <li>
        <router-link to="/RecordList">交易记录</router-link>
      </li>-->
      <li>
        <router-link to="/InviteFriends">邀请好友</router-link>
      </li>
      <li>
        <router-link to="/AccountSet">账户设置</router-link>
      </li>
    </ul>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        tabIndex: 1,
        userInfo: null
      }
    },
    mounted(){
      if (window.localStorage.getItem("UserInfo")) {
        let userNews = JSON.parse(window.localStorage.getItem("UserInfo"));
        this.userInfo=userNews.userinfo
      }

      var orignalSetItem = localStorage.setItem;
      localStorage.setItem = function(key,newValue){
      		var setItemEvent = new Event("setItemEvent");
      		setItemEvent.newValue = newValue;
      		setItemEvent.key=key;
      		window.dispatchEvent(setItemEvent);
      		orignalSetItem.apply(this,arguments);
      }
      window.addEventListener("setItemEvent",(obj) =>{
      	if(obj.key=="UserInfo"){//判断是否UserInfo
      		this.userInfo.avatar=JSON.parse(obj.newValue).userinfo.avatar;
      	}
      });
    },
    methods: {
      swichTab(_index){
        if (_index) {
          this.tabIndex = _index;
        }
      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  @import "./../styles/mixin";

  .left-nav {
    background-color: #f2f6fe;
    width: 220px;
    height: 100%;
    .msg-box {
      padding: 25px 0;
      width: 155px;
      margin: 0 auto;
      img.head, .user-msg {
        float: left;
      }
      img.head {
        border-radius: 50%;
        width: 42px;
        height: 42px;
      }
      .user-msg {
        width: 90px;
        padding-left: 6px;
        span {
          display: inline-block;
          text-align: left;
          height: 22px;
          line-height: 22px;

        }
        span.tel {
          @include sc(14px, #333333);
          width: 100%;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        span.id {
          @include sc(12px, #333333);
        }
      }
    }
    ul.nav-item {
      li {
        height: 55px;
        line-height: 55px;
        text-align: center;
        @include sc(16px, #333333);
      }
      a.router-link-active {
        background-color: #ffffff;
        border-left: 4px solid #5357e2;
        display: block;
        height: 55px;
        line-height: 55px;
        color: #5357e2;
      }
    }
  }
</style>
