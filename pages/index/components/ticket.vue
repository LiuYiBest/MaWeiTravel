<template>
	<view>
		
			 
		<!-- 图片 -->
		<view class="ticket" >
			
			
			<block v-for="(item, index) in ticket" :key="index">
				
				<view>
					<form @submit="formSubmit" >
					    <view class="uni-btn-v">
					        <button form-type="submit">
								<image :src="item.image" mode="widthFix"></image>
								<text>{{ item.name }}</text>
							</button>
					     
					    </view>
					</form>
					
				</view>	
			</block>
		</view>

	</view>
	
</template>

<script>
	
	
export default {
	name: 'ticket',
	data() {
		return {
			ticket: [
				{
					image: 'cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/酒店.png',
					name: '位置'
				},
				{
					image: 'cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/门票.png',
					name: '步行'
				},
				{
					image: 'cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/地图.png',
					name: '导航'
				},
				{
					image: 'cloud://xindemo-9gms6e168e9f811e.7869-xindemo-9gms6e168e9f811e-1304822355/userimage/汽车.png',
					name: '驾车'
				}
			]
		};
	},
	 methods: {
	  formSubmit: function(e) {
		let plugin = requirePlugin('routePlan');
		let key = 'SMJBZ-663W2-FTOU6-CQSAD-GQDB7-J3BCQ';  //使用在腾讯位置服务申请的key
		let referer = '腾讯地图导航';   //调用插件的app的名称
		let endPoint = JSON.stringify({  //终点
			'name': '马尾船政',
			'latitude': 25.98239587905485,
			'longitude': 119.44886646957396
		});
		wx.navigateTo({
			url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
		})
	},
	}
	    
};

		


</script>

<style scoped>
.ticket image {
	width: 90upx;
	height: 90upx;
	display: block;
}
.ticket {
	display: flex;
	justify-content: space-around;
	text-align: center;
	margin: 30upx 0;
}
.ticket text {
	font-size: 30upx;
	display: block;
}
</style>
