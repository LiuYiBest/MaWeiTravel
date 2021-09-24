<template>
	<!-- 个人中心 -->
	<view class="center">
		<view class="center_top">
			<view class="mask"></view>
		</view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<block v-for="(item,index) in username" :key="index">
					<view class="wx-name" v-if="wxlofin">
						<view>
							<!-- 头像 -->
							<image :src="item.avatarUrl"></image>	
						</view>
						<!-- 登录名 -->
						<view class="wx-text">
							<text>{{item.nickName}}</text>
						</view>
					</view>
					</block>
					<!-- 未登录 -->
					<view class="wx-button" v-if="!wxlofin">
						<view>
							<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">微信登录</button>
						</view>
					</view>
				</view>
				
				<!-- 第一排图标的跳转页面 -->
				<view class="order_status"  >
					<!-- @click="formstatus()" -->
					<view class="status"  v-for="item in status"  @click="tiaozhuan(item.key)">
						<image class="icon" :src="item.url" mode="aspectFill"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			
			<view class="baiban">

			</view>
			<!-- 下列消息 -->
			<view class="center_menu">
				<view class="menu_item" v-for="item in menus"  @click="xiatiao(item.key)">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		</view>
</template>

<script>
	var db = wx.cloud.database()
	var users = db.collection('user')
	// 引进公用登录js
	import {login} from '../../common/list.js'
	export default {
		data() {
			return {
				wxlofin: false,
				username:[],
					
				status: [
					{
						key: 1,
						name: '抽奖中心',
						url: 'cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/活动.svg'
					},
					{
						key: 2,
						name: '签到日历',
						url: 'cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/圈子管理.svg'
					},
					{
						key: 3,
						name: '问题反馈',
						url: 'cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/旅游.svg'
					},
				],
				menus: [{
						name: '全部订单',
						icon: 'cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/收藏.svg',
						key: 1,
					},
					{
						name: '商品列表',
						icon: 'cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/商品.svg',
						key: 2,
					},
					{
						name: '关于小程序',
						icon: 'cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/感叹号.svg',
						key: 3,
					}
				]
			};
		},
		methods:{		 
					 tiaozhuan(key){
						 //抽奖页面
						if(key==1){
							 uni.navigateTo({
								url:'choudemo'
							 })
						 }
						 //活动签到跳转
						if(key==2){
							 uni.navigateTo({
								url:'sigin-in'
							 })
						}
						//问题反馈
						if(key==3){
							 uni.navigateTo({
								url:'shoucan'
							 })
						}
							
					 },
					 xiatiao(key){
						 //订单
						 if(key==1){
						 	 uni.navigateTo({
						 		url:'shop'
						 	 })
						  }
						  //商品列表
						  if(key==2){
						  	 uni.navigateTo({
						  		url:'guanyu'
						  	 })
						   }
						   //相关声明
						   if(key==3){
						   	 uni.navigateTo({
						   		url:'statement'
						   	 })
						    }
						  
					 },
					 
					getUserInfo(event){
						console.log(event)
						let user = event.detail.userInfo
						login(user)
						.then((res)=>{
							this.ifUser()
						})
						.catch((err)=>{
							console.log(err)
						})
					},
					
					
					// 请求数据库看看用户有没有登录
					ifUser(){
						users.get()
						.then((res)=>{
							console.log(res)
							if(res.data.length === 0){
								// 没有登陆过
								this.wxlofin = false
							}else{
								this.wxlofin = true
								this.username = res.data
							}
						})
						.catch((err)=>{
							console.log(err)
						})
					}
				},
				
				// 判断用户是否登录
				onShow() {
					console.log('123')
					// 请求数据库看看用户有没有登录
					this.ifUser()
				}
			}
</script>

<style  lang="scss">
	// 登录样式
	.myhome{background: linear-gradient(to top, #ffe566 10%, #ffd300 100%); height: 350upx; display: flex; align-items: center;}
		.wx-name image{width: 120upx !important; height: 120upx !important; border-radius: 50%; margin-right: 20upx;
						border: 10rpx solid #999999;}
		text{display: block; margin: 10upx 0; color: #999999;}
		.wx-name{display: flex; align-items: center; padding: 0 30upx; align-content: center;
				height: 200upx;}
		.wx-text text:nth-child(1){font-size: 35upx;}
		.wx-text text:nth-child(2){font-size: 20upx; border: 1px solid #FFFFFF;
									padding: 7upx;
									border-radius: 50upx;
									text-align: center;}
		/* 登录 */
		.wx-button button{border: none;font-size: 30upx; background: linear-gradient(to right, #28a6f1 10%, #0e8dd7 80%);
		 border-radius: 50upx;
		color: #FFFFFF;}							
		.wx-button-view{font-size: 35upx; color: #FFFFFF; margin-bottom: 25upx;}
		.wx-button{margin: 0 auto;}
	
	// 界面样式
	page {
		height: 100%;
	}


	
	.profily{
		border-radius: 8px;
	}

	.center {
		height: 100%;

		&_top {
			height: 18%;
			// background-color: #FFFFFF
			// background: url('../../static/fumou-center-template/header.jpg') no-repeat 0% 50%;
			background-size: cover;

			background: #e5f7ff;
			.mask {
				background: rgba(0, 0, 0, 0);
				height: 100%;
			}
		}

		&_box_bg {
			background: #F9F9F9;
			position: relative;

			.profily {
				position: absolute;
				width: 90%;
				// border:1px solid #F7F7F7;
				margin: 0 auto;
				top: -100upx;
				left: 5%;
				background: #FEFEFE;
				padding: 35upx;
				box-sizing: border-box;
				box-shadow: 0px 2px 5px #EDEDED;
			}
		}
	}

	.base {
		display: flex;
		align-items: center;
		border-bottom: 2px solid #F6F6F6;
		// padding-bottom: 35upx;
		position: relative;
		.profily_header {
			height: 120upx;
			width: 120upx;
			background-image: url('../../static/fumou-center-template/header.jpg');
			background-size: 100%;
		}

		text {
			margin-left: 20px;
			font-size: 30upx;
		}
		
		image{
			position: absolute;
			height: 40upx;
			width: 40upx;
			right: 0px;
			top:0px;
		}
	}

	.order_status {
		display: flex;
		justify-content: space-between;
		margin-top: 35upx;

		.status {
			width: 140upx;
			font-size: 24upx;
			text-align: center;
			letter-spacing: .5px;
			display: flex;
			flex-direction: column;
			.icon {
				width: 50upx;
				height: 50upx;
				margin: 0 auto;
				margin-bottom: 5px;
				
			}
		}
	}

	.baiban {
		background: #FEFEFE;
		height: 300upx;
	}

	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: 28upx;
			letter-spacing: 1px;
			padding: 14px 5%;
			background: #FEFEFE;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			border-bottom: 1px solid #EFEFEF;

			&:hover {
				background: #F6F6F6 !important;
			}

			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background:  no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 10px;
			}

			image {
				width: 40upx;
				height: 40upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
</style>
