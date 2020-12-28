<template>
    <div style="background:whitesmoke">
            <van-nav-bar
                title="公司"
                right-text="按钮"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight">
                    <template #right>
                        <van-icon name="plus" size="18" />
                    </template>
            </van-nav-bar>
            <van-search v-model="value" show-action placeholder="请输入公司名或简称" @search="searchCompany" @input="searchCompany"  @cancel="searchCompany"/>
            <div class="border" v-for="(item,index) in list" :key="index"  @click="onClickCell(index)">
                <van-row type="flex" justify="space-around" >
                    <van-col span="6" class="companyForShort">{{item.shortName}}</van-col>
                    <van-col span="16" class="company">{{item.fullName}}</van-col>
                </van-row>
                 <img :src='addressLocationImgUrl' class="addressLocationImg">
                <van-row type="flex" justify="space-around">
                    <van-col span="23" class="detailAddress">{{item.address}}</van-col>
                </van-row>  
                <img :src='createPeopleImgUrl' class="createPeopleImg">
                <van-row type="flex" justify="space-around">
                    <van-col span="23" class="createPeople">{{item.creatorName}}</van-col>
                </van-row>
            </div> 
            
    </div>
</template>

<script>
export default {
      data() {
        return {
            value:"",
           createPeopleImgUrl:require("../../assets/icon/chuang.png"),
           addressLocationImgUrl:require("../../assets/icon/addressPath.png")
           
        };
    },
    computed:{
        list:{
            get()
            {
                return this.$store.state.CompanyList.companyInfoList;
            }
        }
    },
    mounted:function() {
    
      let params ={
        "pageNum":null,
        "pageSize":null
      };
      this.$store.dispatch("list",params);
      
    },
    methods: {
        onClickLeft(){
            this.$router.push({
                name:this.$route.query.from,
                query:{id:this.$route.query.id,idc:-1}
            });
        },
        onClickRight(){
            this.$router.push('/clientList/newClient');//到添加公司信息页面
        },
        onClickCell(idc){

            this.$router.push({
                name:this.$route.query.from,
                query:{id:this.$route.query.id, idc:idc}
            });
            
        },
        searchCompany(){
            let params ={
                "name":this.value,
                "pageNum":null,
                "pageSize":null
             };
            this.$store.dispatch("list",params);
            this.list=this.$store.state.CompanyList.companyInfoList;
            // console.log(this.list);
        },

    }
};
</script>

<style scoped>
.border{
    border: 0.01rem #F0F0F0 solid;
    padding-left: 0.2rem;
    background-color: #FEFEFE;
    padding-bottom: 0.23rem;
    padding-top: 0.23rem;
}
.companyForShort{
    font-size: 0.45rem;
    color: #222222;
     margin-top: 0.1rem;
}
.company{
    font-size: 0.38rem;
    color: #636A76;
    margin-top: 0.14rem;
}
.detailAddress{
    font-size: 0.31rem;
    color:#AAB1B9;
    margin-top: 0.05rem;
}

.createPeopleImg{
    padding-top: 0.07rem;
    height: 0.3rem;
    margin-left: 0.2rem;
    margin-top: 0.1rem;
    float: left;
    clear: both;
}
.addressLocationImg{
    padding-top: 0.07rem;
    height: 0.3rem;
    margin-left: 0.2rem;
    margin-top: 0.1rem;
    float: left;
}
.createPeople{
    padding-top: 0.1rem;
    font-size: 0.3rem;
    color: #A4ACB4;
}
</style>