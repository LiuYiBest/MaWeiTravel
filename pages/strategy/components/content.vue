<template>
	<!-- 文章内容 -->
	<view class="active">
			<view class="conteng">
				<block v-for="(item,index) in localdata" :key="index">
				<view class="conteng-article newing" @click="localCont(item.id)">
					<view  class="conteng-img">
						<block v-for="(itemimg,index) in item.datainfo.staticimg" :key="index" v-if="index==0">
							<image :src="itemimg" mode="aspectFill"></image>	
						</block>
					</view>
					<!-- 文字介绍 -->
					<view class="active-introduce">
						<view class="active-name">{{item.datainfo.titledata}}</view>
						<view class="active-title">{{item.datainfo.tipsdata}}</view>
					</view>	
						<view class="purchase userinfo">
							<image :src="item.datainfo.avatarUrl" mode="widthFix"></image>
							<text class="active-purchase">{{item.datainfo.nickName}}</text>
						</view>
				</view>
				</block>
			</view>
		</view> 
</template>

<script>
	export default{
		name:'cont',
		props:{
			localdata:Array
		},
		data() {
			return {
				
			}
		},
		methods:{
			localCont(id){
				uni.navigateTo({
					url:'../details/detalis?id=' + id
				})
			}
		}
	}
</script>

<style scoped>
	@import "../../../common/uni.css";
	/* 用户 */
	.userinfo image{width: 50upx; height: 50upx; border-radius: 50upx;}
	.userinfo text{padding-left: 20upx;}
	.userinfo{padding-top: 20upx;}
	.newing{padding-bottom: 30upx;}
</style>
