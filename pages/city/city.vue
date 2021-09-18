<template>
	<view>
		<!--搜索城市 -->
		<view class="margin-search">
			<view class="search-cont">
				<view class="city-search">
					<image src="cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/搜索.svg" mode="widthFix" class="search-img"></image>
					<input type="text" placeholder="发现你感兴趣的目的地" @focus="searchCity" @input="searchInput" v-model="keywoeds"/>
				</view>
				<view class="search-code" v-if="!citynone" @click="canCel">
					<image src="../../static/tab/chaa.svg" mode="widthFix"></image>
				</view>
			</view>
		</view>
		
		<!-- 点击搜索隐藏 -->
				<view v-if="citynone">
					<!-- 定位城市 -->
					<view class="city-view">
						<view class="city-text">当前定位城市</view>
						<view class="posit-city">
							<image src="../../static/tab/gonglveb.png" mode="widthFix"></image>
							<text class="city-text" @click="clickCity()">{{address}}</text>
						</view>
					</view>
					
					<!-- 热门城市 -->
					<view class="hot-city">热门城市</view>
					<view class="menu-block">
						<block v-for="(item,index) in city" :key="index">
							<view @click="hotCity(item.name)">{{item.name}}</view>
						</block>
					</view>
				</view>
		<!-- 显示搜索的城市 -->
				<view class="results" v-if="!citynone">
					<block v-for="(item,index) in citydata" :key='index'>
						<view class="results-city" @click="seekCity(item)">
						<image src="../../static/tab/gonglveb.png" mode="widthFix"></image>
						<text>{{item}}</text>	
						</view>	
					</block>
				</view>	
		
	</view>
</template>

<script>
	// 引入定位
import {addressdata} from '../../common/list.js'
// 引入SDK核心类
var QQMapWX = require('../../common/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
		key: 'M5IBZ-FPCHS-NM6OI-6CY27-IN2J7-H7FJG'
		});
export default {
	name: 'citying',
	data() {
		return {
			citynone:true,
			address:'',
			citydata:[], //搜索的城市
			keywoeds:'',
			pageroute:'',  //从哪个页面进来的路由
			city: [
				{
				"name":'福州市'
				},
				{
				"name":'福州市'
				},
				{
				"name":'北京市'
				},
				{
				"name":'上海市'
				},
				{
				"name":'广州市'
				},
				{
				"name":'深圳市'
				},
				{
				"name":'杭州市'
				}
				],

		};
	},
	methods:{
		// 搜索触发
		searchCity(e){
			// console.log(e)
			this.citynone = false
		},
		// 点击取消按钮，关闭搜索
		canCel(){
			this.citynone = true
			this.keywoeds = ''
			this.citydata = ''
		},
		
		// 点击定位取到城市名称
		clickCity(){
			// console.log(this.address)
			let cityion = this.address
			this.rouTes(cityion)
		},
		
		// 取到热门城市
		hotCity(city){
			// console.log(city)
			this.rouTes(city)
		},
		
		// 搜索城市
		seekCity(city){
			console.log(city)
			this.rouTes(city)
		},
		
		// 跳转到攻略页面
		rouTes(cityion){
			// console.log(cityion)
			// 用vuex传值
			if(this.pageroute == 'pages/travels/travels'){
				console.log(cityion)
				// 传给发表页面的
				this.$store.commit('travemuta',cityion)
			}else{
				// 传给tabr攻略页面的
				console.log(cityion)
				this.$store.commit('citymuta',cityion)
			}
			uni.navigateBack({
			    delta: 1
			});
		},
		
		// 实时搜索城市
		searchInput(e){
			// console.log(e.detail.value)
			qqmapsdk.getSuggestion({
				keyword:e.detail.value,
				success:(res)=>{
					console.log(res)
					let city = res.data
					// 取出城市名
					let thecity = res.data[0].city
					let citydata = city.map((item)=>{
						return item.title
					})
					// 数组合并
					let allcity = [thecity,...citydata]
					// console.log(allcity)
					this.citydata  = allcity
				},
				fail:(err)=>{
					console.log(err)
				}
			})
		},
		
		// 定位当前城市
			addRess(){
				addressdata()
				.then((res)=>{
					console.log(res)
					this.address = res.result.ad_info.city
				})
				.catch((err)=>{
					console.log('用户拒绝定位')
					this.address = '昆明市'
				})
			}
	},
	mounted() {
		this.addRess()
	},
	// 判断路由
	onLoad() {
		let pages = getCurrentPages()
		let prevpage = pages[pages.length - 2]; 
		console.log(prevpage.route)
		this.pageroute = prevpage.route
	}
};
</script>

<style scoped>
	page{background: #ffffff;}
		/* 搜索城市 */
		.margin-search{margin-bottom: 40upx;}
		.city-search{
		    height: 70upx;
			line-height: 70upx;
		    width: 100%;
		    display: flex;
		    flex-direction: row;
			background:#f8f8f8;
			border-radius: 50upx;
			}
		.search-img{margin: auto 0 auto 20upx; width: 40upx; height: 40upx;} 	
		.city-search input{
				height: 70upx;
				line-height: 70upx;
		        width: 100%;
		        font-size: 30upx;
				color: #666666; 
				  } 
		.search-cont{display: flex; justify-content: space-between; height: 70upx; align-items: center;
					background: linear-gradient(to top, #ffe566 10%, #ffd300 100%);
					padding: 30upx 20upx;
					}	
		.search-code image{width: 50upx; height: 50upx;}
		.search-code{width: 50upx; height: 50upx; padding: 0 15upx;}
		/* 定位城市 */
			.city-view image{width: 40upx; height: 40upx; padding-right: 20upx;}
			.city-text{font-size: 30upx; color: #3f3f3f;}
			.posit-city{display: flex; align-items: center; padding-left: 35upx;}
			.city-view{display: flex; align-items: center;
			background: #f7f7f7;
			padding: 20upx 10upx;
			margin: 0 20upx;
			border-radius: 6upx;}
			/* 热门城市 */
			.hot-city{font-size: 30upx; color: #999999; margin: 50upx 20upx 0 20upx;}
			.menu-block view {
				background: #f7f7f7;
				border-radius: 6upx;
				font-size: 27upx;
				color: #333333;
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
			/* 搜索的结果 */
				.results text{display: block; font-size: 30upx; color: #ee9900;}
				.results-city image{width: 40upx; height: 40upx; padding-right: 20upx;}
				.results-city{display: flex; align-items: center; border-bottom: 1rpx solid #e5e5e5;
				padding: 20upx 0;
				margin: 0 20upx;}
</style>
