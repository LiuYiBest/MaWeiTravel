<template>
	<!-- <view>攻略页面</view> -->
	<view>
		<Adress :address="address"></Adress>
		<Locality></Locality>
		<Content :localdata="localdata" ></Content>
		<!--发布文章-->
		<view class="publish">
			<!-- @click="travels() -->
			<image src="cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/写文章.png" mode="widthFix" @click="travels()"></image>
		</view>

	</view>
</template>

<script>
	//  定位所在区域 
	import Adress from './components/address'
	import Locality from './components/locality'
	import Content from './components/content'
	import {addressdata} from '../../common/list.js'
	// 取到vuex里的值
	import {mapState} from 'vuex'
	
	// 定义操作数据库
	var db = wx.cloud.database()
	var listdata = db.collection('userdata')
	
	export default {
		name: 'strategy',
		components: {
			
			Adress,
			Locality,
			Content
		},
		data(){
			return{
				cityone:'福州市',
				address:'',
				addressData:'',
				// 列表数据
				localdata:[],
			}
		},
		methods: {
			// 被子组件调用   locality.vue调用
			fatherMethod(name){
				// console.log(name)
				if(name == "全部"){
					let cityone = '福州市'
					
					//修改city 会保存上个城市页面信息
					this.tabCity()
				}else{
					console.log('不是全部')
					// 分类筛选
					let cityone = '福州市'
					this.tabCity(cityone,name)
				}
			},
		
			addRess(){
			addressdata()
			.then((res)=>{
				// console.log(res)//位置信息测试
				//
				this.address = res.result.ad_info.city

				// 定位成功查询数据库取出该城市下的景点数据 
				let cityone = '福州市'
				this.cityData(cityone)
				
			})
			.catch((err)=>{
				console.log('用户拒绝定位')
				this.address = '福州市'//默认位置信息
				// this.cityData(this.address)
			})
		},
			
		// 定位成功查询数据库取出该城市下的景点数据  cityone形参
		cityData(cityone){
			listdata.where({
				datainfo:{
					address:cityone
				}
			})
			.orderBy('datainfo.time', 'desc')
			.get()
			.then((res)=>{
				// console.log(res)
				let citydata = res.data
				
			// 筛选值 _id，datainfo里的数据，合并成一个数组返回来
				this.resultCity(citydata)
			})
			.catch((err)=>{
				console.log(err)
			})
		},
			// tab切换筛选的数据
		tabCity(cityone,name){
			listdata.where({
				datainfo:{
					address:cityone,
					classdata:name
				}
			})
			.get()
			.then((res)=>{
				// console.log(res)
				let citydata = res.data
				this.resultCity(citydata)
			})
			.catch((err)=>{
				console.log(err)
			})
		},

		// 筛选值 _id，datainfo里的数据，合并成一个数组返回来
		resultCity(citydata){
			var adddata = citydata.map((item)=>{
				let id = item._id
				let datainfo  =item.datainfo
				return{
					id,
					datainfo
				}
			})
			// console.log(adddata)
			this.localdata = adddata

		},
		
		// 跳到发表页面
			travels(){
				uni.navigateTo({
					url:'../travels/travels'
				})
			}
		},
		
		created() {
			//定位
			this.addRess()
		},
		// 计算属性
		computed:{
			...mapState(['cityone','roturn']),//,'roturn'
			count(){
			this.addressData = this.cityone.citying
			},
			// 如果监听到值为true，那么表示用户发表游记成功，然后再次刷新当前页面
			routing(){
				if(this.roturn.pagesid == true){
					console.log('再次刷新当前页面')
					this.addRess()
				}
			}
		},
		// 侦听器
		watch:{
			addressData(newValue,oldValue){
				// console.log(newValue)
				this.address = newValue
				this.cityData(newValue)
			}
		}
		
		
	}
</script>

<style scoped>
	/* border-radius: 40upx; */
	.publish image {
		width: 60upx !important;
		height: 60upx !important;
		border-radius: 20upx;
	}

	.publish {
		position: fixed;
		bottom: 20upx;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
	}
</style>
