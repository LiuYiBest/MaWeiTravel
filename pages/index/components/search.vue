<template>
	<view>

		<!-- 搜索框-->
		<view class="search-cont">
			<view class="search-code">
				<!-- <image src="cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/扫码.svg" mode="widthFix"></image> -->
			</view>
			<!-- 搜索内容 -->
			<view class="search" @click="searchPage()">
				<image src="cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/搜索.svg" mode="widthFix" class="search-img"></image>
				<input type="text" placeholder="搜索攻略" disabled />
			</view>
			<view class="search-code">
				<image></image>
			</view>
		</view>

		<!-- 官方实例 -->
		<!-- <view>
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item>
								<view class="swiper-item uni-bg-red">A</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-green">B</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">C</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view> -->
			<!-- 轮播图组件 -->
			<view>
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" indicator-color="rgba(255, 255, 255)"
				 indicator-active-color="#80E0ff">
					<!-- 使用bolck报错script错误 -->
					<swiper-item v-for="(item,index) in topSwiper" :key="index">
						<view class="swiper-item">
							<image :src="item.imgsrc" mode="aspectFill" class="imageurl"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
</template>

<script>
	export default {
		name: 'search',
		data() {
			return {
				topSwiper: [
					
					{
						imgsrc: require('../../../static/tab/轮播图1.jpg')
					},
					{
						imgsrc: require('../../../static/tab/轮播图2.jpg')
					},
					{
						imgsrc: require('../../../static/tab/轮播图3.jpg')
					},
					{
						imgsrc: require('../../../static/tab/轮播图4.jpg')
					},
					{
						imgsrc: require('../../../static/tab/轮播图5.jpg')
					}
				]
			}
		},
		methods:{
			searchPage(){
				uni.navigateTo({
					url:'../search/search'
				})
			}
		}
	};
</script>

<style scoped>
	.search-code image {
		width: 50upx;
		height: 50upx;
	}

	.search-code {
		width: 50upx;
		height: 50upx;
		padding: 0 15upx;
	}

	.search-img {
		margin: auto 0 auto 20upx;
		width: 40upx;
		height: 40upx;
	}

	.search {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		display: flex;
		flex-direction: flex;
		background: #FFFFFF;
		border-top-left-radius: 50upx;
		border-bottom-left-radius: 50upx;
		border-bottom-right-radius: 50upx;
		border-top-right-radius: 50upx;
	}

	.search input {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		font-size: 30upx;
		color: #666666;
	}

	.search-cont {
		display: flex;
		justify-content: space-between;
		height: 70upx;
		align-items: center;
		background: linear-gradient(to top, #99CCFF 20%, #4DB8FF 90%);
		padding: 30upx 0;
	}

	/* 轮播样式 */
	.imageurl {
		width: 100%;
		height: 300upx !important;
	}

	swiper {
		height: 300upx !important;
	}
</style>
