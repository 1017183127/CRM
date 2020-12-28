<template>
    <div>      
        <van-cell title="拜访记录" is-link style="background-color:#F5F5F5;font-size:0.4rem;color:#000000" @click="onClick"/>
        <div class="record-cell" v-for="item in visitRecordOrderedList" :key="item.visitRecordId">
                <van-cell @click="onClickCell(item.visitRecordId)">
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
export default {
    data() {
        return {

        }
    },
    computed:{
        visitRecordOrderedList:{
            get() {
                return this.$store.state.Visit.RecordList;
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
    mounted:function() {
    //   let params ={
    //             staffId: this.staffId,
    //             teamId: this.teamId,
    //             pageSize: 100,
    //   };
    //   this.$store.dispatch("Visit/getData",params);
    // //   this.visitRecordOrderedList=this.$store.state.staffVisitList.visitRecordOrderedList;
    console.log("====查询拜访记录列表====");
    console.log("staffId为：", this.staffId, "teamId为", this.teamId);
    this.getRecordList();
    
    },
    methods: {
        onClickCell(visitRecordId) {
            this.$router.push({
                path: '/Visit_record_display',
                query:{
                    staffId: this.staffId,
                    teamId: this.teamId,
                    VisitRecordId: visitRecordId,
                    from: "Staff_main",
                }
            })
        },
        onClick() {
            this.$router.push({
                path: '/Visit_main',
                query:{
                    from: "Staff_main",
                }
            })
        },
        getRecordList() {
            let params = {
                staffId: this.staffId,
                teamId: this.teamId,
                // contactId: this.contactId,
                pageSize: 100,
            }
            this.$store.dispatch("Visit/getData", params);
        },        

    },
//     filters: {
//     companyFullNameEllipsis (value) {
//       if (!value) return ''
//       if (value.length > 6) {
//         return value.slice(0,6) + '...'
//       }
//       return value
//     },
//     dutyEllipsis (value) {
//       if (!value) return ''
//       if (value.length > 4) {
//         return value.slice(0,4) + '...'
//       }
//       return value
//     }
//   }

};
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
    margin: 0.2rem 0rem 0.2rem 0rem;
}
</style>