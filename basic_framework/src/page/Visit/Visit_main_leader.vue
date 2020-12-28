<template>
    <div class="visit">
        <van-sticky>
            <div>
                <!-- 顶部导航栏 -->
                    
                    <!-- <CellWithSearch :value="value" @click="onClickLeft"></CellWithSearch> -->
                    <van-nav-bar title="拜访记录" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
                        <template #right>
                            <van-icon name="search" size="18" />
                        </template>
                    </van-nav-bar>
                </div>
                <div>
                <!-- 中部下拉菜单 -->
                <van-dropdown-menu>
                    <!-- 筛选部分 -->
                    <van-dropdown-item title="筛选" ref="item" @change="chronological_range(limitedTime, visitMethod, value1, $event)">
                        <van-row >
                            <van-col class="dropout-time" span="5" offset="2">
                                时间范围
                            </van-col>
                            <van-col class="dropout-range" span="12" >
                                开始时间————结束时间
                            </van-col>
                        </van-row>            
                    <!-- 筛选标签 -->
                        <van-row class="time-tags" type="flex">
                            <van-col span="3">
                                <van-tag v-if="selectNum==1?false:true" class="tag1" color="#f7f7f7" @click="select(1)"> <font color="#000000">本月</font></van-tag>
                                <van-tag v-if="selectNum==1?true:false" class="tag1p" type="primary" @click="select(0)">本月</van-tag>
                            </van-col>
                            <van-col span="3">
                                <van-tag v-if="selectNum==2?false:true" class="tag2" color="#f7f7f7" @click="select(2)"> <font color="#000000">本年</font></van-tag>
                                <van-tag v-if="selectNum==2?true:false" class="tag2p" type="primary" @click="select(0)">本年</van-tag>
                            </van-col>


<!-- 
                            <van-col span="4">
                                <van-tag v-if="selectNum==2?false:true" class="tag2" color="#f7f7f7" @click="select(2)"> <font color="#000000">三月内</font></van-tag>
                                <van-tag v-if="selectNum==2?true:false" class="tag2p" type="primary" @click="select(0)">三月内</van-tag>
                            </van-col>
                            <van-col span="4">
                                <van-tag v-if="selectNum==3?false:true" class="tag3" color="#f7f7f7" @click="select(3)"> <font color="#000000">半年内</font></van-tag>
                                <van-tag v-if="selectNum==3?true:false" class="tag3p" type="primary" @click="select(0)">半年内</van-tag>
                            </van-col>
                            <van-col span="4">
                                <van-tag v-if="selectNum==4?false:true" class="tag4" color="#f7f7f7" @click="select(4)"> <font color="#000000">一年内</font></van-tag>
                                <van-tag v-if="selectNum==4?true:false" class="tag4p" type="primary" @click="select(0)">一年内</van-tag>
                            </van-col>
                            <van-col span="5">
                                <van-tag v-if="selectNum==5?false:true" class="tag5" color="#f7f7f7" @click="select(5)"> <font color="#000000">一年以上</font></van-tag>
                                <van-tag v-if="selectNum==5?true:false" class="tag5" type="primary" @click="select(0)">一年以上</van-tag>
                            </van-col> -->
                            
                        </van-row>                        
                    </van-dropdown-item>

                    <!-- 拜访时间顺序 -->
                    <van-dropdown-item v-model="value1" :options="option1" @change="chronological_order(limitedTime, visitMethod, $event)"/>

                    <!-- 拜访方式 -->
                    <van-dropdown-item title="拜访方式" ref="item" @change="visit_method(limitedTime, visitMethod, value1, $event)">
                        <van-row >
                            <van-col class="dropout-time" span="5" offset="2">
                                拜访方式
                            </van-col>
                        </van-row>            
                    <!-- 拜访方式标签 -->
                        <van-row class="time-tags" type="flex" >
                            <van-col span="3">
                                <van-tag v-if="electNum==1?false:true" class="tag6" color="#f7f7f7" @click="elect(1)"> <font color="#000000">上门</font></van-tag>
                                <van-tag v-if="electNum==1?true:false" class="tag6p" type="primary" @click="elect(0)">上门</van-tag>
                            </van-col>
                            <van-col span="3">
                                <van-tag v-if="electNum==2?false:true" class="tag7" color="#f7f7f7" @click="elect(2)"> <font color="#000000">电话</font></van-tag>
                                <van-tag v-if="electNum==2?true:false" class="tag7p" type="primary" @click="elect(0)">电话</van-tag>
                            </van-col>
                            <van-col span="5    ">
                                <van-tag v-if="electNum==3?false:true" class="tag8" color="#f7f7f7" @click="elect(3)"> <font color="#000000">即时通讯</font></van-tag>
                                <van-tag v-if="electNum==3?true:false" class="tag8p" type="primary" @click="elect(0)">即时通讯</van-tag>
                            </van-col>
                        </van-row>
                    </van-dropdown-item>
                </van-dropdown-menu>
            </div>
        </van-sticky>
        <!-- 下拉刷新模块 -->
        <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
        >

            <!-- 信息记录部分Cell_1 -->
            <!-- <div class="record-cell" v-for="item in list" :key="item.visitRecordId" @click="onClickCell(item.contactInfo.name, item.contactInfo.companyFullName, item.contactInfo.duty, item.visitMethod, item.visitMainMatter, item.visitResult, item.signIn, item.visitAddress, item.contactId, staffId, teamId)"> -->
            <div class="record-cell" v-for="item in list" :key="item.visitRecordId" @click="onClickCell(item.visitRecordId, staffId, teamId)">
                <van-cell >
                    <!-- title部分插槽 -->
                    <template #title>
                    <van-row gutter="4">
                        <van-col class="custom-name" span="5">{{item.contactInfo.name}}</van-col>
                        <van-col class="custom-company" span="8">{{item.contactInfo.companyShortName}}</van-col>
                        <van-col class="custom-position" span="6">{{item.contactInfo.duty}}</van-col>
                        <van-col class="custom-date" span="4" offset="1">{{item.visitTime.slice(5, 10)}}</van-col>
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

            <!-- 时间分割 -->
            <!-- <van-divider content-position="left">{{month}}</van-divider> -->
            
        </van-pull-refresh>
    </div>
</template>
 
<script>
import Toast from 'vant';
export default {
    name : "Visit_main_leader",
    components: {

    },
    computed: {
        list : {
            get() {
                return this.$store.state.Visit.RecordList;
            }
        },
        // staffId : {
        //     get() {
        //         return this.$store.state.staffInfo.staffId;
        //     }
        // },
        // teamId : {
        //     get() {
        //         return this.$store.state.staffInfo.teamId;
        //     }
        // }

    },
    data() {
        return {
            // staffId: "SID002",
            // teamId: "TID002",
            contactId: "111111",

            //与时间范围选择有关
            selectNum: 0,
            //与拜访方式选择有关
            electNum: 0,
            //与时间升/降序有关
            value1: false,
            option1: [
                { text: '拜访时间降序', value: false },
                { text: '拜访时间升序', value: true },
            ],

            // month: "2018年12月",

            limitedTime: null,
            visitMethod: null,

            isLoading: false,

            from: null,
        };
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
    methods: {
        onClickLeft() {     //点击Navbar返回按钮
            
            if(this.$store.state.Visit.back == "Leader_main"){    
                this.$router.push("/Leader_main");
            }
            else if(this.$store.state.Visit.back == "Staff_main"){
                this.$router.push('/Staff_main');
            }
        },
        onClickRight() {    //点击Navbar搜索按钮
            this.$router.push({
                path: "/Visit_main/Search",
                query: {
                    // staffId: this.staffId,
                    // teamId: this.teamId,
                    from: "Visit_main_leader",
                }
            })
        },
        // onClickCell(name, company, position, visit_type, label_message, visit_report, sign_in, visit_location, contactId, staffId, teamId) {
        onClickCell(VisitRecordId, staffId, teamId) {
            this.$router.push({
                path: "/Visit_record_display",
                query:{
                    // staffId: staffId,
                    // teamId: teamId,
                    contactId: this.contactId,
                    VisitRecordId: VisitRecordId,

                    from: "Visit_main_leader",
                }
            })
        },
        
        onRefresh() {       //下拉刷新
            setTimeout(() => {
                console.log('时间范围为', this.limitedTime, '拜访方式为', this.visitMethod, '升序为true/降序为false', this.value1);
                let params = {
                    // staffId: this.staffId,
                    // teamId: this.teamId,
                    limitedTime: this.limitedTime,
                    visitMethod: this.visitMethod,
                    isASC: this.value1,
                }
                this.$store.dispatch("Visit/getData", params);                
                this.isLoading = false;
            }, 1000);
        },

        onConfirm() {
            this.$refs.item.toggle();
        },

        chronological_order(limitedTime, visitMethod, data) {             //按时间降序/升序进行查询
            console.log('时间范围为', limitedTime, '拜访方式为', visitMethod, '升序为true/降序为false', data);
            let params = {
                // staffId: this.staffId,
                // teamId: this.teamId,
                limitedTime: limitedTime,
                visitMethod: visitMethod,
                isASC: data,
            }
            this.$store.dispatch("Visit/getData", params);
        },

        select(index) {         //选择时间筛选范围（本月为1，本年为2，不选为0）
            this.selectNum = index;
            if (index == 1){
                this.limitedTime = "MONTH"; 
                this.chronological_range(this.limitedTime, this.visitMethod, this.value1);
            }
            else if (index == 2){
                this.limitedTime = "YEAR";
                this.chronological_range(this.limitedTime, this.visitMethod, this.value1);
            }
            else{
                this.limitedTime = null;
                this.chronological_range(this.limitedTime, this.visitMethod, this.value1);
            }
        },

        chronological_range(limitedTime, visitMethod, value1) {         //按时间范围（本月/本年）进行查询
            console.log('时间范围为', limitedTime, '拜访方式为', visitMethod, '升序为true/降序为false', value1);
            let params = {
                // staffId: this.staffId,
                // teamId: this.teamId,
                limitedTime: limitedTime,
                visitMethod: visitMethod,
                isASC: value1,
            }
            this.$store.dispatch("Visit/getData", params); 
        },

        elect(index) {         //选择拜访方式（上门拜访为1，电话联系为2，即时通讯为3，不选为0）
            this.electNum = index;
            if (index == 1){
                this.visitMethod = "上门拜访"; 
                this.visit_method(this.limitedTime, this.visitMethod, this.value1);
            }
            else if (index == 2){
                this.visitMethod = "电话联系";
                this.visit_method(this.limitedTime, this.visitMethod, this.value1);
            }
            else if (index == 3){
                this.visitMethod = "即时通讯";
                this.visit_method(this.limitedTime, this.visitMethod, this.value1);
            }
            else{
                this.visitMethod = null;
                this.visit_method(this.limitedTime, this.visitMethod, this.value1);
            }
        },

        visit_method(limitedTime, visitMethod, value1, $event) {        //按拜访方式进行查询
            console.log('时间范围为', limitedTime, '拜访方式为', visitMethod, '升序为true/降序为false', value1);
            let params = {
                // staffId: this.staffId,
                // teamId: this.teamId,
                limitedTime: limitedTime,
                visitMethod: visitMethod,
                isASC: value1,
            }
            this.$store.dispatch("Visit/getData", params); 
        },

        getRecordList() {
            let params = {
                // staffId: this.staffId,
                // teamId: this.teamId,
                // contactId: this.contactId,
            }
            this.$store.dispatch("Visit/getData", params);
        },
    },

    created(){
        this.staffId = this.$route.query.staffId;
        this.teamId = this.$route.query.teamId;
        this.contactId = this.$route.query.contactId;
        this.from = this.$route.query.from;
    },

    mounted: function() {
        console.log("====查询拜访记录列表====");
        console.log("staffId为：", this.staffId, "teamId为", this.teamId);
        console.log("contactId为:", this.contactId);
        if(this.$route.query.from)
            this.$store.commit("Visit/setBack",this.$route.query.from);
        console.log(this.$store.state.Visit.back)
        this.getRecordList();
    }

}
</script>

<style scoped>
.dropout-time {
    margin-top: 0.3rem;
    font-size: 0.3rem;
    color: lightslategrey;
}
.dropout-range {
    margin-top: 0.3rem;
    font-size: 0.3rem;
    color: rgb(184, 187, 190);
}
.time-tags {
    margin-bottom: 0.3rem;
    margin-left: 0.5rem;
    /* padding: 0rem 0rem 0rem 0.3rem; */
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
.record-cell {
    margin: 0.2rem;
}
</style>