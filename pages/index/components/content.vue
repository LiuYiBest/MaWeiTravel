<template>
	<view>
		<!-- 景点滑动置顶组件 -->
		<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
			<view>
				<block v-for="(item, index) in tab" :key="index">
					<view class="list-cont" @click="tbas(index,item.nav)" :class="{active: index == num}">
						<view>
							<text class="con-text-a">{{ item.name }}</text>
						</view>
						<view>
							<text class="con-text-b" :class="{activeb: index == num}">{{ item.title }}</text>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	//引入攻略列表的数据库接口
	import {
		homelist
	} from '../../../common/cloundfun.js'
	export default {
		name: "tab",
		props: {
			tab: Array
		},
		data() {
			return {
				num: 0,
			}
		},
		methods: {
			//点击下个图标更改样式
			tbas(index,nav) {
				// console.log(nav) //测试NAV数据
				this.num = index
				//请求数据库
				homelist(nav)
					.then((res) => {
						// vuex传值 
						let listdata = res.data
						this.$store.commit('listmuta', listdata)
					})
					.catch((err) => {
					console.log(err)
					})
			}
		}
	}
</script>

<style scoped>
	.active {
		background-image: linear-gradient(to right, #b3ffff 10%, #33d6ff 90%);
		border-top-right-radius: 50upx;
		border-top-left-radius: 50upx;
		border-bottom-left-radius: 50upx;
		border-bottom-right-radius: 50upx;
	}

	.activeb {
		color: #292c33 !important;
	}

	.scroll {
		white-space: nowrap;
		width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		background: #FFFFFF;
		padding: 20upx 0;
	}

	.con-text-a {
		color: #292c33;
		font-size: 30upx;
		font-weight: bold;
	}

	.con-text-b {
		color: #9ea0a5;
		font-size: 23upx;
	}

	.list-cont {
		width: 180upx;
		display: inline-block;
		text-align: center;
	}
</style>
