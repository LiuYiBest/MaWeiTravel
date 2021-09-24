<template>
	<!-- 景区文字表格 -->
	<view style="margin: 0 20upx;">
		<view class="conteng">
			<block v-for="(item, index) in tables" :key="index">
				<view>
					<text class="tick">{{ item.tick }}</text>
					<text class="nametext">{{ item.nametext }}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'classify',
		data() {
			return {
				tables: [{
						tick: '罗星塔',
						nametext: '罗星公园'
					},
					{
						tick: '纪念馆',
						nametext: '海战纪念馆'
					},
					{
						tick: '昭忠祠',
						nametext: '马限山东南麓'
					},
					{
						tick: '邓世昌',
						nametext: '马尾船政学堂'
					}

				]
			};
		}
	};
</script>

<style scoped>
	.conteng {
		display: flex;
		flex-wrap: warp;
		width: 100%;
		-webkit-flex-wrap: wrap;
		overflow: hidden;
		border: 1rpx solid #EEEEEE;
		border-radius: 10rpx;
	}

	.conteng view {
		width: 25%;
		flex-direction: column;
		align-items: center;
		display: flex;
		box-sizing: border-box;
		padding: 20upx 0;
	}

	.tick {
		font-size: 30upx;
		color: #00AAFF;
		font-weight: bold;
	}

	.nametext {
		font-size: 23upx;
		color: #000033;
	}
</style>
