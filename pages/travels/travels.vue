<template>
<view>
	<view class="travels">
		<!-- 分类 -->
		<view class="classify-view">
			<view class="classify-text">分类</view>
			<block v-for="(item,index) in fication" :key="index">
			<view class="classify">
				<text :class="{ activetext: index == num }" @click="menubtn(index,item.name)">{{item.name}}</text>
			</view>
			</block>
		</view>
		<!-- 标题 -->
		<view class="travels-title">
			<input type="text" placeholder="文章标题" class="place-text" v-model="titledata"/>
		</view>
		<!-- 描述 -->
		<view class="travels-describe">
			<textarea  placeholder="记录下你的旅行日记" v-model="tipsdata" maxlength='20000000'/>
		</view>
	</view>
	
	<!-- 上传图片 -->
	<view class="travels-image">
		<view class="topimg">
			<image src="cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/图片.png" mode="widthFix" @click="uploadImg()"></image>
			<!-- <view class="img-text">上传图片</view> -->
		</view>
		<!-- 九宫格 -->
		<view class="conteng">
			<block v-for="(item,index) in topimg" :key="index">
			<view class="conteng-img">
				<image :src="item" mode="aspectFill" class="uploadimg" @click="preImage(index)"></image>
				<image src="cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/删除.svg" mode="widthFix" class="deleteimg" @click="deleteImg(index)"></image>
			</view>
			</block>
		</view>
	</view>
	
	<!-- 上传视频 -->
	<view class="travels-video">
		<view class="topimg1">
			<image src="cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/视频2.png" mode="widthFix" @click="uploadVideo()"></image>
		</view>
		<view class="uploadvideo" v-if="uploadvideos">
			 <!-- poster="http://h.thexxdd.cn/video/postimage.jpg" -->
			<video :src="videos" controls objectFit="cover"></video>
			<image class="pause" src="cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/删除.svg" @click="deleteVideo()"></image>
		</view>
	</view>
	
	<!-- 发布 -->
	<view class="release" @click="suBmitd()">发布</view>
	<!-- 及时反馈组件 -->
	<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	
	<!-- 登录模态框 -->
	<motal ref="mon"></motal>
	<!-- 提示用户上传成功与否 -->
	<view class="warp" v-if="relend">
		<view class="warp-view tipmin">	
			<text>{{reldata}}</text>
		</view>

	</view>
</view>
	
	
</template>

<script>
	// 引入预览图片  定位addressdata 
	import {preview} from '../../common/list.js'
	import {mapState} from 'vuex'
	// 引入及时反馈组件
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	// 引入模态框
	import motal from '../../element/modal.vue'
	// 引入当前时间的js
	var util = require('../../common/util.js');
	var time = util.formatTime(new Date());
	// 定义数据库
	var db = wx.cloud.database()
	var users = db.collection('user')
	export default{
		name:'travels',
		components: {HMmessages,motal},
		data() {
			return {
				num:0,
				fication: [{
						"name": '全部'
					},
					{
						"name": '公园'
					},
					{
						"name": '纪念馆'
					},
					{
						"name": '博物馆'
					}
				],

				uploadvideos:false,
				watchaddress:'',
				classdata:'全部',  //分类
				titledata:'',   //标题
				tipsdata:'',   //描述
				topimg:[],   //上传的图片
				videos:'',  //上传的视频
				address:'福州市', //选择的城市
				avatarUrl:'', // 用户头像
				nickName:'', // 用户昵称
				openid :''	,// 用户openid
				// 提示用户正在发布
				reldata:'正在发布中,请稍后...',
				relend:false
			}
		},
		methods:{
			//获取景点
			menubtn(index,name){
				this.num = index
				console.log(name)
				this.classdata  =name
			},
			// 上传图片
			uploadImg(){
				uni.chooseImage({
				    count: 9, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: (res)=> {
				        console.log(...res.tempFilePaths);//展开数组的每一项
						this.topimg.push(...res.tempFilePaths)
						
				    }
				});
			},
			// 删除图片
			deleteImg(index){
				// console.log(index)
				this.topimg.splice(index,1)
				// console.log(this.topimg)
			},
			// 使用接口预览图片
			preImage(index){
				// console.log(index)
				// 预览图片
				let imglist = this.topimg
				preview(index,imglist)
				.then((res)=>{
					console.log('预览成功')
				})
				.catch((err)=>{
					console.log('预览失败')
				})
			},
			// 上传视频
			uploadVideo(){
				uni.showLoading({
				    title: '上传中'
				});
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					maxDuration:20,
				})
				.then((res)=>{
					console.log(res)
					this.videos = res[1].tempFilePath
					this.uploadvideos = true
					uni.hideLoading();
				})
				.catch((err)=>{
					console.log(err)
				})
				
			},
			// 删除视频
			deleteVideo(){
				this.videos = ''
				this.uploadvideos = false
			},
			

			// 提交
			suBmitd(){
				// this.HMmessages.show('标题必填',{icon:'success',background:'rgb(128, 191, 255)'})
				if(this.titledata == ''){
					let tip = '标题必填'
					this.proMpt(tip)
				}else if(this.tipsdata == ''){
					let tip = '描述必填'
					this.proMpt(tip)
				}else if(this.topimg.length < 1){
					let tip = '请选择至少一张图片上传'
					this.proMpt(tip)
				}else{
					console.log('可以提交')
					// 判断用户是否登录，登录再提交
					this.userinfo()
				}
			},
				
			// 判断用户是否登录
			userinfo(){
				// 请求数据库查看用户是否存在，存在就是登陆，反之未登录
				users.get()
				.then((res)=>{
					console.log(res)
					// length == 0说明用户没有登录
					if(res.data.length == 0){
						console.log('没有登录')
						// 弹出模态框
						let message = '请登录后再操作'
						this.$nextTick(()=>{   //dom更新循环结束之后的延迟回调
							this.$refs.mon.init(message)
						})
						
					}else{
						console.log('已经登陆')
						// 取到用户头像，昵称，openid
						let usermen = res.data[0]
						this.avatarUrl = usermen.avatarUrl
						this.nickName = usermen.nickName
						this.openid  = usermen._openid
						// 可以上传用户提交的数据到数据库
						this.relend = true
						this.userdata()
					}
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			
			// 用户上传数据到数据库：1，await 先上传图片到云储存，2，await 上传视频到云储存，3，await 上传所有数据到数据库
			async userdata(){
				// 先等待图片上传到云存储
				let staticimg = await this.staticImg()
				// console.log(staticimg)
				// 等待视频上传到存储
				let staticvideo = await this.staticVideo()
				// console.log(staticvideo)
				// 最后一步把用户填写的所有数据一并提交到数据库
				await this.cloudData(staticimg,staticvideo)
			},
			
			// 先等待图片上传到云存储
			staticImg(){
				// 把上传成功返回的图片放到数组里
				var imgfileID = []
				return new Promise((resolve,reject)=>{
					// 取出图片数组里的每一项,forEach遍历类似for(i=0,)
					this.topimg.forEach((img)=>{
						// console.log(img)
						// 随机字符串，拼接图片名称，防止同名文件产生，而被后一个覆盖前一个文件
						let imgion = img.lastIndexOf('.')
						let eximg = img.slice(imgion)
						let cloudpath = `${Date.now()}-${Math.floor(Math.random(0,1) * 10000000)}${eximg}`
						// console.log(cloudpath)
						wx.cloud.uploadFile({
						  cloudPath: 'static/' + cloudpath,
						  filePath: img, // 文件路径
						}).then(res => {
						  console.log('图片上传完成')
						  imgfileID.push(res.fileID)
						  // console.log(imgfileID)
						  // 判断云存储返回的图片是否和用户上传的图片一样多
						  if(imgfileID.length == this.topimg.length){
							  resolve(imgfileID)
						  }
						  
						}).catch(error => {
							console.log(error)
						})
					}) 
				})
			},
			
			
			// 先等待视频上传到云存储
			staticVideo(){
				return new Promise((resolve,reject)=>{
					// 用户是否要上传视频
					if(this.videos == ''){
						console.log('用户不上传')
						resolve('')
					}else{
						console.log('要上传')
						// 随机字符串，拼接图片名称，防止同名文件产生，而被后一个覆盖前一个文件
						let videoion = this.videos.lastIndexOf('.')
						let exvideo = this.videos.slice(videoion)
						let cloudpath = `${Date.now()}-${Math.floor(Math.random(0,1) * 10000000)}${exvideo}`
						// console.log(cloudpath)
						wx.cloud.uploadFile({
							cloudPath: 'staticvideo/' + cloudpath,
							filePath: this.videos, // 文件路径
						}).then((res)=>{
							console.log('视频上传完毕')
							resolve(res.fileID)
						})
						.catch((err)=>{
							console.log(err)
						})
					}
				})
			},
			
			// 最后一步把用户填写的所有数据一并提交到数据库
			cloudData(staticimg,staticvideo){
				let datas = {
					classdata:this.classdata,  //分类
					titledata:this.titledata, //标题
					tipsdata:this.tipsdata,  // 描述
					staticimg:staticimg,   //图片
					staticvideo:staticvideo,  //视频
					address:this.address,   //定位
					avatarUrl:this.avatarUrl,  //头像
					nickName:this.nickName,   //昵称
					openid:this.openid,
					time:time
				}
				db.collection('userdata').add({
					// data里面表示要上传的数据
					data:{
						datainfo:datas
					}
				})
				.then((res)=>{
					// console.log(res)
					// 提示用户发布成功，跳转到攻略页面
					this.reldata = '成功发布√'
					// 用户发表景点成功，传值给攻略页面让攻略页面再次请求数据
					let pagesid = true
					setTimeout(()=>{
						uni.switchTab({ 
							url:'../strategy/strategy'
						})
						this.$store.commit('roturnmuta',pagesid)
					},1700)
					
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			
			// 及时反馈
			proMpt(tip){
				this.HMmessages.show(tip,{icon:'error',iconColor:'#ffffff',fontColor:'#ffffff', background:"rgb(102, 178, 255)"})
			}
			
		},
		// created() {
		// 	// 定位
		// 	this.addRess()
		// },
		// 计算属性
		computed:{
			...mapState(['travecity']),
			count(){
				this.watchaddress = this.travecity.traveing
			}
		},
		watch:{
			watchaddress(newValue,oldValue){
				console.log(newValue)
				this.address = newValue
			}
		}
	}
</script>

<style scoped>
	/* 	.chengong-imge{
			justify-content: center;
			/* padding-right: ;
			padding-bottom: 100upx;
			padding-left: 100upx;
			padding-top: 100upx; */
			/* margin: auto; 
			/* margin-bottom: 85upx;	
			width: 100upx;
			height: 100upx;	
		} */
		.img-text{
			color: #b3b3b3;
			font-size: 30upx;
			display: flex;
		}
		.video-text{
			color: #b3b3b3;
			font-size: 30upx;
			/* padding: 15upx 0 0; */
			/* display: flex; */
			}
		.travels {
			padding: 10upx 20upx;	
			
		}
	
		.classify text {
			display: block;
			font-size: 27upx;
			color: #14181e;
			background: #f7f7f7;
			padding: 10upx 20upx;
			border-radius: 20upx;
			margin: 0 30upx;
		}
	
		.classify {
			display: flex;
		}
	
		.classify-text {
			font-size: 30upx;
			color: #14181e;
			font-weight: bold;
		}
	
		.classify-view {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
	
		/* 选中的样式 */
		.activetext {
			background: #66d9ff !important;
		}
	
		/* 标题 */
		.place-text {
			color: #808080 !important;
			font-size: 30upx;
		}
	
		.travels-title {
			margin: 40upx 0;
		}
	
		/* 描述 */
		.travels-describe textarea {
			width: 100%;
			color: #808080 !important;
			font-size: 30upx;
		}
	
		/* 上传图片 */
		.topimg image {
			width: 100upx;
			height: 100upx;
			/* margin-bottom: 90upx;	 */
		}
	
		.topimg {
			padding-left: 30upx;
			padding-top: 10upx;
			margin: auto;
		
		}
		/* 上传视频 */
		.topimg1 image {
			width: 100upx;
			height: 100upx;	
		}
		.topimg1 {
			padding-left: 30upx;
			padding-top: 10upx;
			/* margin: auto; */
			margin-bottom: 85upx;	
		
		}
			
	
		/* 九宫格 */
		.conteng {
			display: flex;
			flex-wrap: wrap;
			margin-left: 4px;
			margin-right: 4px;
		}
	
		.conteng-img {
			width: calc((100% / 3) - 8px) !important;
			margin: 4px;
			height: 176upx;
			position: relative;
		}
	
		.uploadimg {
			width: 100% !important;
			height: 100% !important;
			border-radius: 10upx;
		}
	
		/* 删除图片 */
		.deleteimg {
			width: 50upx;
			height: 40upx;
			position: absolute;
			top: 6upx;
			right: 6upx;
		}
	
		/* 视频 */
		.uploadvideo video {
			width: 100%;
			height: 400upx;
			border-radius: 5upx;
			margin-bottom: 100upx;
		}
	
		.uploadvideo {
			margin: 0 8px;
			border-radius: 5upx;
			position: relative;
		}
	
		/* 覆盖视频 */
		.pause {
			width: 50upx;
			height: 50upx;
			position: absolute;
			top: 6upx;
			right: 6upx;
		}
		/* 位置 */
		.address-site{display: flex; align-items: center;}
		.address-site image{width: 40upx; height: 40upx; margin-right: 10upx;}
		.address-site text{font-size: 30upx; color: #00a2ff;}
		.address-text{font-size: 30upx; color: #333333; padding-right: 40upx;}
		.address{display: flex; background: #f1f1f1; padding: 20upx 0 20upx 20upx; margin-top: 30upx;
				margin-bottom: 160upx;}
	
		/* 发布 */
		.release {
			background: #0099ff;
			width: 100%;
			height: 100upx;
			font-size: 40upx;
			line-height: 100upx;
			text-align: center;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 999;
		}
	
		/* 提示用户上传成功与否 */
		.warp {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.6);
			z-index: 9999;
		}
	
		.warp-view {
			width: 500upx;
			height: 200upx;
			background: #f2f2f2;
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
	
		/* 提示框 */
		.tipmin text {
			font-size: 34upx;
			display: flex;
			justify-content: center;
			line-height: 200upx;
		}
</style>
