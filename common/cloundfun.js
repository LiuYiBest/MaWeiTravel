// clsaa 面向对象类
// promise  封装
const db = wx.cloud.database()   //指定要操作数据库

// 请求tab数据
var home = function(tab){
	return new Promise((resolve,reject)=>{
		const tabs = db.collection(tab)
		tabs.get()
		.then((res)=>{
			console.log('数据是否请求')
			resolve(res)
		})
		.catch((err)=>{
			reject(err)
		})
	})
	
}

// 请求攻略列表的数据  微信小程序每次请求limit最大为20  需要自定义
var homelist = function(listing,pageid){
	return new Promise((resolve,reject)=>{
		const listdata = db.collection(listing)
		.limit(20)
		.skip(pageid * 6) 
		listdata.get()
		.then((res)=>{
			resolve(res)
		})
		.catch((err)=>{
			reject(err)
		})
	})
	
}

export {home,homelist}