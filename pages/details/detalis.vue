<template>
	<view>
		<view class="scroll-flex" v-show="!showsc" :style="{opacity:stylecity}">
				<Navs></Navs>
		</view>
		<Banner :detaildata="detaildata"></Banner>
		<!-- 图片视频详情组件 -->
		<view class="matter-page">
			<Matter :detaildata="detaildata"></Matter>
		</view>
		<!-- 留言组件 -->
		<view class="message-page">
			<Message :leaveword = "leaveword" :detaid = "detaid"></Message>
		</view>
	</view>
</template>

<script>
	import Navs from './components/navs.vue'
	import Banner from './components/banner.vue'
	import Matter from './components/matter.vue'
	import Message from './components/message.vue'
	// 定义操作数据库
	var db = wx.cloud.database()
	var listdata = db.collection('userdata')
	var messdatabase = db.collection('message')
	
	export default{
		name:'datails',
		components:{
			Navs,
			Banner,
			Matter,
			Message,
		},
		data(){
			return{
				showsc:true,
				stylecity:0,
				detaid:'',
				detaildata:{},
				leaveword:[],
			}
		},
		
		methods:{
			//监听页面滚动
			handScroll(top){
				if(top>90){
					// console.log('距离顶部90px')
					let opacity = top / 140
					opacity = opacity > 1 ? 1 : opacity
					// console.log(opacity)
					this.stylecity = opacity
					this.showsc = false
				}else{
					this.showsc = true
				}
			},
				
			//请求查询数据库有没有这个id
			detailrep(id){
				listdata.where({
					_id:id
				})
				.get()
				.then((res)=>{
					console.log(res)
					// 赋值取到的详情页数据
					this.detaildata = res.data[0].datainfo
					// this.detaildata.staticimg.slice(0,3)
					// console.log(this.detaildata.staticimg.slice(0,3))
				})
				.catch((err)=>{
					console.log(err)
				})
			},

			// 请求全部留言数据
			messagedata(id){
				messdatabase.where({
					id:id
				})
				.orderBy('messagedata.time', 'desc')
				.get()
				.then((res)=>{
					console.log(res)
					let resdata = res.data
					// 取出留言列表
					this.publicMess(resdata)
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			
			// 取出留言列表
			publicMess(resdata){
				var leaveword = resdata.map((item)=>{
					 return item.messagedata
				})
				console.log(leaveword)
				if(leaveword.length === 0){
					this.nonedata = true
				}else{
					this.nonedata = false
					this.leaveword = leaveword
				}	
			},
			
			//onPageScroll微信监听页面滚动
			onPageScroll(e) {
				// console.log(e)
				let top = e.scrollTop
				this.handScroll(top)
			},
			// 子组件执行父组件方法，请求留言数据
			fatherMethod(item){
				console.log(item)
				if(item == "全部"){
					this.messagedata(this.detaid)
				}else{
					console.log('iten为空')
				}
			},
			
			// 描点链接跳转
			fatherTab(index){
				// console.log(index)
				if(index === 1){
					let datails = '.matter-page'
					this.pageScroll(datails)
				}else if(index == 2){
					let datails = '.message-page'
					this.pageScroll(datails)
				}
				
			},

			// 描点链接跳转
			pageScroll(datails){
				const query = this.createSelectorQuery();
				query.select(datails).boundingClientRect()
				query.selectViewport().scrollOffset();
				query.exec((res)=>{
					console.log(res)
					wx.pageScrollTo({
						scrollTop:res[0].top + res[1].scrollTop - 35,
						duration: 300
					})
				})
			},
		
			
			// 接收列表页的id值
			onLoad(e) {
				console.log(e)
				this.detaid =e.id //  e.id
				// 请求查询数据库有没有这个id,取到图片视频
				this.detailrep(this.detaid)
				// 请求留言数据
				this.messagedata(this.detaid)
			}
		}
		
	}
</script>



<style>
	page{
			background: #f8f8f8;
		}
	.scroll-flex{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: #33AEFF;
		z-index: 2;
	}
</style>