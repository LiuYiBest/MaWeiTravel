# 船政旅游小程序
![image-20210926222518624](https://typoraimagedemo.oss-cn-shenzhen.aliyuncs.com/Qianduan/image-20211022212330923.png)

# 所需工具&技术
HbuilderX编辑器 微信开发者工具  Git  Uni-app  vue2  原生小程序  微信云开发 Sass预处理器

# 功能介绍：
1. 使用**小程序云开发和uni-app框架**。
2. 提供定位、景区地图、发布文章、天气预报、攻略区、个人中心等多个功能模块
3. 实时更新文章数据，文章导航预览，用户评论区
4. 提供“附近景点提示”的地图查询、攻略区文章内容搜索
# 项目预览

**首页**

![image-20211015211820844](https://typoraimagedemo.oss-cn-shenzhen.aliyuncs.com/Qianduan/image-20211015211820844.png)

**攻略区**

![image-20211015211849870](https://typoraimagedemo.oss-cn-shenzhen.aliyuncs.com/Qianduan/image-20211015211849870.png)

**文章发布**

![image-20211015211947015](https://typoraimagedemo.oss-cn-shenzhen.aliyuncs.com/Qianduan/image-20211015211947015.png)

**个人中心**

![image-20211015212001751](https://typoraimagedemo.oss-cn-shenzhen.aliyuncs.com/Qianduan/image-20211015212001751.png)


# 项目部署：
uni-app配置小程序在manifest.json中配置微信小程序的AppID，需要申请腾讯地图位置服务，使用微信小程序JavaScriptSDK，在common/list.js封装地图的公用定位
```
var QQMapWX = require('../common/qqmap-wx-jssdk.js');
var qqmapsdk;

// 腾讯地图服务
var addressdata = function(){
	return new Promise((resolve,reject)=>{
		// 实例化地图API核心类
		qqmapsdk = new QQMapWX({
		key: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX'
		});
		qqmapsdk.reverseGeocoder({
			success:(res)=>{
				resolve(res)
			},						
			fail:(err)=>{
				reject(err)
			}
		})
	})
}
//导出外部
export {addressdata}
```

# 云数据库中的数据集合
   - user集合（存储微信用户信息，头像、微信昵称等，权限为“仅创建者可读写”）
   - tab集合（用于对文章进行分类处理，权限为“仅创建者可读写”）
   - banner集合（用于设置轮播图选项，权限为“所有用户可读，仅创建者可读写”）
   - message集合（用户发布的文章的内容，权限为“所有用户可读，仅创建者可读写”）
   - strategy集合（存储用户发表的评论，集合权限为“所有用户可读，仅创建者可读写”）

# 云存储中所需的文件
   - 微信小程序用到的SVG图片（推荐阿里的iconfont）
   - 景区的风景预览图片
   - 用户上传的图片和视频
   - 轮播图所需的图片
