<template>
	<view class="active">
		<!-- 文章内容 -->
		<view class="conteng">
			<block v-for="(item,index) in Articleend" :key="index">
				<view class="conteng-article">
					<view class="conteng-img">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<!-- 文字介绍 -->
					<view class="active-introduce">
						<view class="active-list">{{item.list}}</view>
						<view class="active-title">{{item.title}}</view>
						<view class="active-label">{{item.label}}</view>
					</view>
				</view>
			</block>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'article',
		props:{
			Articleend:Array
		},
		data(){
			return{
				
			}
		}
	}
	
</script>

<style>
		.active {
			margin: 0 20upx;
		}
		
		.conteng {
			display: flex;
			flex-wrap: warp;
			justify-content: space-between;
			width: 100%;
			-webkit-flex-wrap: wrap;
			overflow: hidden;
		}
		
		.conteng-article {
			width: 48%;
			flex-direction: column;
			display: flex;
			box-sizing: border-box;
		}
		
		.purchase {
			display: flex;
			align-items: center;
			padding-bottom: 10upx;
		}
		
		.conteng-img {
			height: 400upx !important;
			object-fit: cover;
			overflow: hidden;
		}
		
		.conteng-img image {
			width: 100% !important;
			height: 100% !important;
			object-fit: cover;
			border-radius: 10rpx;
		}
		
		.active-list {
			font-size: 32upx;
			color: #000000;
			margin: 0upx 0;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: ;
			overflow: hidden;
		}
		
		.active-title {
			font-size: 32upx;
			color: #4dd3ff;
			font-weight: bold;
			line-height: 50upx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		
		.active-label {
			font-size: 25upx;
			color:#d0b083 ;
		}
		
		.active-price {
			font-size: 36upx;
			color: #ff6b28;
			padding-right: 9upx;
		}
		
		.active-purchase {
			font-size: 30upx;
			color: #cacaca;
		}
		
		.active-introduce {
			padding-left: 10upx;
		}
</style>
