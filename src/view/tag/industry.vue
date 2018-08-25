<style lang="less">
@import "../excel/common.less";
</style>
<template>
	<div>
        <Tabs size="small" v-model="tab" @on-click="clickTab">
            <TabPane v-for="item in tabs" :name="item.id" :label="item.name">
                <tab-industry :tab-name="item.id"></tab-industry>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import tabIndustry from "./tab-industry";
import tagsApi from "@/api/tags";
const api = new tagsApi();

export default {
  data() {
    return {
      tags:[],
      tab: "",
      loading: true
    };
  },
  components: {
    tabIndustry
  },
  beforeMount() {
    api
      .getOperationList()
      .then(res => {
        this.loading = false;
        this.tags = res.data;
        this.tab = res.data[0].id;
      })
      .catch(err => {
        this.loading = false;
      });
  },
  methods: {
    clickTab() {
      console.log(this.tab);
    }
  }
};
</script>
