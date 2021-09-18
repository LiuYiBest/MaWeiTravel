<template>
	<view>
		<!-- 评论留言区 -->
		<view class="cont-message cont-back">
			<view class="img-video" >评论区({{leaveword.length}})</view>
			<!-- 分类 -->
			<view class="menu-block">
				<block v-for="(item,index) in newmessage" :key="index">
					<!-- @click="menubtn(index,item) -->
					<view :class="{ activetext: index == num }" >{{item}}</view> 
				</block>
			</view>
			<!-- 评价 -->
			<block v-for="(item,index) in leaveword" :key="index">
			<view class="message-dist">
				<view class="users-message">
					<view class="cont-name">
						<image :src="item.avatarUrl" mode="widthFix"></image>	
						<text>{{item.nickName}}</text>
					</view>
					<!-- 时间 -->
					<view class="message-time">
						{{item.time}}
					</view>
				</view>	
				<view class="cont-name-text">
					<text>{{item.usermess}}</text>
				</view>
			</view>
			</block>
		</view>
		
		<!-- 评论按钮 -->
		<view class="evaluation" @click="popup()">
			<input type="text" placeholder="评论" disabled="disabled"/>
		</view>
	
		<!-- 评论框 -->
		<view class="Comment-box" v-if="box" :catchtouchmove="true">
			<view class="Comment-text">
				<textarea  placeholder="发表你的观点"  show-confirm-bar="false" focus="true"  v-model="Comment" />
			</view>
			<!-- 发表按钮 -->
			<view class="published">
				<view @click="messcancel()">取消</view>
				<view @click="bTn()">发表</view>
			</view>
		</view>
		<!-- 登录模态框-->
		<motal ref="mon"></motal>
		<!-- 及时反馈组件 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		
	</view>
</template>

<script>
	// 定义操作数据库
	var db = wx.cloud.database()
	var users = db.collection('user')
	//引入登录模态框
	import motal from '../../../element/modal.vue'
	// 引入即可反馈组件
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	// 引入当前时间的js
	var util = require('../../../common/util.js');
	var time = util.formatTime(new Date());
	 
	export default{
		name:'messages',
		props:{
			leaveword:Array,
			detaid:String
		},
		components:{
			motal,
			HMmessages,
		},
		data(){
			return{
				num:0,
				box:false,
				// 取到要提交到数据库的数据
				avatarUrl:'',  //头像
				nickName:'',	//昵称
				Comment:'',     //用户的留言
				ids:'',
				newmessage:[
					"全部",
					"景区",
					"特色",
					"游玩"
				],
				
			}
		},
		methods:{
			menubtn(index,item){
				this.num = index
				console.log(item)
			},
			
			//显示评论框
			popup(){
				this.box = true
				// 评价之前要让用户登录才能评价
				users.get()
				.then((res)=>{
					console.log(res)
					//数据库里有数据表示该用户已经登陆
					if(res.data.length == 0){
						let message = '请登陆后在操作'
						this.$nextTick(()=>{
							this.$refs.mon.init(message)
						})
					}else{
						console.log('已经登陆')
						// 取到用户昵称，头像暂存起来
						let usermen = res.data[0]
						this.avatarUrl = usermen.avatarUrl
						this.nickName  =usermen.nickName
						this.box = true
					}
				})
				.catch((err)=>{
					console.log('登录错误')
				})
			},
			// 发表评论
			bTn(){
				if(this.Comment == ""){
					console.log('空的')
					let tip = '评论不能为空'
					let icon = 'error'
					this.tips(tip,icon)
				}else{
					console.log('发表成功')
					// 调用云函数
					this.submit()
				}
			},
			
			// 把所有数据提交到数据库  classif
			messdata(){
				return new Promise((resolve,reject)=>{
					// 把所有要提交的数据以对象的形式提交
					var messarray = {
						usermess:this.Comment,   //评价内容
						time:time,  //提交的时间
						avatarUrl: this.avatarUrl,  //头像
						nickName : this.nickName	//昵称
					}
					let mess = db.collection('message')
					mess.add({
						data:{
							id:this.ids,
							// classmessage:classif,
							messagedata:messarray
						}
					})
					.then((res)=>{
						console.log(res)
						// 留言成功给予反馈
						let tip = '评论成功'
						let icon = 'success'
						this.tips(tip,icon)
						// 留言成功清空输入框
						this.Comment = ''
						// 留言成功刷新留言数据，用户实时看到，就要执行父组件的方法
						let item = '全部'
						this.$parent.fatherMethod(item)
					})
					.catch((err)=>{
						console.log(err)
					})
				})
			},
			
			submit(){
				let stamess = this.Comment
				this.messdata(stamess)
			},
			
			// 及时反馈组件
			tips(tip,icon){
				console.log('走了')
				this.HMmessages.show(tip,{icon:icon,iconColor:'#ffffff',fontColor:'#ffffff', background:"rgb(51, 187, 255)"})
			},
			// 隐藏评论框
			messcancel(){
				this.box = false
				//留言成功清空评论框
				this.Comment = ''
			}
			
		},
		watch:{
			// 取到id值，上传给数据库的
			detaid(newvalue,oldvalue){
				console.log(newvalue)
				this.ids = newvalue
			}
		}		
	}
	
</script>

<style scoped>
	/* 评价 */
	 .cont-message{margin-top: 20upx; margin-bottom: 80upx;}
	 .cont-back{padding: 20upx; background: #FFFFFF;}
	 .img-video{color: #333333; font-size: 30upx; font-weight: bold; padding: 20upx 0;}
	 .users-message{display: flex; justify-content: space-between; height: 50upx; align-items: center; margin-bottom: 15upx;}
	 .message-time{font-size: 25upx; color: #a8a8a8;}
	 .cont-name image{width: 50upx !important; height: 50upx !important; border-radius: 50%; margin-right: 9upx;}
	 .cont-name text{font-size: 30upx; color: #a8a8a8;}
	 .cont-name{display: flex; align-items: center; height: 50upx;}
	 .cont-name-text text{font-size: 27upx; color: #333333; line-height: 1.5;
	 display: -webkit-box;
	 -webkit-box-orient: vertical;
	 -webkit-line-clamp: 2;
	 overflow: hidden;}
	 .message-dist{margin-bottom: 30upx; border-bottom: 1rpx solid #f8f8f8;
	 padding-bottom: 25upx;}
	 /* 评论按钮 */
	 .evaluation{background: #f8f8f8; position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				height: 90upx;
				display: flex;
				align-items: center;
				}
		.evaluation input{font-size: 30upx; color: #9a9a9a;
		background: #f0f0f0;
		height: 70upx;
		width: 100%;
		border-radius: 50upx;
		margin: 0 30upx;
		padding-left: 10upx;
		}
		/* 评论框 */
		.Comment-text textarea{width: 100%; color: #808080 !important; font-size: 30upx;
								padding: 8upx;}		
		.Comment-box{position: fixed; top: 0; bottom: 0; right: 0; left: 0;
					background: #F1F1F1;
					z-index: 9999;}
		.Comment-text{background: #FFFFFF; padding-top: 70upx;}	
		.published view{font-size: 35upx; background: #66ccff;
					width: 200upx;
					text-align: center;
					padding: 10upx 0;
					border-radius: 10upx;
					}
		.published{display: flex;  justify-content: space-around;
					margin-top: 20upx;}			
		/* 分类 */
		.activetext{color: #4CD964; background: #FFFFFF !important; border: 1px solid #000000 !important;}
		.menu-block view {
			background: #ffffff;
			border: 1px solid #c2c5cc;
			border-radius: 6upx;
			font-size: 25upx;
			color: #292c33;
			font-weight: bold;
			text-align: center;
			padding: 15upx;
			margin: 15upx;
		}
		
		.menu-block {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			flex-wrap: wrap;
		}
</style>