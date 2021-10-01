# 船政旅游小程序
![image-20210926222518624](https://typoraimagedemo.oss-cn-shenzhen.aliyuncs.com/Qianduan/image-20210926222518624.png)

# 所需工具
HbuilderX编辑器 微信开发者工具  Git  uni-app框架  原生小程序  微信云开发 Sass预处理器

# 功能介绍：
1. 使用**小程序云开发和uni-app框架**。
2. 提供定位、景区地图、发布文章、天气预报、攻略区、个人中心等多个功能模块
3. 实时更新文章数据，文章导航预览，用户评论区
4. 提供“附近景点提示”的地图查询、攻略区文章内容搜索


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

# 项目目录结构

```
MaWeiTravel
├─ App.vue										//首页组件
├─ common                                       
│    ├─ cloundfun.js                            // 封装数据库请求操作
│    ├─ list.js                                 // 引入腾讯地图SDK核心类
│    ├─ qqmap-wx-jssdk.js                       // 微信小程序JavaScriptSDK
│    ├─ uni.css                                 // 封装封装公共的css样式
│    └─ util.js                                 // 微信小程序自带时间
├─ components
│    └─ HM-messages 
│           └─ HM-messages.vue                  // 全局提示框插件    
├─ element 
│    ├─ modal.vue                               // 用户登录注册
│    └─ none.vue                                // 数据为空的提示
├─ libs
│    └─ qqmap-wx-jssdk.min.js                   // 腾讯地图SDK包
├─ main.js                                      // 文件入口
├─ manifest.json                                // 基础配置
├─ package-lock.json                            // 依赖版本
├─ pages
│    ├─ address-search
│    │    └─ address-search.vue                 // 地图位置
│    ├─ city
│    │    └─ city.vue                           // 当前城市
│    ├─ details
│    │    ├─ components
│    │    │    ├─ banner.vue                    // 轮播图组件
│    │    │    ├─ matter.vue                    // 文章图片视频介绍组件
│    │    │    ├─ message.vue                   // 评论留言区组件
│    │    │    └─ navs.vue                      // 文章导航锚点组件
│    │    └─ detalis.vue                        // 文章页面父组件
│    ├─ index
│    │    ├─ components
│    │    │    ├─ article.vue                   // 文章介绍组件
│    │    │    ├─ classify.vue                  // 景区表格组件
│    │    │    ├─ content.vue                   // 景点滑动组件
│    │    │    ├─ search.vue                    // 搜索框组件
│    │    ├─ index.vue                          // 主界面父组件
│    ├─ my
│    │    ├─ choudemo.vue                       // 抽奖组件
│    │    ├─ feedback.scss                      // feedback样式
│    │    ├─ my.vue                             // 个人中心
│    │    ├─ sigin-in.vue                       // 签到日历
│    │    └─ statement.vue                      // 关于小程序
│    ├─ search
│    │    └─ search.vue                         // 文章搜索界面
│    ├─ store
│    │    └─ store.js                           // Vuex 数据仓库
│    ├─ strategy
│    │    ├─ components
│    │    │    ├─ address.vue                   // 景点地图组件
│    │    │    ├─ content.vue                   // 文章内容组件
│    │    │    └─ locality.vue                  // 景点Tab切换组件
│    │    └─ strategy.vue                       // 攻略页面父组件
├─ pages.json                                   // 页面配置
├─ uni.scss                                     // SCSS预处理
```



