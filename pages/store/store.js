import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 数据仓库

// 首页tab切换传输存储的值
const list={
	listing:[]
	
}

// tab切换的状态
const load = {
	loading:''
}

const navmin = {
	loading:'',
	// naving:'jingdian',
	// pageid:0,
	// uniload:'',
	// nonedata:'',
}

// tab切换没有数据的提示
const nonemin = {
	nonedata:''
}


// 城市选择页面跳转到攻略页面的城市名
const city = {
	citying:''
}

// 城市选择页面跳转到发表页面的城市名
const travecity = {
	traveing:''
}

//用户发表景点成功，传值给攻略页面让攻略页面再次请求数据
const roturn = {
	pagesid:false
}


// 数据仓库
const state = {
	list,
	load,
	navmin,
	nonemin,
	city,  //获取citying数据
	travecity,
	roturn,
}




export default new Vuex.Store({
	state,
	actions:{
		listact(listact,listadata){
			console.log(listadata)
			listact.commit('listmut')
		}
	},

	// 同步操作
	mutations: {
		listmuta(state, listdata) {
			// console.log(listdata)
			state.list = {
				listing: listdata
			}
		}
	},


	    //以对象形式传过来的参数
		navmuta(state, pullobj) {
			console.log(pullobj)
			state.navmin = {
				loading: pullobj.loading,
				naving: pullobj.nav,
				pageid: pullobj.pageid,
				uniload: pullobj.uniload,
				nonedata: pullobj.nonedata
			}
		},


		// 城市选择页面跳转到攻略页面的城市名
		citymuta(state,cityion){
			console.log(cityion)
			state.city = {
				citying:cityion
			}
		},
				
		// // 城市选择页面跳转到攻略页面的城市名
		travemuta(state,cityion){
			console.log(cityion)
			state.travecity = {
				traveing:cityion
			}
		},



		// 用户发表景点成功，传值给攻略页面让攻略页面再次请求数据
		roturnmuta(state,pagesid){
			state.roturn = {
				pagesid:pagesid
			}
		}
// }
})
