<template>
	<!-- 地图SDK -->
	<view class='container'>
		<view class='header bg-ff'>
		</view>
		<map id='map' :scale='map.scale' :show-location='map.showLocation' :longitude='map.longitude' :latitude='map.latitude'
		 :width='map.width' :height='map.height' :controls='map.controls' :markers='map.markers' @regionchange='mapChange'>
			<!-- <cover-view class='icon-position' style="margin-top: 100px;"> -->
				<cover-image src="/static/icon_position.png" class="icon-img"></cover-image>
			<!-- </cover-view> -->
		</map>
		
		<view class='footer bg-ff font-26'>
			<scroll-view scroll-y class='scroll' :scroll-top='scrollTop'>
				<view class="">
					<view class='padding border-b position-r' v-for='(item, index) in list' :key='index' @click='bindAddress(index)'>
						<view class='row'>{{item.title}}</view>
						<view class='row color-99'>{{item.address}}</view>
						<icon type='success' color='#E74246' size='22' class='icon_circle' v-if='checked === index' />
					</view>
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	var QQMapWX = require('@/libs/qqmap-wx-jssdk.min.js')
	var qqmapsdk = new QQMapWX({
	  // key: 'LXCBZ-NNIKD-UZ64F-H6AFI-UNJLH-OCFGE'
	  key:'SMJBZ-663W2-FTOU6-CQSAD-GQDB7-J3BCQ'
	})
	export default {
		data() {
			return {
				detail: '',
				map: {
					longitude: 119.45194680903242,
					latitude: 25.983498456428148,
					showLocation: true,
					iconPath: '/static/icon_position.png',
					width: 40,
					height: 40,
					scale: 16,
					controls: [{
						id: 'map',
						iconPath: '/static/icon_position.png',
						position: { left: 1200, top: 1200, width: 40, height: 40},
						clickable: false
					}]
				},
				list: [],
				oftenList: [],
				address: {
					title: '',
					address: ''
				},
				checked: 0,
				scrollTop: 0,
				mapStatus: 1 // 控制选择地址时 地图不加载附近列表
			}
		},
		created() {
			uni.setNavigationBarTitle({
				title: '搜索地址'
			})
		},
		onLoad() {
			let map = this.map
			// this.getWidthHeight(e => {
			// 	console.log(e);
			//   map.controls[0].position.top = e.height - 45
			//   map.controls[0].position.left = e.width/2 - 10
			//   this.setData({
			// 	map: map
			//   })
			// })
			
		},
		methods: {
			getAddress (){
			    let that = this
			    uni.getLocation({
			      type: 'gcj02',
			      success: function(res) {
			        console.log(res)
			        let map = that.data.map
			        map.longitude = res.longitude
			        map.latitude = res.latitude
			        that.getWidthHeight(e => {
			          map.controls[0].position.top = e.height / 2 - 35
			          map.controls[0].position.left = e.width / 2 - 20
			          that.setData({
			            map: map,
			            position: {
			              longitude: res.longitude,
			              latitude: res.latitude
			            }
			          })
			          that.getAddressList(1)
			        })
			      },
			    })
			  },
			  
			getWidthHeight (fn){
				var query = uni.createSelectorQuery()
				query.select('#map').boundingClientRect()
				query.exec(res => {
				  fn(res[0])
				})
			  },
			getAddressList(s = 0) {
				let that = this
				let position = that.position
				console.log(position)
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: position.latitude,
						longitude: position.longitude
					},
					get_poi: 1,
					poi_options: "page_size=20;page_index=1",
					success: function(e) {
						if (s) {
							e.result.pois[0].select = 1
							that.setData({
								list: e.result.pois,
								address: e.result.pois[0],
								checked: 0
							})
						} else {
							that.setData({
								list: e.result.pois
							})
						}
						
						setTimeout(() => {
							console.log('************');
							that.scrollTop = 1
						}, 1000)
					},
					fail: err => {
						console.log(err)
					}
				})
			},
			mapChange(e) {
				let that = this
				console.log(this.mapStatus);
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					if (e.type == 'end') {
						that.mapCtx = uni.createMapContext('map')
						that.mapCtx.getCenterLocation({
							success: res => {
								console.log(res)
								that.setData({
									position: {
										latitude: res.latitude,
										longitude: res.longitude
									}
								})
								if (that.mapStatus) { // 防止地图点击时 进行多次加载
									that.getAddressList(1)
								} else {
									that.mapStatus = 1
								}
							}
						})
					}
				}, 200)
				
			},
			bindAddress(index) {
				let list = this.list
				let map = this.map
				map.latitude = list[index].location.lat
				map.longitude = list[index].location.lng
				this.setData({
					map: map,
					checked: index,
					address: list[index],
					mapStatus: 0
				})
			},
			setData(obj){
				Object.assign(this, obj)
			},
			addressSearch() {
				uni.navigateTo({
					url: '/pages/address-search/address-search'
				})
			},
			submit() {
				let that = this
				let detail = that.detail || ''
				let address = that.address
				let a = {
					address: address.title + detail,
					lat: address.location.lat,
					lng: address.location.lng
				}
				console.log(address, a)
			}
		}
	}
</script>

<style lang="scss">
	/**app.wxss**/
	page, view, scroll-view, swiper, block, icon, text, rich-text, button, input, label, picker, picker-view, slider, textarea, navigator, image, video, map, video{margin: 0; padding: 0; box-sizing: border-box;}
	
	page{background: #F6F6F6;font-size: 32rpx;}
	image{display: block;}
	
	.item, .item-forward{background: #fff;padding: 25rpx 90rpx 25rpx 25rpx;position: relative;line-height: 46rpx;}
	.item-forward::before{content: '';width: 20rpx;height: 20rpx;border-top: 2px solid #a9a9a9;border-right: 2px solid #a9a9a9;border-radius: 2px;position: absolute;top: 50%;right: 35rpx;transform: rotate(45deg) translateY(-50%);}
	.item image, .item-forward image{width: 46rpx;height: 46rpx;display: block;margin-right: 10rpx;position: relative;}
	.active{background: #eee;}
	
	.row, .item, .item-forward, .coupons{display: flex;width: 100%;}
	.row-wrap{flex-wrap: wrap;}
	.col, .coupons .left{flex: 1;display: block;width: 100%;}
	.col-center{height: 100%;display: flex;align-items: center;}
	.float-r{float: right;}
	.padding{padding: 20rpx 25rpx;}
	.padding-t{padding-top: 20rpx;}
	.padding-b{padding-bottom: 20rpx;}
	.padding-l{padding-left: 25rpx;}
	.padding-r{padding-right: 25rpx;}
	.padding-tb{padding-top: 20rpx;padding-bottom: 20rpx;}
	.padding-lr{padding-left: 25rpx;padding-right: 25rpx;}
	.margin{margin: 20rpx 25rpx;}
	.margin-t{margin-top: 20rpx;}
	.margin-b{margin-bottom: 20rpx;}
	.margin-tb{margin-top: 20rpx;margin-bottom: 20rpx;}
	.margin-lr{margin-left: 25rpx;margin-right: 25rpx;}
	.border, .border-t, .border-r, .border-b, .border-l{position: relative;}
	.border{border: .5px solid #eee;}
	.border-t::after, .border-r::after, .border-b::after, .border-l::after{content: '';position: absolute;/*background: #eee;*/background: linear-gradient(to top, #eee .7px, transparent .7px);}
	.border-t::after, .border-b::after{height: 1px;left: 25rpx;right: 25rpx;top: 0;}
	.border-b::after{top: auto;bottom: 0;}
	.border-l::after, .border-r::after{width: 1px;top: 0;bottom: 0;left: 0;background: linear-gradient(to right, #eee .7px, transparent .7px);}
	.border-r::after{left: auto;right: 0;}
	.ellipsis-1{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.bg{background: #E74246;}
	.bg-ff{background: #fff;}
	.color{color: #E74246;}
	.color-00{color: #000;}
	.color-ff{color: #fff;}
	.color-99, .icon_img_tip{color: #999;}
	.color-6c{color: #6c6c6c;} 
	.text-right{text-align: right;}
	.font-26{font-size: 26rpx;}
	
	.position-r{position: relative;}
	
	
	


	page {
		position: relative;
	}

	.map, map {
		width: auto;
		height: auto;
		position: fixed;
		left: 0;
		top: 1px;
		right: 0;
		bottom: 210px;
	}
	.map{display: flex;align-items: center;justify-content: center;}
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 100px;
		overflow: hidden;
	}

	.icon_search {
		margin-top: 20rpx;
	}

	.btn {
		line-height: 25px;
		border-radius: 4rpx;
		margin-top: -5rpx;
	}

	.footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 210px;
	}

	.foot-border {
		border-bottom: 1px solid #eee;
		line-height: 32rpx;
	}

	.foot-border .padding {
		padding: 25rpx;
	}

	.foot-active {
		color: #E74246;
		position: relative;
	}

	.foot-active::after {
		content: '';
		position: absolute;
		height: 2px;
		background: #E74246;
		border-radius: 2px;
		bottom: 0;
		width: 5em;
		left: 50%;
		transform: translateX(-50%);
	}

	.scroll {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.scroll .padding {
		padding-right: 40px;
	}

	.scroll .icon_circle {
		position: absolute;
		right: 25rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.icon_img_tip {
		padding: 20rpx 0;
	}
	.icon-position{
		position: relative;top: 50%;left: 50%;width: 36px;height: 36px;transform: translate(-50%, -50%);
		.icon-img{width: 36px;height: 36px;display: block;position: fixed;top: 100px;left: 100px;}
	}
	.icon-img{width: 36px;height: 36px;display: block;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);margin-top: -70px;}
</style>
