<template>
  <div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/OrderList' }">订单列表</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      <el-breadcrumb-item>申诉</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="warp">
      <h2 class="title">申诉信息</h2>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">姓名：<span>海飞丝</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light">对方：<span>ID</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">电话：<span>12321321321</span></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">姓名：<span>海飞丝</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light">对方：<span>ID</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">电话：<span>12321321321</span></div></el-col>
      </el-row>
    </div>
    <div class="center-main">
      <div class="formWarp">
        <el-form :model="appealForm" ref="appealForm" label-width="100px"
                 label-position="right" :rules="rules" class="register-form">

          <el-form-item label="申诉订单号" prop="appealOrder">
            <el-input style="margin-left: 70px;" v-model="appealForm.appealOrder" placeholder="请填入申诉订单号" name="appealOrder" id="appealOrder"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="appealType" style="margin-top:40px;">
            <el-select v-model="appealForm.appealType" placeholder="请选择" style="margin-left:70px;width: 100%">
              <el-option
                v-for="item in appealForm.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="问题描述" prop="describe" style="margin-top:40px;">
            <el-input
              style="margin-left:70px;"
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="appealForm.describe">
            </el-input>
          </el-form-item>
          <el-form-item label="上传凭证" prop="fileList" style="margin-top:40px;">
            <el-upload
              style="margin-left:70px;width: 464px"
              class="upload-demo"
              action="baseUrl"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleAvatarSuccessFront"
              :before-upload="beforeAvatarUpload"
              multiple
              :limit="3"
              :file-list="appealForm.fileList">
              <el-button style="width: 100%">上传凭证截图（JPG/PNG,不超过5M）</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="" prop="" style="padding-left: 70px;margin-top: 50px">
            <el-button type="primary" round size="long" @click="submitForm('appealForm')">确定上传</el-button>
            <el-button round style="margin-left: 40px" size="long">取消上传</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
//  import {baseUrl} from "../../config/env";
  export default {
    data(){
      return {
        appealForm: {
          appealOrder: '',
          appealType: '',
          describe: '',
          options: [{
            label: '对方无应答',
            value: 1
          },{
            label: '请求不通',
            value: 1
          }],
          fileList: [{name: 'food.jpeg', url: ''},
                    {name: 'food2.jpeg', url: ''}],
        },
        rules: {
          appealOrder: [
            { required: true, message: '请输入申诉单号', trigger: 'blur' }
          ],
          appealType: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          describe: [
            { required: true, message: '请输入简单的描述', trigger: 'blur' }
          ],
          fileList: [
            { required: true, message: '请上传照片', trigger: 'change' }
          ],
        },
        uploadPath: '/ToolkitApi/Upload',
      }

    },
    mounted(){
    },
    methods: {
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg')||(file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 8;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 8MB!');
        }
        return isJPG && isLt2M;
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleRemove(file, fileList) {
        console.log(file);
      },
      handleAvatarSuccessFront(res, file) {
        this.CardFrontFileUrl=URL.createObjectURL(file.raw);
        this.CardFrontFileName=res.Data.FileName;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            setInterval(function () {
              var cls = document.getElementsByClassName('el-form-item__error');
              for (var i=0; i<cls.length; i++)
              {
                cls[i].style.left = '70px'
              }
            },10)
            return false
          }
        });
      },
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  .formWarp{
    margin-top: 48px;
    width: 60%;
    padding-left: 50px;
  }
  .el-button.is-round {
    padding: 12px 46px!important;
  }
  .el-col {
    margin-top: 15px;
  }
  .title {
    font-size: 14px;
  }
  .warp {
    width: 90%;
    background: #F6F6F6;
    padding: 35px 20px;
    margin-top: 40px;
  }
</style>
