<template>
    <div>
        <!-- 顶部导航栏 -->
        <van-sticky>
            <van-nav-bar
                title="拜访记录"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </van-sticky>
        <!-- 中部信息栏 -->
        <van-cell-group>
            <!-- 姓名/公司/职位 -->
            <van-cell class="first-line">
                <div class="test"> 
                    <span class="name">
                        {{list.contactInfo.name}}
                    </span>

                    <span class="clent-basic-information">
                        {{list.contactInfo.companyShortName}}<span class="position" >{{list.contactInfo.duty}}</span>
                    </span>
                </div>
            </van-cell>
            <!-- 拜访方式 -->
            <van-cell class="rest-line">
                <div class="test"> 
                    <span class="label">
                        拜访方式：
                    </span>

                    <span class="text">
                        {{list.visitMethod}}
                    </span>
                </div>
            </van-cell>
            <!-- 主要事宜 -->
            <van-cell class="rest-line">
                <div class="test"> 
                    <span class="label">
                        主要事宜：
                    </span>

                    <span class="text">
                        {{list.visitMainMatter}}
                    </span>
                </div>
            </van-cell>
            <!-- 拜访结果 -->
            <van-cell class="rest-line">
                <div class="test"> 
                    <span class="label">
                        拜访结果：
                    </span>

                    <span class="text">
                        {{list.visitResult}}
                    </span>
                </div>
            </van-cell>          
            <!-- 签到栏 -->
            <van-cell class="rest-line">
                <div class="test"> 
                    <span class="sign-in">
                        {{list.signIn}}
                    </span>

                    <span class="text">
                        {{list.visitAddress}}
                    </span>
                    <van-icon class="location-icon" name="location" size="0.5rem" />
                </div>
            </van-cell>       
        </van-cell-group>
        <!-- 底部按钮
        <van-tabbar class="button-tabbar">
            <van-tabbar-item>
                <van-button class="contact-detail"  plain round="" type="info" @click="onClickContacts">联系人详情</van-button>
            </van-tabbar-item>
            <van-tabbar-item>
                <van-button class="visit-again" round="" type="info" @click="onClickVisitRepeat(list.contactInfo.name, list.contactInfo.companyShortName, list.contactInfo.duty, list.contactId, staffId, teamId)">&#8194再次拜访&#8194</van-button>
            </van-tabbar-item>
        </van-tabbar> -->
    </div>
</template>

<script>
import CellWithSearch from '../../components/CellWithSearch';
export default {
    name: "Visit_record_display",
    components: {
        CellWithSearch,
    },
    computed:{
        list: {
            get(){
                return this.$store.state.Visit.RecordListById;
            }
        }
    },
    data() {    
        return {
            // name: "",
            // company: "",
            // position: "",
            // visit_way: "",
            // major_issue: "",
            // visit_report: "",
            // sign_in: "",
            // visit_location: "",
            // contactId: "",
            x: null,
            VisitRecordId: null,
            staffId: null,
            teamId: null,
            from: null,
        }
    },
    methods: {
        onClickLeft() {         //点击顶部返回按钮
            this.$router.go(-1);
            // if (this.$route.query.from == "Visit_main"){      //如果是从拜访记录主页跳转至本页，回退至拜访记录主页
            //     this.$router.push({
            //         path:"/Visit_main",
            //         query:{
            //             staffId: this.staffId,
            //             teamId: this.teamId,
            //             contactId: this.contactId,
            //         }
            //     })
            // }
            // else if (this.$route.query.from == "companyInfo"){
            //     this.$router.push({
            //         path: '/clientList/companyInfo', // 路径
            //         query:{
            //             x: this.x, // 参数
            //         }
            //     })
            // }
            // else{
            //     this.$router.go(-1);
            // }


        },
        getData() {
            let params = {
                visitRecordId: this.VisitRecordId,
            }
            this.$store.dispatch("Visit/getDataById", params);
        },
    },

    created() {
            this.staffId = this.$route.query.staffId;
            this.teamId = this.$route.query.teamId;

            this.VisitRecordId = this.$route.query.VisitRecordId;

            this.from = this.$route.query.from;
            this.x = this.$route.query.x;
    },
    
    mounted:function() {
        console.log("staffID为：", this.staffId);
        console.log("teamId为:", this.teamId);
        console.log("拜访记录Id为：", this.VisitRecordId);

        this.getData();
        console.log(this.list)
    },

    //  改变背景颜色
    beforeRouteEnter (to, from, next) {
        window.document.body.style.backgroundColor = '#F5F5F5';
        next();
    },

    beforeRouteLeave (to, from, next) {
        window.document.body.style.backgroundColor = '';
        next();
    },
}
</script>

<style scoped>
.test {
    display: flex;
    flex-flow: row, nowrap;
    justify-content: start;
    align-items: baseline;
    padding-right: 0.5rem;
}
.first-line {
    padding-top: 0.8rem;
    font-weight: bold;
}
.rest-line {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
}
.name {
    flex-shrink: 0;
    flex-basis: 2.5rem;
    font-size: 0.5rem;
    margin-left: 0.5rem;
}
.clent-basic-information {
    flex-grow: 1;
    flex-basis: auto;
    font-size: 0.4rem;
}
.label {
    flex-shrink: 0;
    flex-basis: 2.5rem;
    font-size: 0.4rem;
    margin-left: 0.5rem;
    color: lightgray;
}
.text {
    flex-grow: 1;
    flex-basis: auto;
    font-size: 0.4rem;
}
.position {
    color: grey;
    margin-left: 0.5rem;
}
.sign-in {
    flex-shrink: 0;
    flex-basis: 2.5rem;
    font-size: 0.4rem;
    margin-left: 0.5rem;
    color: #2d7eff;
}
.location-icon {
    flex-shrink: 0;
    flex-basis: 0.5rem;
    color: #2d7eff;    
}
.button-tabbar {
    margin-bottom: 1rem;
    background-color: #f5f5f5;
}
</style>