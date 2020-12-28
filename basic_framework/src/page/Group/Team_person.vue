<template>
  <div id="person">
        <van-nav-bar  title="销售人员"  left-arrow  @click-left="onClickLeft"/>
        
        <div style='height:2.5rem; background:white'>
            <van-image :round=true style='width:1.8rem;height:1.8rem;margin-left:0.5rem;margin-top:0.35rem;float:left' :src="headPicture"/>
            <label style='float:left;margin-left:0.6rem;font-size:0.6rem;font-weight:bold;margin-top:0.9rem'>{{name}}</label>
            <label style='float:left;margin-left:0.5rem;font-size:0.5rem;color:#B5B5B5;margin-top:1rem'>{{dn}}</label>
        </div>            
        
        <van-tabs type='card' v-model="active" style='margin-top:0.5rem;background:#F5F5F5' @click="onClick" title-active-color='white' title-inactive-color='#4169E1' color='#4169E1'>
            <van-tab title="负责的" name="tab1" style='padding-top:0.5rem;' >
                 <div v-for="item in $store.state.team.list_charge" :key="item.staffId"  @click="toConDetail(item.contactId)" style="margin-bottom:0.4rem;margin-left:0.2rem;margin-right:0.2rem" >
                    <van-cell style="padding-top:0;padding-bottom:0.3rem;padding-left:0;">
                    <template #title>
                    <div style='height:1rem;padding-top:0.5rem'>
                        <label style='width:1.6rem;margin-left:0.5rem;font-size:0.5rem;'>{{item.name}}</label>
                        <label style='width:1.6rem;margin-left:0.4rem;font-size:0.4rem'>{{item.companyFullName}}</label>
                        <label style='width:1.6rem;margin-left:0.3rem;font-size:0.3rem;color:#B5B5B5'>{{item.duty}}</label>
                    </div>
                    <div>
                    <span style='padding-top:0;' v-for="tag in item.tagList" :key="tag.tagId">
                        <van-button disabled color='orange' class='lab' plain type="info"  v-if="tag.isFixed">{{tag.value}}</van-button>
                        <van-button disabled color='grey' class='lab2' plain type="info" v-else>{{tag.value}}</van-button>
                    </span>
                    </div>
                    
                    </template>
                    </van-cell>
                </div>    
            </van-tab>
            <van-tab title="被共享的" name="tab2" style='padding-top:0.5rem;'>
                 <div v-for="item in $store.state.team.list_shared" :key="item.staffId" @click="toConDetail(item.contactId)" style="margin-bottom:0.4rem;margin-left:0.2rem;margin-right:0.2rem">
                    <van-cell style="padding-top:0;padding-bottom:0.3rem;padding-left:0">
                    <template #title>
                    <div style='height:1rem;padding-top:0.5rem'>
                        <label style='width:1.6rem;margin-left:0.5rem;font-size:0.5rem;'>{{item.name}}</label>
                        <label style='width:1.6rem;margin-left:0.4rem;font-size:0.4rem'>{{item.companyFullName}}</label>
                        <label style='width:1.6rem;margin-left:0.3rem;font-size:0.3rem;color:#B5B5B5'>{{item.duty}}</label>
                    </div>
                    <div>
                    <span style='padding-top:0;' v-for="tag in item.tagList" :key="tag.tagId">
                        <van-button disabled color='orange' class='lab' plain type="info"  v-if="tag.isFixed">{{tag.value}}</van-button>
                        <van-button disabled color='grey' class='lab2' plain type="info" v-else>{{tag.value}}</van-button>
                    </span>
                    </div>
                    
                    </template>
                    </van-cell>
                </div>    
            </van-tab>
            <van-tab title="拜访记录" name="tab3" style='padding-top:0.5rem;'>
             
            <div class="record-cell" v-for="item in $store.state.team.list_visit" :key="item.StaffId" @click="onClick_Visit(item)">
                <van-cell class="acell">
                    <!-- title部分插槽 -->
                    <template #title>
                    <van-row gutter="4">
                        <van-col class="custom-name" span="5">{{item.contactInfo.name}}</van-col>
                        <van-col class="custom-company" span="10">{{item.contactInfo.companyShortName}}</van-col>
                        <van-col class="custom-position" span="5">{{item.contactInfo.duty}}</van-col>
                        <van-col class="custom-date" span="4">{{item.visitTime.slice(5, 10)}}</van-col>
                    </van-row>
                    </template> 
                    <!-- label部分插槽 -->
                    <template #label>
                        <p class="label-message" align='justify'> 
                            <span class="label-type">【{{item.visitMethod}}】</span>{{item.visitMainMatter}}
                        </p>
                    </template>
                </van-cell>
            </div>

                 
            </van-tab>
        </van-tabs>

       
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
    data() {
        return {

            name:'',
            staffId:'',
            teamId:'',
            headPicture:'',
            dn:'',   

            img:require("@/assets/icon/timgHeadImage.png"),

            active:0,

        };
    },

    mounted(){
        this.getParam();
        this.$store.dispatch('getChargeList',this.staffId);
    },

    methods: {
        toConDetail(id)
        {
           this.$store.dispatch("info_907/getContact",{contactId:id}).then(res =>  {
                this.$router.push({name:"Contacts_detail",query:{from:"Team_person",id:0,
                params:{
                name:this.name,staffId:this.staffId,
                headPicture:this.headPicture,
                dn:this.dn,teamId:this.teamId}
                }})
            })
        },
        onClickLeft() {
            this.$router.push({  
            path: '/Team/Team_dep',  
            query: {   
                t: this.dn, 
                i: this.teamId,  
            }  
         })
        },

        getParam () {
            this.name=this.$route.query.name;
            this.staffId=this.$route.query.staffId;
            this.headPicture=this.$route.query.headPicture;
            this.dn=this.$route.query.dn;
            this.teamId=this.$route.query.teamId;
        },

        onClick(tab) {
            if(tab=="tab1"){
                this.$store.dispatch('getChargeList',this.staffId);
            }else if(tab=="tab2"){
                this.$store.dispatch('getSharedList',this.staffId);
            }else{
                this.$store.dispatch('getVisitList',this.staffId);
            }
        },

    onClick_Visit(item){
           this.$router.push({  
            name: 'Visit_record_display', 
            query: {
                name:item.contactInfo.name,
                company:item.contactInfo.companyFullName,
                position:item.contactInfo.duty,
                visitway:item.visitMethod,
                majorissue:item.visitMainMatter,
                visitreport:item.visitResult,
                signin:item.signin,
                visitloction:item.visitAddress,
                contactId:item.contactId,
                staffId:this.staffId,
                teamId:this.teamId,
                VisitRecordId:item.visitRecordId,
                from:'/Team/Team_person',
            }
         })
        }
    },
}
</script>

<style>
#person {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  position:absolute;
  width:100%;
  height:100%;
  background: #F5F5F5;
}

.record-cell {
    margin-bottom:0.4rem;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
}

.lab{
    height:0.5rem;
    margin-left:0.2rem;
    margin-bottom:0.2rem;
    float: left;
}

.lab2{
    height:0.5rem;
    margin-left:0.2rem;
    margin-bottom:0.2rem;
    float: left;
}

.acell{
    padding-top: 0.4rem;
    margin-bottom:0.4rem;
}

.lebel-message {
    font-size: 0.05rem;
    color: grey;
}

.custom-name {
    font-size: 0.5rem;
    /* font-weight: bold; */
    /* font-family: Microsoft YaHei  */
}
.custom-company {
    font-size: 0.4rem;
    /* font-family: Microsoft YaHei */
}
.custom-position {
    font-size: 0.4rem;
    color: grey;
    /* font-family: Microsoft YaHei */
}
.custom-date {
    font-size: 0.15rem;
    color: grey;
    /* font-family: Microsoft YaHei; */
    margin-right: 0rem;
}
.lebel-message {
    font-size: 0.05rem;
    color: grey;
}
.label-type {
    color: #0066FF ;

}
</style>
