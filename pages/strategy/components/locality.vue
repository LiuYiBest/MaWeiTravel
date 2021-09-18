<template>
	<view>
			<view class="locality">
			</view>	
			<!-- tab -->
			<view class="menu-block">
				<block v-for="(item,index) in citytab" :key="index">
					<view :class="{activetext:index == num}" @click="menubtn(index,item.name)">{{item.name}}</view>
				</block>	
			</view>
			
		</view>
</template>

<script>
	export default{
		name:'local',
		data() {
			return {
				num:0,
				citytab:[
					{
						"name":'全部'
					},
					{
						"name":'公园'
					},
					{
						"name":'纪念馆'
					},
					{
						"name":'博物馆'
					},

				]
			}
		},
		
		methods:{
			//景点下标
			menubtn(index,name){
				
				this.num = index
				// 用子组件调用父组件方法
				this.$parent.fatherMethod(name)
			}
		}
		
	}
</script>

<style scoped>
	.locality{margin:140upx 20upx;}
		.title{color: #1a8cff; font-size: 50upx;}
		.activetext{color: #4CD964; background: #4dd2ff !important; border: 1px solid #4d88ff !important;}
		.menu-block view {
			
			background: #ffffff;
			border: 1px solid #c2c5cc;
			border-radius: 6upx;
			font-size: 25upx;
			color: #292c33;
			font-weight: bold;
			text-align: center;
			padding: 15upx;
			margin: 20upx;
		}
		
		.menu-block {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			flex-wrap: wrap;
		}
</style>
