<template>
	<view>
		<!-- 定位所在区域 -->
		<view class="address" @click="chooseMaps()">
			<view class="address-img" >
				<image src="cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/旅游景区地图.jpg" mode="aspectFill"></image>
			</view>
			<view class="address-list">
				<!-- 点击定位-->
				<view class="address-text" >
					<text class="words" @click="dinwei()">{{address}}</text>
					<image src="cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/定位.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 阴影 -->
			<view class="back"></view>
		</view>
		<!-- 天气  @click="TopWeather()" -->
		<view class="Plane" @click="TopWeather()">
			<image src="cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/天气预报.jpg" mode="widthFix"></image>
		</view>
	</view>
</template>


<script>
	export default {
		name: 'add',
		props: {
			address: String
		},

		methods:{
			chooseCity(){
				uni.navigateTo({
					url:'../city/city'
				})
			},
			//点击天气预报跳转到天气页面
			TopWeather(){
				uni.navigateTo({
				url:'../weather/weather'
				//url:'../weather/weather'
				})
			},
			chooseMaps(){
				uni.navigateTo({
					url:'../index/map'
				})
			},
			//点击定位显示位置
			dinwei(){
				console.log(this.address)
			}
		}
	}
</script>

<style scoped>
	.address-text {
		display: flex;
		align-items: center;
	}

	.address-text image {
		width: 33upx;
		height: 33upx;
		padding-left: 30upx;
	}

	.address {
		position: relative;
		height: 400upx;
	}

	.address-list {
		position: absolute;
		left: 10upx;
		top: 10upx;
		z-index: 999;
	}

	.address-img {
		width: 100%;
		height: 400upx;
	}

	.address-img image {
		width: 750rpx !important;
		height: 400upx;
	}

	.words {
		font-size: 40upx;
		color: #000000;
		font-weight: bold;
	}

	.words-eng {
		font-size: 40upx;
		color: #0000b3;
	}

	.back {
		/* background: rgba(0, 21, 0, 0.1); */
		position: absolute;
		top: 0;
		left: 0;
		height: 400upx;
		width: 100%;
	}

	/* 天气 */
	.Plane image {
		/* height:20%;display:flex;justify-content:center; */
		width: 100%;
		border-radius: 20upx;
		height: 150upx;

	}

	.Plane {
		margin: 40upx 20upx;
		height: 150upx;
	}
</style>
