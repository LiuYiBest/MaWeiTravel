<template>
	<view>
		<!-- 文章图片视频介绍 -->
		<view class="cont-introduce cont-back">
			<view class="img-video">内容详情</view>
			<view class="img-video">{{detaildata.tipsdata}}</view>
			<view>
				<video objectFit="fill" v-if="videoing" :src="staticvideo" ></video>
				<view>
				<block v-for="(items,index) in detaildata.staticimg" :key="index">
				<image :src="items" mode="widthFix"></image>
				</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'matter',
		props:{
			detaildata:Object
		},
		data() {
			return {
				videoing:false,
				staticvideo:'',
				tipsdata:''
			}
		},
		watch:{
			detaildata(newvalue,oldvalue){
				if(newvalue.staticvideo != ''){
					console.log(newvalue.staticvideo)
					this.staticvideo = newvalue.staticvideo
					this.videoing = true
				}else{
					this.videoing = false
					console.log('没有视频')
				}			
			}
		}
	}
</script>

<style scoped>
	/* 图文视频 */
	.cont-back{padding: 20upx; background: #FFFFFF;}
	.cont-introduce{margin-top: 20upx;}
	.img-video{color: #333333; font-size: 30upx; font-weight: bold; padding: 20upx 0;}
	.cont-introduce video,image{width: 100%;}
	.cont-introduce video{margin-bottom: 20upx;}
</style>
