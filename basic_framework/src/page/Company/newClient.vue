<template>
  <div>
      <van-nav-bar
        title="公司"
        right-text="保存"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"/>

        <van-field
        required
        clearable
        v-model="getShortName"
        rows="1"
        autosize
        label="简称:"
        type="textarea"
        placeholder="请输入"/>

        <van-field
        required
        clearable
        v-model="getFullName"
        rows="1"
        autosize
        label="全称:"
        type="textarea"
        placeholder="请输入"/>

        <van-field
        clearable
        v-model="getAddress"
        rows="1"
        autosize
        label="地址:"
        type="textarea"
        placeholder="请输入"/>

        <van-row type="flex" justify="center" class="table">
            <van-col span="4">
                <div class="middle">标签</div>
            </van-col>
            <van-col span="20"></van-col>
        </van-row>

        <van-row type="flex" justify="center" class="table2">
            <van-col span="11">
                <van-field
                    clearable
                    v-model="disabled"
                    rows="1"
                    autosize
                    type="textarea"
                    placeholder="请选择固定标签(多选)" disabled/>
            </van-col>
            <van-col span="13" style="background-color: #fff">
                <div class="taglist">
                  <van-tag v-if="click1" class="tag1" color="#f7f7f7" @click="onClicktag1"> <font color="#000000">一般 </font></van-tag>
                  <van-tag v-if="click1p" class="tag1p" type="primary" @click="onClicktag1">一般</van-tag>

                  <van-tag v-if="click2" class="tag2" color="#f7f7f7" @click="onClicktag2" > <font color="#000000"> 重要 </font></van-tag>
                  <van-tag v-if="click2p" class="tag2p" type="primary" @click="onClicktag2" >重要</van-tag>
                            
                  <van-tag v-if="click3" class="tag3"  color="#f7f7f7" @click="onClicktag3"> <font color="#000000">客户</font></van-tag>
                  <van-tag v-if="click3p" class="tag3p"  type="primary" @click="onClicktag3">客户</van-tag>
                </div>
            </van-col>
        </van-row>

        <!-- 灰色线 -->
        <van-row>
          <van-col span="24" style="background-color: #F5F5F5;"></van-col>
        </van-row>
        
        <van-field
        clearable
        v-model="getUnfixedTags"
        rows="1"
        autosize
        type="textarea"
        placeholder="创建自定义标签 标签之间用逗号分隔"/>

        <!-- 灰色线 -->
        <van-row>
          <van-col span="24" style="background-color: #F5F5F5;line-height:10px;color:#F5F5F5">1</van-col>
        </van-row>

        <van-field
        clearable
        v-model="getNote"
        rows="2"
        autosize
        label="备注:"
        type="textarea"
        placeholder="请输入"/>

        <!-- 灰色线 -->
        <van-row>
          <van-col span="24" style="background-color: #F5F5F5;"></van-col>
        </van-row>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: 'newClient',
  data(){
      return{
        disabled:'',
        getShortName:'',
        getFullName:'',
        getAddress:'',
        getTags:[],
        getUnfixedTags:'',
        getNote:'',
        result:[],
        click1: true,
        click1p: false,
        click2: true,
        click2p: false,
        click3: true,
        click3p: false,
    }
  },
  computed:{
      staffId: {
          get() {
              return this.$store.state.staffInfo.staffId;
          }
      }
  },
  beforeRouteEnter(to, from, next) {
    // 添加背景色
    document.querySelector('body').setAttribute('style', 'background-color:#F5F5F5')
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 去除背景色
    document.querySelector('body').setAttribute('style', '')
    next()
  },
  methods:{
      onClicktag1() {     //点击标签1
          this.click1 = !this.click1;
          this.click1p = !this.click1p;
      },
      onClicktag2() {     //点击标签2
          this.click2 = !this.click2;
          this.click2p = !this.click2p;
      },
      onClicktag3() {     //点击标签3
          this.click3 = !this.click3;
          this.click3p = !this.click3p;
      },
      onClickLeft() {
          this.$router.go(-1);
      },
      onClickRight() {
        this.getTags = []
        if (this.click1p) {
            this.getTags.push({tagId:1,value:"一般",isFixed:true})
        }
        if (this.click2p) {
            this.getTags.push({tagId:2,value:"重要",isFixed:true})
        }
        if (this.click3p) {
            this.getTags.push({tagId:3,value:"客户",isFixed:true})
        }
        var str = this.getUnfixedTags
        var arr = str.split(',')
        for (let i = 0; i< arr.length; i++) {
            if (arr[i]!='') {
                this.getTags.push({isFixed:false,value:arr[i]})
            }
        //   console.log(arr[i]);
        }


        console.log(this.getShortName)
        console.log(this.getFullName)
        console.log(this.getAddress)
        console.log(this.getTags)
        // console.log(this.click1p)
        // console.log(this.click2p)
        // console.log(this.click3p)
        // console.log(this.getUnfixedTags)
        console.log(this.getNote)

        if (this.getShortName=="") {
            Toast("简称不能为空！");
        }else if (this.getFullName=="") {
            Toast("全称不能为空！");
        }else if (this.getShortName!=""&&this.getFullName!="") {
            let params = {
                shortName:this.getShortName,
                fullName:this.getFullName,
                address:this.getAddress,
                tagList:this.getTags,
                note:this.getNote,
                creator: this.staffId,
            }
            this.$store.dispatch('newClient/setCompany', params);
            Toast("保存成功");
            setTimeout( () => {
                this.$router.go(-1)
            }, 2200)
        }
      },
  }
}
</script>

<style scoped>
.middle{
    font-size: 17px;
    text-align: center;
}
.table{
    line-height: 35px;
    background-color: 	#F5F5F5;
}
.checkbox{
    font-size: 10px;
    margin :12px 0 0 0;
}
.taglist {
    display: flex;
    flex-grow: 1;
    flex-basis: auto;
    margin: 12px;
}
.tag1 {
    flex-shrink: 0;
}
.tag2 {
    flex-shrink: 0;
    margin-left: 0.3rem;
}
.tag3 {
    flex-shrink: 0;
    margin-left: 0.3rem;
}
.tag1p {
    flex-shrink: 0;
}
.tag2p {
    flex-shrink: 0;
    margin-left: 0.3rem;
}
.tag3p {
    flex-shrink: 0;
    margin-left: 0.3rem;
}
</style>
