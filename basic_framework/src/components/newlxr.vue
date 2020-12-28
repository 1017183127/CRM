<!-- 组件说明 -->
<template>
  <div class>
    
    <van-cell title="近期新增联系人" is-link style="background-color:#F5F5F5;font-size:0.4rem;color:#000000" />
    <!--内容-->
    <van-row type="flex" justify="center" style="background-color: #F5F5F5;align-items: center;">
      <van-col>
                <div class="record-cell" v-for="(items,idx) in lianxiren" :key="idx" @click="toContacts_detail(idx)" style="padding-bottom:0.2rem;">
                    <van-cell center style="width:9.5rem;">
                        <template #title>
                        <van-row type="flex">
                          <van-col span="6">
                            <span style="font-size:.5rem;">{{items.name}}</span>
                          </van-col>
                          <van-col span="18" style="align-self: flex-end;">
                            <span style="color:black;font-size:.4rem;">{{items.companyFullName}}</span>
                            <span>&nbsp;&nbsp;</span>
                            <span style="color:grey;font-size:.4rem;">{{items.duty}}</span>
                          </van-col>
                        </van-row>
                        </template>

                        <template #label>
                          <van-row>
                            <van-col v-for="tag in items.tagList" :key="tag.tagId">
                              <van-tag plain type="warning" v-if="tag.isFixed&&tag.value!=''">
                                {{tag.value}}
                              </van-tag>
                              <van-tag plain type="default" v-if="!tag.isFixed&&tag.value!=''">
                                {{tag.value}}
                              </van-tag>
                              <span>&nbsp;</span>
                            </van-col>
                          </van-row>
                          <br>
                            <van-row type="flex">
                            <van-col span="20"></van-col>
                            <van-col span="4" >
                                <van-button round type="info" size="small" style="height:.65rem;" @click.stop="toVisit_repeat(items)">+&nbsp;拜访</van-button>
                            </van-col>
                          </van-row>
                        </template>
                    </van-cell>
                </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
    }
  },
  computed: {
    lianxiren:{
      get(){
        return this.$store.state.lxrlist.lx;
      }
    }
  },
  methods: {
    toContacts_detail(idx)
    {
      this.$router.push(
        {
          name: 'Contacts_detail',
          query: {
                  from:"Staff_main",
                  id: idx
                }
        });
    },
    toVisit_repeat(x)
    {
      //console.log(x)
      this.$router.push(
        {
          name: 'Visit_repeat',
          query: {
                  from:'Staff_main',
                  n:x.name,
                  c:x.companyFullName,
                  p:x.position,
                  contactId:x.contactId,
                  staffId:this.$store.state.staffInfo.staffId,
                  teamId:this.$store.state.staffInfo.teamId,
                }
        });
    }
  }
};
</script>

<style scoped>
</style>