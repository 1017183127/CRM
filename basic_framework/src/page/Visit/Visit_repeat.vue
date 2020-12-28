<template>
    <div>
        <!-- 顶部导航栏 -->
        <van-sticky>
            <van-nav-bar
                title="新增拜访"
                left-text="返回"
                right-text="保存"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight(staffId, teamId, contactId, visitMethod, visit_report, major_issue, location)"
            />
        </van-sticky>
        <!-- 中部信息栏 -->
            <van-cell-group>
                <!-- 姓名/公司/职位 -->
                <van-cell class="first-line">
                    <div class="test"> 
                        <span class="name">
                            {{name}}
                        </span>

                        <span class="clent-basic-information">
                            {{company}}<span class="position" >{{position}}</span>
                        </span>
                    </div>
                </van-cell>
                <!-- 拜访方式 -->
                <van-cell class="rest-line">
                    <div class="test"> 
                        <span class="label">
                            拜访方式：
                        </span>
                        <!-- 标签行 -->
                        <div class="taglist">
                            <van-tag v-if="selectNum==1?false:true" class="tag1" color="#f7f7f7" @click="select(1)"> <font color="#000000"> 上门 </font></van-tag>
                            <van-tag v-if="selectNum==1?true:false" class="tag1p" type="primary" >上门</van-tag>

                            <van-tag v-if="selectNum==2?false:true" class="tag2" color="#f7f7f7" @click="select(2)" > <font color="#000000"> 电话 </font></van-tag>
                            <van-tag v-if="selectNum==2?true:false" class="tag2p" type="primary">电话</van-tag>
                            
                            <van-tag v-if="selectNum==3?false:true" class="tag3"  color="#f7f7f7" @click="select(3)"> <font color="#000000"> 即时通讯 </font></van-tag>
                            <van-tag v-if="selectNum==3?true:false" class="tag3p"  type="primary">即时通讯</van-tag>
                        </div>
                    </div>
                </van-cell>
                <!-- 主要事宜 -->
                <van-cell class="rest-line">
                    <div class="test"> 
                        <span class="label">
                            主要事宜：
                        </span>
                        <!-- 文本输入框 -->
                        <div class="text">
                            <input class="input1" type="text" placeholder="请输入..." v-model="major_issue" value="" >
                        </div>
                    </div>
                </van-cell>
                <!-- 拜访结果 -->
                <van-cell class="rest-line">
                    <div class="test"> 
                        <span class="label">
                            拜访结果：
                        </span>
                        <!-- 文本输入框 -->
                        <div class="text">
                            <input class="input1" type="text" placeholder="请输入..." v-model="visit_report" value="" >
                        </div>
                    </div>
                </van-cell>


                <!-- 备注 -->
                <!-- <van-cell class="rest-line">
                    <div class="test"> 
                        <span class="label">
                            备注：
                        </span>
                        文本输入框
                        <div class="text">
                            <input class="input1" type="text" placeholder="请输入..." v-model="remarks" value="" >
                        </div>
                    </div>
                </van-cell> -->


                <!-- 位置 -->
                <van-cell class="rest-line">
                    <div class="test"> 
                        <span class="label">
                            位置：
                        </span>
                        <!-- 文本输入框 -->
                        <div class="text">
                            <input class="input1" type="text" placeholder="未签到" v-model="location" value="" >
                        </div>
                        <van-icon class="location-icon" name="location" size="0.5rem" />
                    </div>
                </van-cell>
            </van-cell-group>
    </div>
</template>

<script>
import { Toast } from "vant";
export default {
    name: "Visit_repeat",
    components: {

    },
    computed: {
        ResStatus: {
            get() {
                return this.$store.state.Visit.ResStatus;
            }
        }
        
    },
    data() {
        return {
            staffId: null,
            teamId: null,

            name: "",
            company: "",
            position: "",
            contactId: "",
            visit_report: "",
            major_issue: "",
            location: "",
            
            selectNum: 1,
            visitMethod: "上门拜访",

            x:null,
            visitRecordId: null,
        }
    },
    methods: {
        onClickLeft() {
            
            if (this.$route.query.from == 'companyInfo') {    //从公司详情页面跳转至本页，回退至公司详情页面
                this.$router.push({
                    path: '/clientList/companyInfo', // 路径
                    query:{
                        x: this.x, // 参数
                    }
                });
            }
            else if (this.$route.query.from == "Visit_record"){     //从拜访记录详情页面跳转至本页，回退至拜访记录主页页面
                // this.$router.go(-1)
                this.$router.push({
                    path: '/Visit_main/Visit_record',
                    query:{
                        VisitRecordId: this.visitRecordId,
                    }
                })
            }
            else{
                this.$router.go(-1);
            }
        },
        onClickRight(staffId, teamId, contactId, visitMethod, visitResult, visitMainMatter, visitAddress) {    //保存拜访记录
            if(visitMainMatter == ''){
                Toast("请输入主要事宜");
            }
            else if(visitResult == ''){
                Toast("请输入拜访结果");
            }
            else if(visitAddress == ''){
                Toast("请输入拜访地址");
            }
            else{
                let params = {
                    visitor : staffId,
                    teamId : teamId,
                    contactId: contactId,
                    visitMethod: visitMethod,
                    visitResult: visitResult,
                    visitMainMatter: visitMainMatter,
                    visitAddress: visitAddress,
                }
                console.log(params);
                this.$store.dispatch('Visit/AddVisitRecord', params);
                // Toast("保存成功！")
            }


        },

        select(index) {
            this.selectNum = index;
            if (index == 1){
                this.visitMethod = "上门拜访";
            }
            else if (index == 2){
                this.visitMethod = "电话联系";
            }
            else{
                this.visitMethod = "即时通讯";
            }
        },        
    },
    created() {
        this.name = this.$route.query.n;
        this.company = this.$route.query.c;
        this.position = this.$route.query.p;
        this.contactId = this.$route.query.contactId;
        this.staffId = this.$route.query.staffId;
        this.teamId = this.$route.query.teamId;
        this.visitRecordId = this.$route.query.visitRecordId,

        this.x = this.$route.query.x;      //公司详情页面参数
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
    mounted:function(){
        if(this.$route.query.from){
            this.$store.commit("Visit/setBack_repeat", this.$route.query.from);
        }
        if(this.$route.query.x){
            this.$store.commit("Visit/setX_repeat", this.$route.query.x);
        }
        if(this.$route.query.visitRecordId){
            this.$store.commit("Visit/setvisitRecordId_repeat", this.$route.query.visitRecordId);
        }
    }
}
</script>

<style scoped>
.test {
    display: flex;
    flex-flow: row, nowrap;
    justify-content: start;
    align-items: baseline;
}
.first-line {
    padding-top: 0.8rem;
    font-weight: bold;
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
.position {
    color: #808080;
    margin-left: 0.5rem;
}
.rest-line {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
}
.text {
    flex-grow: 1;
    flex-basis: auto;
}
.label {
    flex-shrink: 0;
    flex-basis: 2.5rem;
    font-size: 0.4rem;
    margin-left: 0.5rem;
    color: lightgray;
}
.taglist {
    display: flex;
    flex-grow: 1;
    flex-basis: auto;
}
.tag1 {
    flex-shrink: 0;
}
.tag2 {
    flex-shrink: 0;
    margin-left: 0.5rem;
}
.tag3 {
    flex-shrink: 0;
    margin-left: 0.5rem;
}
.tag1p {
    flex-shrink: 0;
}
.tag2p {
    flex-shrink: 0;
    margin-left: 0.5rem;
}
.tag3p {
    flex-shrink: 0;
    margin-left: 0.5rem;
}
.input1 {
    border: none;
}
.location-icon {
    flex-shrink: 0;
    flex-basis: 0.5rem;
    color: #2d7eff;    
}
</style>