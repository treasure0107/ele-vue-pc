<template>
  <div class="container contact">
    <h1>提交请求</h1>
    <div class='form'>
      <el-form :model="form" label-width="100px" :rules="rules" ref="form" >
        <el-form-item label="邮件地址" prop="email">
          <el-input v-model="form.email" placeholder='请输入邮件'></el-input>
        </el-form-item>
        <el-form-item label="问题分类" prop='type'>
          <el-select v-model="form.type" placeholder="请选择投资问题" height='60px;' style="width:500px;">
            <el-option v-for="(item,index) in contactType" :key='index' :value='item'>{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述" prop='content'>
          <el-input type="textarea" v-model="form.content" :rows="6" placeholder='请输入问题描述,字数在20-500之间'></el-input>
        </el-form-item>
        <el-form-item label="附件上传" prop="imgs">
          <el-upload  accept="image/gif, image/jpeg,image/jpeg,.docx,.doc,.xls,.xlsx,.pdf,"
            class="upload-demo"
            list-type="picture"
            drag
            :action='url'
            multiple
            ref="upload"
            :on-success="upload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png/docx/doc/xls/xlsx/pdf文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="图形验证码" prop='imgcode'>
          <el-col :span='19'>
            <el-input v-model="form.imgcode" style="width:100%" placeholder="图形验证码" maxlength="4"></el-input>
          </el-col>
          <el-col :span='5'>
            <img :src="imgUrl" style="width:100%;height:40px;cursor: pointer;" alt="" class="img-code"
                 @click="changeImgCode()"/>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button v-dbClick type="primary" round style="width:180px;" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      var validateEmail = (rule, value, callback) => {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (value === '') {
          callback(new Error('请输入邮箱地址！'));
        } else if (!reg.test(value)) {
          callback(new Error('邮箱格式不正确！'));
        } else {
          callback();
        }
      };
  /*    var beforeAvatarUpload = function (file) {
        if (!/^image\/(jpeg|png)$/.test(file.type)) {

        }
      }*/
      return {
        url: baseUrl + '/Common/upload',
        imgUrl: '',
        contactType: [],
        form: {
          email: '',
          type: '',
          content: '',
          imgs: [],
          imgcode: '',
          imgkey: ''
        },
        rules: {
          email: [
            {required: true,validator: validateEmail, trigger: 'blur'},
          ],
          type: [
            {required: true, message: '请选择问题类型！', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入问题描述！', trigger: 'blur'},
            { min: 20, max: 200, message: '长度在 20 到 200 个字符', trigger: 'blur' }

          ],
          imgcode: [
            {required: true, message: '请输入验证码！', trigger: 'blur'}
          ],
         /*  imgs: [
            {required: true, message: '请选择附件上传！', trigger: 'blur'}
          ] */
        }
      }
    },
    mounted(){
      this.getContactType()
      this.getImgCode()
    },
    methods: {
      //上传图片
      upload(response){
        this.form.imgs.push(response.data.url);
      },
      //验证码
      getImgCode(){
        try {
          let url = baseUrl + "/common/getcaptcha";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random(),
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              this.imgUrl = result.data.data.imguri
              this.form.imgkey = result.data.data.imgkey
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      //切换验证码
      changeImgCode(){
        this.getImgCode()
      },
      //提交
      submitForm(formName){
        //this.$refs.upload.clearFiles()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            try {
              let url = baseUrl + "/Article/getUpMessage";
              let config = {
                method: "POST",
                url: url + "?r=" + Math.random(),
                data: {
                  email: this.form.email,
                  type: this.form.type,
                  content: this.form.content,
                  imgs: this.form.imgs,
                  imgcode: this.form.imgcode,
                  imgkey: this.form.imgkey
                }
              };
              this.$axios(config).then(result => {
                if (until.responesValidate(result)) {
                  if (result.data.code == 1) {
                    this.$refs.upload.clearFiles()
                    this.clearForm()
                    this.$message({
                      message: '信息提交成功',
                      type: 'success'
                    });
                    this.changeImgCode()
                  }

                }
              });
            } catch (ex) {
              until.consoleLog(ex);
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },
      //问题分类
      getContactType(){
        try {
          let url = baseUrl + "/Article/getContactType";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random(),
            data: {id: this.$route.query.id}
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              this.contactType = result.data.data
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      //清空表单
      clearForm(){
        this.form.email = ''
        this.form.type = ''
        this.form.content = ''
        this.form.imgcode = ''
      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  /deep/ .el-upload-dragger {
    width: 500px;
  }

  div.contact {
    padding: 56px 99px;
    h1 {
      font-size: 24px;
      font-family: MicrosoftYaHei-Bold;
      color: #333;
      line-height: 20px;
      height: 24px;
    }
    div.form {
      width: 600px;
      margin-top: 46px;
    }
  }
</style>
