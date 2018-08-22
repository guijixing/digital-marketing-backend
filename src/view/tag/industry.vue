<style lang="less">
@import "../excel/common.less";
</style>
<template>
	<div>
        <Tabs size="small" v-model="tab" @on-click="clickTab">
                <TabPane name="app" label="APP标签">
                    <tab-industry tab-name="app"></tab-industry>
                </TabPane>
                <TabPane name="www" label="网站标签">
                    <tab-industry tab-name="www"></tab-industry>
                </TabPane>
                <TabPane name="call" label="通话标签">
                    <tab-industry tab-name="call"></tab-industry>
                </TabPane>
            </Tabs>
    </div>
</template>
<script>
import tabIndustry from './tab-industry'
export default {
  data () {
    return {
      tab: 'app'
    }
  },
  components: {
    tabIndustry
  },
  beforeMount () {

  },
  methods: {
    clickTab () {
      console.log(this.tab)
    }
  }

}
</script>
