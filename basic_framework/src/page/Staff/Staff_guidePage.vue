<template>
    <div  id="main" style="background-color: #F5F5F5;">
        <van-nav-bar
            title="客户关系管理"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-grid :column-num='3' :border='false'>
            <van-grid-item :icon="icon_contact" text="联系人" to='/contacts_main'/>
            <van-grid-item :icon="icon_company" text="公司" />
            <van-grid-item :icon="icon_visit" text="拜访" />
        </van-grid>

    <div class="imgBox">
         <img :src='personalGuideImgUrl' class="personalGuideImg">
         <div style="color:#979D99;font-size: 0.55rem;">当前没有任何数据</div>
         <div style="color:#979D99;font-size: 0.467rem;margin-top: 0.2rem;">资料库为空</div>
         <div style="color:#979D99;font-size: 0.467rem;">您需要先录入联系人的信息</div>

         <van-button round type="info" style="width:5rem;height:1rem;margin-top:0.7rem">创建联系人</van-button>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            icon_contact: require('../../assets/icon/contactLogo.png'),
            icon_company: require('../../assets/icon/compLogo.png'),
            icon_visit: require('../../assets/icon/visitLogo.png'),
            personalGuideImgUrl:require('../../assets/icon/personalGuide.png'),
        };
    },
    methods:{
            onClickLeft() {
      this.$router.go(-1);
      // Toast('返回');
    },

    }
}
</script>

<style scoped>
    #main{
        width:100%;
        height: 100%;
        background: whitesmoke;
        position: auto;
    }
    .imgBox{
        background-color: #F5F5F5;
        text-align: center;
        height: 15rem;
    }
    .personalGuideImg{
        height: 2rem;
        margin: 2rem auto 0.2rem;
    }
</style>