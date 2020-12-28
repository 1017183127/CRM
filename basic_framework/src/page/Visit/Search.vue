<template>
    <div>
        <van-sticky>
            <form action="/">
                <van-search
                    v-model="value"
                    show-action
                    action-text="返回"
                    placeholder="请输入搜索关键词"
                    @search="onSearch(staffId, teamId, value)"
                    @clear="onClear"
                    @cancel="onCancel"
                />
            </form>
        </van-sticky>
        <!-- 信息记录部分Cell_1 -->
        <div class="record-cell" v-for="item in list" :key="item.visitRecordId" @click="onClickCell(item.visitRecordId, item.contactId, staffId, teamId)">
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
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    name: "Search",
    data() {
        return{
            value: null,
            //staffId: null,
            //teamId: null,
        }
    },
    computed: {
        list : {
            get() {
                return this.$store.state.Visit.RecordListByKeywords;
            }
        }, 
        staffId : {
            get() {
                return this.$store.state.staffInfo.staffId;
            }
        },
        teamId : {
            get() {
                return this.$store.state.staffInfo.teamId;
            }
        }
    },
    methods:{
        onSearch(staffId, teamId, val) {
            let params = {
                staffId: staffId,
                teamId: teamId,
                keyword: val,
            }
            this.$store.dispatch("Visit/SearchByKeywords", params);
        },
        onCancel() {
            this.$store.dispatch("Visit/EmptyRecordListByKeywords");
            if(this.$store.state.Visit.back_search == "Visit_main"){
                this.$router.push({
                    path: '/Visit_main',
                    query:{
                        staffId: this.staffId,
                        teamId: this.teamId,
                    }
                })
            }
            else if (this.$store.state.Visit.back_search == "Visit_main_leader") {
                this.$router.push({
                    path: '/Visit_main_leader',
                    query:{
                        // staffId: this.staffId,
                        // teamId: this.teamId,
                    }
                })                
            }
            else{
                this.$router.go(-1);
            }
        },
        onClear(){
            this.$store.dispatch("Visit/EmptyRecordListByKeywords");
        },
        onClickCell(visitRecordId, contactId, staffId, teamId) {
            this.$store.dispatch("Visit/EmptyRecordListByKeywords");
            this.$router.push({
                path: "/Visit_main/Visit_record",
                query:{
                    staffId: staffId,
                    teamId: teamId,
                    VisitRecordId: visitRecordId,
                    contactId: contactId,

                    from: "Search",
                    keyword: this.value,
                }
            })
        },
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
    created() {
        //this.staffId = this.$route.query.staffId;
        //this.teamId = this.$route.query.teamId;
        this.value = this.$route.query.keyword;
    },
    mounted:function(){
        if(this.value){
            let params = {
                staffId: this.staffId,
                teamId: this.teamId,
                keyword: this.value,
            }
            this.$store.dispatch("Visit/SearchByKeywords", params);
        }
        if(this.$route.query.from){
            this.$store.commit("Visit/setBack_search", this.$route.query.from);
        }
    },
}
</script>

<style scoped>
.custom-name {
    font-size: 0.5rem;
    /* font-weight: bold; */
    font-family: Microsoft YaHei 
}
.custom-company {
    font-size: 0.4rem;
    font-family: Microsoft YaHei
}
.custom-position {
    font-size: 0.4rem;
    color: grey;
    font-family: Microsoft YaHei
}
.custom-date {
    font-size: 0.15rem;
    color: grey;
    font-family: Microsoft YaHei;
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