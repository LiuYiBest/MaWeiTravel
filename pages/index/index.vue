<template>
	<view>
		<Search></Search>
		<Ticket>
			<view  @click="chooseCity"></view>
		</Ticket>
		<Classify></Classify>
		<Content id="boxFixed" :class="{'is_fixed' : isFixed}" :tab="tab"></Content>
		<view style="height: 140upx;"></view>
		<!-- tab切换的loading -->
		<Article :Articleend="Articleend"></Article>
		<none-data></none-data>
		
	</view>
</template>

<script>
	import Search from './components/search'
	import Ticket from './components/ticket'
	import Classify from './components/classify'
	import Content from './components/content'
	import Article from './components/article'
//	import Navigator from 'components/navigation'
	//引入公用方法
	import {
		home,
		homelist
	} from '../../common/cloundfun.js'
	import {mapState} from 'vuex'
	export default {
		components: {
			Search,
			Ticket,
			Classify,
			Content,
			Article
		},
		methods:{
			chooseCity(){
				
			},
		},
		data() {
			return {
				isFixed: false,
				rect: '',
				menutop: '',
				// banner:[],轮播参数
				tab: [],
				Articleend: [],
				// loadinglist:false  //tab切换的loading状态
			}
		},
		
		// 云开发动态轮播图
		created() {
			// 请求轮播数据
			// let banner = 'banner'
			let tab = 'tab'
			let listing = 'jingdian'
			// 并发批量请求 promise.all,可以批量请求多个接口，而且同时得到所有数据
			Promise.all([home(tab), homelist(listing)]) //, homelist(listing, this.pageid)]home(banner),
				.then((res) => {
					// tab切换
					this.tab = res[0].data
					// 攻略景点列表数据的第一个tab的数据
					this.Articleend = res[1].data
				})
				.catch((err) => {
					console.log(err)
				})
		},

		onLoad() {
			const query = wx.createSelectorQuery()
			query.select('#boxFixed').boundingClientRect()
			query.exec((res) => {
				// console.log(res)
				this.menutop = res[0].top
			})
		},

		// 监听页面滚动
		onPageScroll(e) {
			this.rect = e.scrollTop
		},

		// 计算属性会时刻监听数据变化，只要数据发生变化，计算属性就会重新执行
		computed: {
			// 取出vuex数据仓库的数据
			...mapState(['list', 'load', 'navmin', 'nonemin']),
			// 取到tab切换的数据
			count() {
				this.Articleend = this.list.listing
			},

			// 滑动组件置顶
			namepage() {
				console.log('滑动组件测试111')
				if (this.rect > this.menutop) {
					this.isFixed = true
				} else {
					this.isFixed = false
				}
			}
		},
	}
		
			
</script>

<style scoped>
	.is_fixed {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
	}
</style>
