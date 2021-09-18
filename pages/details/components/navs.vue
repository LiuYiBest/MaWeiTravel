<template>
	<view>
		<!-- 导航锚点 -->
		<view class="navs">
			<block v-for="(item,index) in navelue" :key="index">
				<text :class="{activetext:index == num}" @click="navbtn(index)">{{item.name}}</text>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		name:'navs',
		data(){
			return{
				num:0,
				navelue:[
					{
						'name':'景点',
					},
					{
						'name':'文章',
					},
					{
						'name':'评价',
					}
				]
			}
		},
	
	methods:{
			navbtn(index){
				this.num = index
				// console.log(index)
				if(index === 0){
					this.backTop()
				}else{
					this.$parent.fatherTab(index)
				}
			},
			
			// 回到顶部
			backTop(){
				wx.pageScrollTo({
					scrollTop:0, //回到顶部
					duration:300   //速度
				})
			}
			
		}
	}
	
	
</script>

<style scoped>
	.navs text{display: block; font-size: 35upx; width: 150upx; text-align: center; color: #000000;}
	.navs{display: flex; justify-content: center; height: 30px; line-height: 35px; padding: 5upx 0;}
	.activetext{border-bottom: 4upx solid #3d3b32;}
</style>