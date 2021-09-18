<template>
	<!-- 天气预报插件 -->
	<view class="mckou-weather-content">
		<view class="more-day-report">
			<view class="top-module">
				<view class="title">天气预报</view>
				<picker @change="bindPickerChange" :value="weatherTypeIndex" :range="weatherTypeArray">
					<view class="change">
						<label for="">{{ weatherTypeArray[weatherTypeIndex] }}</label>
						<view class="down-arrow"></view>
						<!-- <image src="../../static/weather/xiala.svg" mode=""></image> -->
					</view>
				</picker>
			</view>
			<view class="body-module">
				<view class="body-weather-line" v-show="weatherTypeIndex != 1">
					<canvas :style="{ width: cWidth + 'px', height: '100px' }" canvas-id="weather-canvas"></canvas>
				</view>
				<view v-if="weatherTypeIndex == 1" class="zhuzhuangtu">
					<view class="zhuzhuangtu-item" v-for="(item, index) in pillarArray" :key="index">
						<view class="item-bg">
							<view class="item" :style="{ top: item.top + 'px', height: item.height + 'px' }"></view>
						</view>
					</view>
				</view>
				<view class="body-item" v-for="(item, index) in weatherData" :key="index">
					<view class="day-font">{{ item.dayWeek }}</view>
					<view class="day-time">{{ item.dayLabel }}</view>
					<view class="weather-font">{{ item.weatherLabel }}</view>
					<view class="weather-image">
						<image :src="item.weatherIcon" mode=""></image>
					</view>
					<view class="max-weather">{{ item.max }}</view>
					<view class="weather-line"></view>
					<view class="min-weather">{{ item.min }}</view>
					<view class="feng-font">{{ item.wind}}</view>
					<view class="day-state">
						<label>{{ item.air }}</label>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				weatherTypeArray: ['折线', '柱状'],
				weatherTypeIndex: 0,
				cWidth: 345,
				pillarArray: []
			}
		},
		props: {
			weatherData: {
				type: Array
			}
		},
		methods: {
			init() {
				var that = this;
				uni.getSystemInfo({
					success: function(res) {
						that.cWidth = Math.round(res.windowWidth * 0.92);
					}
				});
				that.doLineOrPiller();
			},
			doLineOrPiller() {
				if (this.weatherTypeIndex == 1) {
					this.initWeatherPiller();
				} else {
					this.initWeatherPointLine();
				}
			},
			//处理折线图
			initWeatherPointLine() {
				var maxArry = this.weatherData.map(item => {
					return item.max;
				});
				var minArry = this.weatherData.map(item => {
					return item.min;
				});
				var max = [];
				var min = [];
				var maxWeather = Math.max(...maxArry);
				var minWeather = Math.min(...minArry);
				var diff = maxWeather - minWeather;
				for (var i = 0; i < maxArry.length; i++) {
					var height = Math.round(((maxArry[i] - minArry[i]) / diff) * 80);

					max[i] = 50 - Math.round((80 / diff) * (maxWeather - maxArry[i]) + 10);
					min[i] = max[i] - height;
				}

				var section7width = Math.round(this.cWidth / 7);
				var cvs = uni.createCanvasContext('weather-canvas',this);
				cvs.setStrokeStyle('#FB7821');
				cvs.setLineWidth(1);
				cvs.beginPath();
				for (var i = 0; i < max.length; i++) {
					var wendu = max[i];
					var x = Math.round(section7width / 2) + Math.round(section7width * i);
					var y = 50 - wendu;
					cvs.arc(x, y, 5, 0, 2 * Math.PI);
					cvs.setFillStyle('#FB7821');
					cvs.fill();
					cvs.moveTo(x, y);
					if (i < max.length - 1) {
						var nextX = x + section7width;
						var nextY = 50 - max[i + 1];
						cvs.lineTo(nextX, nextY);
					}
					cvs.stroke();
					cvs.beginPath();
				}

				cvs.setStrokeStyle('#1B9DFF');
				cvs.setLineWidth(1);
				for (var i = 0; i < min.length; i++) {
					var wendu = min[i];
					var x = Math.round(section7width / 2) + Math.round(section7width * i);
					var y = 50 - wendu;
					cvs.arc(x, y, 5, 0, 2 * Math.PI);
					cvs.setFillStyle('#1B9DFF');
					cvs.fill();
					cvs.moveTo(x, y);
					if (i < min.length - 1) {
						var nextX = x + section7width;
						var nextY = 50 - min[i + 1];
						cvs.lineTo(nextX, nextY);
					}
					cvs.stroke();
					cvs.beginPath();
				}
				cvs.draw();

			},
			//处理柱状图
			initWeatherPiller() {
				var maxArry = this.weatherData.map(item => {
					return item.max;
				});
				var minArry = this.weatherData.map(item => {
					return item.min;
				});
				var pillarArray = [];

				var max = Math.max(...maxArry);
				var min = Math.min(...minArry);
				var diff = max - min;
				for (var i = 0; i < maxArry.length; i++) {
					var height = Math.round(((maxArry[i] - minArry[i]) / diff) * 80);
					pillarArray.push({
						top: Math.round((80 / diff) * (max - maxArry[i])) + 10,
						height: height
					});
				}
				this.pillarArray = pillarArray;
			},
			bindPickerChange(e) {
				var index = e.target.value;
				if (index == 1) {
					this.initWeatherPiller();
				} else {
					this.initWeatherPointLine();
				}
				this.weatherTypeIndex = index;
			},
		}
	}
</script>

<style lang="scss">
	.mckou-weather-content {
		width: 750rpx;

		.more-day-report {
			// 690
			width: 92%;
			padding: 10rpx 4%;

			.top-module {
				width: 100%;
				padding: 16rpx 0;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #f3f3f3;

				.title {
					font-size: 32rpx;
					font-weight: bold;
					color: #262628;
				}

				.change {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					border: 1px solid #e4e4e4;
					padding: 6rpx 20rpx;
					border-radius: 40rpx;
					font-size: 28rpx;

					.label {
						color: #373739;
					}

					image {
						width: 26rpx;
						height: 26rpx;
						margin-left: 20rpx;
					}

					.down-arrow {
						width: 10px;
						height: 10px;
						margin-left: 10rpx;
					}

					.down-arrow:after {
						content: '';
						display: block;
						width: 5px;
						height: 5px;
						border-right: 2px solid #373739;
						border-top: 2px solid #373739;
						-webkit-transform: rotate(135deg);
						/*箭头方向可以自由切换角度*/
						transform: rotate(135deg);
					}
				}
			}

			.body-module {
				width: 100%;
				padding: 20rpx 0;
				display: flex;
				flex-direction: row;
				position: relative;

				.body-weather-line {
					position: absolute;
					width: 100%;
					height: 100px;
					left: 0;
					top: 270rpx;
					z-index: 1;
				}

				.zhuzhuangtu {
					position: absolute;
					width: 100%;
					height: 80px;
					left: 0;
					top: 270rpx;
					z-index: 1;
					display: flex;
					flex-direction: row;

					.zhuzhuangtu-item {
						width: 98rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						.item-bg {
							height: 80px;
							width: 20rpx;
							background-color: #f9f9f9;
							position: relative;

							.item {
								position: absolute;
								width: 100%;
								background: linear-gradient(to bottom, #a818cb, #4aa2f9);
								border-radius: 20rpx;
							}
						}
					}
				}

				.body-item {
					width: 98rpx;
					border-right: 1px solid #f3f3f3;
					display: flex;
					flex-direction: column;

					.day-font {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 28rpx;
						font-weight: bold;
						text-align: center;
					}

					.day-time {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 24rpx;
						text-align: center;
					}

					.weather-font {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 28rpx;
						text-align: center;
					}

					.weather-image {
						height: 50rpx;
						display: flex;
						justify-content: center;

						image {
							width: 50rpx;
							height: 50rpx;
						}
					}

					.max-weather {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 28rpx;
						text-align: center;
					}

					.min-weather {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 28rpx;
						text-align: center;
					}

					.weather-line {
						height: 100px;
					}

					.feng-font {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 28rpx;
						text-align: center;
					}

					.feng-type {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 28rpx;
						text-align: center;
					}

					.day-state {
						height: 50rpx;
						color: #ffffff;
						display: flex;
						justify-content: center;
						align-items: center;

						label {
							width: 80%;
							height: 40rpx;
							line-height: 40rpx;
							font-size: 28rpx;
							text-align: center;
							background-color: #0fa28e;
							border-radius: 40rpx;
						}
					}

					&:last-child {
						border-right: none;
					}
				}
			}
		}
	}
</style>
