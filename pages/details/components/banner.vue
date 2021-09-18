<template>
	<view>
		<!-- banner 轮播图-->
		<view class="banner-posi">
			<view>
				<swiper :indicator-dots="true"  :interval="3000" :duration="1000" :circular="true" 
				indicator-color="rgba(255, 255, 255)" indicator-active-color="#00ff00"
				>
					<block v-for="(item,index) in imgArray" :key="index">
					<swiper-item>
						<view class="swiper-item">
							
							<image :src="item" mode="aspectFill" class="imageurl" ></image>
						</view>
					</swiper-item>
					</block>
				</swiper>
			</view>
			
			</view>
				<view class="volume">
					<text>图片预览</text>
				</view>
			</view>
		
	</view>
</template>

<script>
	
	export default{
		name:'banner',
		props:{
			detaildata:Object,
			
		},
		data(){
			return{
				imgArray:[]
			}
		},
		
		methods:{
		},
		
		// 取到数组的前三张图片
		watch:{
			detaildata(newvalue,oldvalue){
				// console.log(newvalue.staticimg.slice(0,3))
				this.imgArray = newvalue.staticimg.slice(0,5)
			}
		}, 
	}
	
</script>

<style scoped>
	
		/* 轮播 */
		.imageurl{width: 100%; height: 500upx !important;}
		swiper{height: 500upx !important;}
		.banner-num{background: #333333; width: 100upx; color: #ffffff; text-align: center;
		border-radius: 15upx;
		font-size: 25upx;
		height: 40upx;
		line-height: 40upx;
		position: absolute;
		right: 20upx;
		bottom: 20upx;}
		.banner-posi{position: relative; height: 500upx;}
		/* 标题 */
		.cont-back{padding: 20upx; background: #FFFFFF;}
		.title-con{color: #333333; font-size: 35upx; font-weight: bold; line-height: 1.5;
		 padding-bottom: 30upx;}
		 
		 .volume{font-size: 25upx; color: #999999;
				display: flex; justify-content:space-between;}
		 .volume text{display: block;}
</style>
