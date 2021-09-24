<script>
export default {
	//onLaunch	当uni-app 初始化完成时触发（全局只触发一次）
	onLaunch: function() {
		 //判断是否有云开发功能
		if (!wx.cloud) {
			console.error('请使用 2.2.3 或以上的基础库以使用云能力');
		} else {
			wx.cloud.init({
				env: 'xindemo-9gms6e168e9f811e',
				traceUser: true
			});
		}
	}
};
</script>

<style>
/*每个页面公共css */
::-webkit-scrollbar{
	width: 0;
	height: 0;
	color: transparent;
}
</style>
