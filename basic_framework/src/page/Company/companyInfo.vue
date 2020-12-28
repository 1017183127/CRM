<template>
  <div>
    <!-- 头部 -->
    <van-sticky>
    <van-nav-bar title="公司" left-arrow style="background: #fff;"   @click-left="onClickLeft"></van-nav-bar>
    
    <!-- 公司简介 -->
    <div>
        <van-cell center style="height:170px">
            <template #title>
            <span style="font-size:.55rem;font-weight:300;">{{company.shortName}}</span>
            &nbsp;&nbsp;&nbsp;
            <span style="color:grey;font-size:.45rem;font-weight:200;">{{company.fullName}}</span>
            </template>
                <template #label>
                <van-row>
                  <van-col v-for="items in company.tagList" :key="items.value">
                    <van-tag plain color="#FF8C00" v-if="items.isFixed" style="height:.33rem;font-weight:300;">
                      {{items.value}}
                    </van-tag>
                    <van-tag plain color="grey" v-if="!items.isFixed" style="height:.33rem;font-weight:300;">
                      {{items.value}}
                    </van-tag>
                    &nbsp;
                  </van-col>
                </van-row>

                <img :src="require('../../assets/icon/addressPath.png')" class="img"/>
                <span style="font-size:.37rem;font-weight:200;">{{company.address}}</span>

                <br>

                <img :src="require('../../assets/icon/zhuImage.png')" class="img"/>
                <span style="font-size:.37rem;font-weight:200;">{{company.note}}</span>

                <br>

                <img :src="require('../../assets/icon/chuang.png')" class="img"/>
                <span style="font-size:.37rem;font-weight:200;">{{company.creatorName}}</span>

                <br>

                <img :src="require('../../assets/icon/companyTime.png')" class="img"/>
                <span style="font-size:.37rem;font-weight:200;">{{company.createdTime}}</span>
            </template>
        </van-cell>
    </div>
    </van-sticky>

    <!-- tab -->
    <van-row type="flex" justify="center" style="background-color: #F5F5F5;align-items: center;">
      <van-col>
          <van-tabs sticky offset-top=216 type="card" color="#2d7eff" background=" #F5F5F5" title-active-color="#fff" 
            style="margin:.25rem 0 0 0;width:9.5rem;">
            <van-tab title="联系人">
                <!-- 联系人页面 -->
                <div class="record-cell" v-for="items in contact" :key="items.contactId">
                    <van-cell center style="width:9.5rem;">
                        <template #title>
                        <span style="font-size:.47rem;font-weight:300;">{{items.name}}</span>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <span style="color:black;font-size:.4rem;font-weight:300;">{{items.companyFullName}}</span>
                        <span style="color:grey;font-size:.4rem;font-weight:300;">{{items.duty}}</span>
                        </template>

                        <template #label>
                          <van-row>
                            <van-col v-for="tag in items.tagList" :key="tag.tagId">
                              <van-tag plain color="#FF8C00" v-if="tag.isFixed&&tag.value!=''" style="height:.33rem;font-weight:300;">
                                {{tag.value}}
                              </van-tag>
                              <van-tag plain color="grey" v-if="!tag.isFixed&&tag.value!=''" style="height:.33rem;font-weight:300;">
                                {{tag.value}}
                              </van-tag>
                              &nbsp;
                            </van-col>
                          </van-row>
                          <br>
                            <van-row type="flex" justify="center">
                            <van-col span="5">
                                <img :src="require('../../assets/icon/createUser.png')" style="height:.3125rem;"/>
                                <span style="color:grey;font-size:.35rem;font-weight:300;">{{items.creatorName}}</span>
                            </van-col>
                            <van-col span="13"></van-col>
                            <van-col span="6">
                                <van-button round color="#2d7eff"
                                  style="height:.7rem;width:2rem;font-size:.38rem;font-weight:300;" @click="onClick_toVisitadd(items)">
                                ＋拜访
                                </van-button>
                            </van-col>
                          </van-row>
                        </template>
                    </van-cell>
                </div>
            </van-tab>
            <van-tab title="拜访记录">
                <!-- 拜访记录页面 -->
              <div class="record-cell" v-for="items in visit" :key="items.visitRecordId" >
                <van-cell style="width:9.5rem;" @click="onClickRecordCell(items.visitRecordId)">
                    <!-- title部分插槽 -->
                    <template #title>
                    <van-row gutter="4">
                        <van-col class="custom-name" span="5">{{items.contactInfo.name}}</van-col>
                        <van-col class="custom-company" span="8">{{items.contactInfo.companyShortName}}</van-col>
                        <van-col class="custom-position" span="6">{{items.contactInfo.duty}}</van-col>
                        <van-col class="custom-date" span="4" offset="1">{{items.visitTime.slice(5,10)}}</van-col>
                    </van-row>
                    </template> 
                    <!-- label部分插槽 -->
                    <template #label>
                        <div class="label-message" align='justify'> 
                            <span class="label-type">【{{items.visitMethod}}】</span>{{items.visitMainMatter}}
                        </div>
                        <van-row type="flex" justify="center">
                            <van-col span="20"></van-col>
                            <van-col span="4">
                                <img :src="require('../../assets/icon/visitCardLogo.png')" style="height:.3125rem;"/>
                                <span style="color:grey;font-size:.25rem;">{{items.contactInfo.creatorName}}</span>
                            </van-col>
                        </van-row>
                    </template>
                </van-cell>
              </div>
            </van-tab>
          </van-tabs>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  name: 'companyInfo',
  data(){
      return{
        company:[],
    }
  },
  beforeRouteEnter(to, from, next) {
    // 添加背景色
    document.querySelector('body').setAttribute('style', 'background-color:#F5F5F5;font-family: Noto Sans SC;font-style: normal;')
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 去除背景色
    document.querySelector('body').setAttribute('style', '')
    next()
  },
  methods: {
      onClickLeft() {
        if(!this.$route.query.from)
          this.$router.push('/clientList');
        else
          this.$router.push({
            name:this.$route.query.from,
            query:{
              id:this.$route.query.id
            }
          });
      },
      onClick_toVisitadd(contact) {
        this.$router.push({
          path: '/Visit_main/Visit_repeat', // 路径
          query:{
            from:'companyInfo',
            n: contact.name,
            c: contact.companyShortName,
            p: contact.duty,
            contactId: contact.contactId,
            staffId: this.staffId,
            teamId: this.teamId,

            x: this.company, // 参数
          }
        });
      },
      onClickRecordCell(visitRecordId){
          this.$router.push({
            path: "/Visit_main/Visit_record",
            query:{
                staffId: this.staffId,
                teamId: this.teamId,
                VisitRecordId: visitRecordId,
                x: this.company,
                from: "companyInfo",
            }
          })
      }
  },
  created(){
    console.log("公司详情页面query：")
    console.log(this.$route.query)
    this.company = this.$route.query.x;
  },
  computed:{
    fullname:{
      get(){
        return this.$store.state.companyInfo.fullname;
      }
    },
    address:{
      get(){
        return this.$store.state.companyInfo.address;
      }
    },
    more:{
      get(){
        return this.$store.state.companyInfo.more;
      }
    },
    builder:{
      get(){
        return this.$store.state.companyInfo.builder;
      }
    },
    time:{
      get(){
        return this.$store.state.companyInfo.time;
      }
    },
    fixedTags:{
      get(){
        return this.$store.state.companyInfo.fixedTags;
      }
    },
    unfixedTags:{
      get(){
        return this.$store.state.companyInfo.unfixedTags;
      }
    },
    contact:{
      get(){
        return this.$store.state.companyInfo.contact;
      }
    },
    visit:{
      get(){
        return this.$store.state.companyInfo.visit;
      }
    },
    staffId: {
      get() {
        return this.$store.state.staffInfo.staffId;
      }
    },
    teamId: {
      get() {
        return this.$store.state.staffInfo.teamId;
      }
    }
  },
  mounted(){
    console.log(this.company.companyId)
    let params = {
      companyId: this.company.companyId,
      pageSize:40,
    }
    let params2 = {
      companyId: this.company.companyId
    }
    this.$store.dispatch('companyInfo/getContactInfo', params);
    this.$store.dispatch('companyInfo/getVisitInfo', params2);
  },
}
</script>

<style scoped>
img{
    height: .375rem;
    margin: .125rem 0 0 0;
}
.custom-name {
    font-size: 0.4375rem;
    /* font-weight: bold; */
    font-family: Microsoft YaHei 
}
.custom-company {
    font-size: 0.375rem;
    font-family: Microsoft YaHei
}
.custom-position {
    font-size: 0.375rem;
    color: grey;
    font-family: Microsoft YaHei
}
.custom-date {
    font-size: 0.1875rem;
    color: grey;
    font-family: Microsoft YaHei;
    margin-right: 0rem;
}
.lebel-message {
    font-size: 0.3rem;
    color: grey;
    font-family: Microsoft YaHei;
}
.label-type {
    color: #0066FF ;
    font-family: Microsoft YaHei
}
.record-cell {
    align-self: center;
    margin: .25rem 0 0 0;
}
</style>
