<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="content">
			<view class="feedback_15">
				<image  mode="scaleToFill" border="0"    class="feedback_16"></image>
				<text decode="true" class="feedback_17">反馈与帮助</text>
				<text decode="true" class="feedback_18">问题</text>
			</view>
			<view class="feedback_57">
				<text decode="true" class="feedback_21">请选择问题发生的场景>></text>
				<view class="feedback_25">
					<text decode="true" class="feedback_26">帐号相关</text>
					<image  mode="scaleToFill" border="0"    class="feedback_27"></image>
				</view>
				
				<view class="feedback_43">
					<text decode="true" class="feedback_44">视频播放相关</text>
					<image   mode="scaleToFill" border="0"    class="feedback_45"></image>
				</view>
				<view  class="feedback_46">
					<text decode="true" class="feedback_47">其他功能异常</text>
					<image  mode="scaleToFill" border="0"    class="feedback_48"></image>
				</view>
				<view  class="feedback_49">
					<text decode="true" class="feedback_50">告/商务合作</text>
					<image   mode="scaleToFill" border="0"    class="feedback_51"></image>
				</view>
				<view  class="feedback_52">
					<text decode="true" class="feedback_54">举报/侵权投诉</text>
					<image  mode="scaleToFill" border="0"    class="feedback_55"></image>
				</view>
			</view>
		

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
// import feedback from "./feedback.js";
// export default feedback;
</script>

<style lang="scss" scoped>
   @import './feedback.scss'
</style>