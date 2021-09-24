<template>
	<!-- 天气折线图 -->
	<view class="content">
		<mckou-weather :weatherData="weatherData" ref="mckouWeather"></mckou-weather>
	</view>
</template>

<script>
	import mckouWeather from '@/components/mckou-weather/mckouWeather.vue';

	export default {
		data() {
			return {
				title: 'Hello',
				weatherData: [{
					dayWeek: "周二",
					dayLabel: "8/11",
					weatherLabel: "阴",
					weatherIcon: "http://file.powerecs.com/fileserver/fileserver/icon1.png",
					max: 34,
					min: 27,
					wind: "西南风",
					air: "良"
				}, {
					dayWeek: "周三",
					dayLabel: "8/12",
					weatherLabel: "阴",
					weatherIcon: "http://file.powerecs.com/fileserver/fileserver/icon1.png",
					max: 34,
					min: 27,
					wind: "西南风",
					air: "良"
				}, {
					dayWeek: "周四",
					dayLabel: "8/13",
					weatherLabel: "阴",
					weatherIcon: "http://file.powerecs.com/fileserver/fileserver/icon1.png",
					max: 36,
					min: 27,
					wind: "西南风",
					air: "良"
				}, {
					dayWeek: "周五",
					dayLabel: "8/14",
					weatherLabel: "阴",
					weatherIcon: "http://file.powerecs.com/fileserver/fileserver/icon1.png",
					max: 35,
					min: 26,
					wind: "西南风",
					air: "良"
				}, {
					dayWeek: "周六",
					dayLabel: "8/15",
					weatherLabel: "阴",
					weatherIcon: "http://file.powerecs.com/fileserver/fileserver/icon1.png",
					max: 35,
					min: 28,
					wind: "西南风",
					air: "良"
				}, {
					dayWeek: "周日",
					dayLabel: "8/16",
					weatherLabel: "阴",
					weatherIcon: "http://file.powerecs.com/fileserver/fileserver/icon1.png",
					max: 38,
					min: 28,
					wind: "西南风",
					air: "良"
				}, {
					dayWeek: "周一",
					dayLabel: "8/17",
					weatherLabel: "阴",
					weatherIcon: "http://file.powerecs.com/fileserver/fileserver/icon1.png",
					max: 37,
					min: 26,
					wind: "西南风",
					air: "良"
				}]
			}
		},
		components: {
			mckouWeather
		},
		onLoad() {
			var that = this;
			that.$nextTick(() => {
				that.$refs.mckouWeather.init();
			});
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
