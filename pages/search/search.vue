<template>
	<!-- 文章的全局搜索 -->
	<view>
		<view class="search-cont">
			<view class="search">
				<input type="text"  placeholder-class="inputclass" confirm-type ="search" 
				focus="true"
				placeholder="请输入搜索内容" 
				v-model="searchdata"
				@confirm="onKeyInput"
				/>
			</view>
			<view class="search-code" @click="seArch()">
				搜索
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history" v-if="ifhistory">
			<view class="search-title">
				<view>搜索历史</view>
				<view @click="removeStorage()"><image src="../../static/tab/searchend.svg" mode="widthFix"></image></view>
			</view>
			<!-- tab -->
			<view class="menu-block">
				<block v-for="(item,index) in setdata" :key="index">
					<view @click="menubtn(item)">{{item}}</view>
				</block>
			</view>
		</view>
		
		<!-- 内容展示 -->
		<view class="active">
			<view class="conteng">
				<block v-for="(item,index) in localdata" :key="index">
				<view class="conteng-article newing" @click="localCont(item._id)">
					<view  class="conteng-img">
					<block v-for="(itemimg,index) in item.datainfo.staticimg" :key="index" v-if="index==0">
					<image :src="itemimg" mode="aspectFill"  class="animated fadeIn"></image>	
					</block>
					</view>
					<!-- 文字介绍 -->
					<view class="active-introduce">
						<view class="active-name">{{item.datainfo.titledata}}</view>
						<view class="active-title">{{item.datainfo.tipsdata}}</view>
					</view>
					<view class="purchase userinfo">
						<image :src="item.datainfo.avatarUrl" mode="widthFix"></image>
						<text class="active-purchase" v-if="item.datainfo.nickName != '' ">{{item.datainfo.nickName}}</text>
					</view>
				</view> 
				</block>
			</view>
		</view>
		<!-- 没有搜索到的提示 -->
		<none-data v-if="nonedata"></none-data>
	</view>
</template>

<script>
	export default{
		name:'searchs',
		data() {
			return {
				setdata: [],
				searchdata:'',
				ifhistory:false,
				localdata:[]  ,//搜索结果
				nonedata:false
			}
		},
		
		methods:{
			// 搜索历史发起搜索
			menubtn(item){
				this.ifhistory = false
				// 查询数据库
				this.searchData(item)
			},
			
			// 按钮搜索
			seArch(){
				let searchkey = this.searchdata
				if(searchkey != ""){
					this.ifhistory = false
					// 搜索历史本地缓存
					this.getStorage(searchkey)
					// 查询数据库
					this.searchData(searchkey)
				}
			},
			// 回车键搜索
			onKeyInput(){
				let searchkey = this.searchdata
				if(searchkey != ""){
					// this.ifhistory = false
					console.log(this.searchdata)
					// 搜索历史本地缓存
					this.getStorage(searchkey)
					// 查询数据库
					this.searchData(searchkey)
				}
			},
			
			// 本地存储
			getStorage(searchkey){
				const seararray = uni.getStorageSync('search_key') || []
				seararray.unshift(searchkey)
				uni.setStorageSync('search_key', seararray);
			},
			// 取出搜索历史缓存
			setStorage(){
				let setdata = uni.getStorageSync('search_key');
				// 数组去重new Set只针对于数组字符串
				let setdataarr = Array.from(new Set(setdata))
				console.log(setdataarr)
				if(setdataarr == ''){
					this.ifhistory = false
				}else{
					this.setdata = setdataarr
					this.ifhistory = true
				}
			},
			
			// 清除搜索历史
			removeStorage(){
				uni.removeStorageSync('search_key')
				this.setStorage()
			},
			
			// 发起搜索请求
			// 查询数据库
			searchData(searchkey){
				const db = wx.cloud.database()
				const searchdata = db.collection('userdata')
				searchdata.where({
					datainfo:{
						tipsdata:db.RegExp({
							regexp:searchkey,
							options:'m'
						})
					}
				})
				.get()
				.then((res)=>{
					console.log(res)
					if(res.data.length === 0){
						this.nonedata = true
						this.localdata = ''
					}else{
						this.nonedata = false
						this.localdata = res.data
					}
					
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			
			// 跳转到详情页
			localCont(id){
				console.log(id)
				uni.navigateTo({
					url:'../details/detalis?id=' + id
				})
			}
		},
		
		// 取出本地缓存
		created() {
			this.setStorage()
		}
	}
</script>

<style scoped>
	@import "../../common/uni.css";
		.search{
		    height: 70upx;
			line-height: 70upx;
		    width: 100%;
		    display: flex;
		    flex-direction: row;
			background:#f8f8f8;
			border-top-left-radius: 50upx;
			border-bottom-left-radius: 50upx;
			border-bottom-right-radius:50upx;
			margin-left: 20upx;
			}
		.search input{
				height: 70upx;
				line-height: 70upx;
		        width: 100%;
		        font-size: 30upx;
				color: #666666; 
				padding-left: 30upx;
				  } 
		.search-cont{display: flex; justify-content: space-between; height: 70upx; align-items: center;
					padding: 30upx 0;
					}
		.search-code{width: 150upx; height: 50upx; text-align: center; font-size: 30upx;}
		/* 搜索历史 */
		.search-history{margin: 20upx;}
		.search-title{font-size: 30upx; font-weight: bold;
					display: flex;
					justify-content:space-between;
					align-items: center;
					height: 60upx;
					line-height: 60upx;}
		.search-title image{width: 36upx; height: 36upx; display: block;}
		.menu-block view {
			background: #f7f8fa;
			border-radius: 6upx;
			font-size: 27upx;
			color: #292c33;
			text-align: center;
			padding: 10upx;
			margin: 20upx 20upx 0 0;
		}
		
		.menu-block {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			flex-wrap: wrap;
		}
		.newing{padding-bottom: 30upx;}
		/* 用户头像 */
		.userinfo image{width: 50upx; height: 50upx; border-radius: 50upx;}
		.userinfo text{padding-left: 20upx;}
		.userinfo{padding-top: 20upx;}
</style>
