<template>
	<view>
		<view class="warp" v-show="modaishow" >
			<view class="warp-view">
				<view class="warp-text">{{message}}</view>
				<view class="warp-flex">
					<button plain="true" @click="messcancel()">取消</button>
					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
				</view>
			</view>
		</view>
		<!-- 及时反馈组件 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>


<script>
	// 引入公用存储用户登录
	import {login} from '../common/list.js'
	//引入顶部信息提示组件
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	
	export default{
		name:'modals',
		components: {HMmessages},  //注册组件使用
		data(){
			return{
				modaishow:false,	
				message:'',
			}
		},
		methods:{
			//取消模态框
			messcancel(){
				this.modaishow = false
			},
			init(message){
				this.modaishow = true
				this.message = message
			},
			// 发起登录取到用户信息
			getUserInfo(event){
				console.log(event)
				 this.modaishow = false //隐藏模态框
				// 存储用户信息到user数据库
				let user = event.detail.userInfo
				login(user)
				.then((res)=>{
					console.log(res)
					//登录成功弹出提示框
					this.HMmessages.show('登录成功',{fontColor:'rgb(51, 77, 77)',icon:'success',background:'rgba(204, 238, 255,0.8)'})
				}).catch((err)=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	/* 模态弹窗布局 */
	.warp {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		/* background: rgb(179, 217, 255); */
		background: rgba(0, 0, 0, 0.6);
		z-index: 9999;
	}

	.warp-view {
		width: 500upx;
		height: 200upx;
		background: #FFFFFF;
		margin: auto;
		position: absolute;
		-webkit-position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 8upx;
		overflow: hidden;
	}

	.warp-text {
		text-align: center;
		margin-top: 30upx;
		font-size: 34upx;
		color: #666666;
	}

	.warp-flex {
		display: flex;
		justify-content: space-around;
		border-top: 1upx solid #EEEEEE;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
		-webkit-transform: translateZ(0);
	}

	.warp-flex button {
		border: none;
		font-size: 30upx;
	}
</style>
