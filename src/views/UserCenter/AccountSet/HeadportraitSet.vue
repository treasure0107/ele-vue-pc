<template>
  <div>
    <div class="head-photo-con clearFix">
      <el-upload
        class="avatar-uploader"
        :action="upLoadImg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="avatar-uploader-icon">
          <span class="add-icon"><span class="add-sign">+</span>添加图片</span>
          <span class="text-icon">只支持JPG、PNG，大小不超过5M</span>
        </i>
      </el-upload>
      <div class="photo-list">
        <p class="preview-tit">预览</p>
        <div class="item-one item"><img :src="avatarImg" alt=""></div>
        <p class="item-tit">80*80</p>
        <div class="item-two item"><img :src="avatarImg" alt=""></div>
        <p class="item-tit">60*60</p>
        <div class="item-three item"><img :src="avatarImg" alt=""></div>
        <p class="item-tit">40*40</p>
      </div>
    </div>
    <footer slot="footer" class="dialog-footer">
      <el-button @click="editAvatarBack">取 消</el-button>
      <el-button type="primary" v-dbClick @click="saveHeadPhoto">保 存</el-button>
    </footer>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        imageUrl: '',
        dialogHeadPortraitVisible: false,
        avatarImg: '',
        upLoadImg: baseUrl + "Common/upload"
      }
    },
    mounted(){
      if (window.localStorage.getItem("UserInfo")) {
        let userNews = JSON.parse(window.localStorage.getItem("UserInfo"));
        this.avatarImg = userNews.userinfo.avatar;
      }
//      until.getUserInfo((result) => {
//        if (result.data["nickname"]) {
//          if (result.data) {
//            let userInfo = result.data;
//            if (userInfo.avatar) {
//              this.avatarImg = userInfo.avatar;
//            }
//          }
//        }
//      });
    },
    methods: {
      formValidate(){
          if (this.imageUrl.length == 0) {
            this.$message({
              showClose: true,
              duration: 4000,
              message: '上传图片不能为空！',
              type: 'error'
            });
            return false;
          }
        return true;
      },
      saveHeadPhoto(){  //保存
        try {
          if (this.formValidate()) {
            let url = baseUrl + "account/account/uploadimg";
            let imageurl = this.avatarImg;
            let config = {
              method: "POST",
              url: url + "?r=" + Math.random(),
              data: {
                imageurl: imageurl,
                width: '',
                height: ''
              }
            };
            this.$axios(config).then(res => {
              if (res.data.code) {
                this.$message({
                  type: "success",
                  duration: 1000,
                  message: "保存成功！",
                  onClose: () => {
                    this.$emit('sendEditAvatar', 'true');
                    this.imageUrl='';  //上传成功清空
                    /* setTimeout(()=>{
                      location.reload()
                    },300) */
                  }
                });
              } else {
                this.$message({
                  showClose: true,
                  duration: 3000,
                  message: res.data.msg || '操作失败！',
                  type: 'error'
                });
              }
            });

          }
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      editAvatarBack(){   //取消
        this.$emit('sendEditAvatar', 'true')
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.avatarImg = res.data.url;
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
        let isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  @import "../../../styles/mixin";

  .head-photo-con {
    .avatar-uploader {
      width: 438px;
      height: 304px;
      float: left;
      text-align: center;
      line-height: 300px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      display: inline-block;
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      color: #8c939d;
      width: 438px;
      height: 304px;
      background: rgba(246, 246, 246, 1);
      /*line-height: 304px;*/
      text-align: center;
      .add-icon {
        display: inline-block;
        width: 117px;
        height: 29px;
        line-height: 29px;
        background: rgba(255, 255, 255, 1);
        border-radius: 15px;
        box-shadow: 6px 0px 10px rgba(140, 140, 140, 0.23);
        margin-top: 116px;
        .add-sign {
          color: #2E6AF4;
          font-size: 22px;
          font-weight: bold;
          margin-right: 8px;
          line-height: 26px;
          position: relative;
          top: 1px;
        }
      }
      .text-icon {
        width: 100%;
        height: 11px;
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        display: block;
        text-align: center;
        padding-top: 10px;
      }
    }
    .avatar {
      width: 178px;
      /*height: 178px;*/
      display: block;
    }
    .photo-list {
      float: left;
      width: 110px;
      height: 304px;
      background: rgba(246, 246, 246, 1);
      margin-left: 34px;
      text-align: center;
      .preview-tit, .item-tit {
        margin-top: 8px;
        font-size: 12px;
      }
      .item {
        margin-top: 10px;
        background-color: #fff;
        border-radius: 100%;
        display: inline-block;
        img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }
      .item-one {
        width: 80px;
        height: 80px;
      }
      .item-two {
        width: 60px;
        height: 60px;
      }
      .item-three {
        width: 40px;
        height: 40px;
      }
    }
  }

</style>
<style>
  .head-photo-modal .el-dialog__title {
    font-weight: bold;
    font-size: 20px;
    color: #333;
  }

  .head-photo-modal .dialog-footer {
    text-align: center;
    margin-top: 30px;
  }

  .head-photo-modal .el-button {
    width: 180px;
    height: 39px;
    border-radius: 20px;
    margin-right: 30px;
  }

  .head-photo-modalmain .el-button--default {
    border: 1px solid #999;

    color: #333;
  }

  .head-photo-modal .el-button--primary {
    background-color: #2E6AF4;
  }
</style>
