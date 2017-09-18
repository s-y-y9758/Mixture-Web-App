import {getHotTalk,getPictureIdName,getIdPictures,getVideoer,getNamegetSearchList,getResultList} from 'api/fetch'

export default {
	getTodayList({commit},num){
		var _num = num;
		// getHotTalk().then(data=>{
		// 	console.log(res)
		// })
		getHotTalk().then(data=>{
			var arrVideo = data.itemList
			arrVideo = arrVideo.filter(function(item) {
				if(item.data.author){
					return true
				}
			})
			var arr = [];
			var res;
			res = data.itemList[data.itemList.length-1].data.itemList;
			res.forEach(function(item,index) {
				arr[index] = {};
				arr[index].id = item.data.id;
				arr[index].title = item.data.title;
				arr[index].src = item.data.author.icon;
				arr[index].description = item.data.description
				arr[index].duration = item.data.duration;
				arr[index].category = item.data.category;
				arr[index].playUrl = item.data.playUrl;
				arr[index].type = item.type;
				arr[index].icon = item.data.author.icon;
			})
			commit('getVideo',arrVideo)				
			commit('getTodayList',arr)		
		})
	},
	score({commit,state}) {
		var storage=window.localStorage;
		var states = {...state}		
		if(!storage.getItem('scored')) {
			for(var i = 0; i < 5; i++) {
				states.score.push({
					like:0,
					unlike:0
				})
			}
			let score = JSON.stringify(states.score);
			storage.setItem('scored',score);
			commit('score',states.score);
		}	
		var scored = storage.getItem('scored');
		var parseScore = JSON.parse(scored);		
		commit('score',parseScore)
	},
	scoring({commit,state,getters},indexAndStr) {
		var storage=window.localStorage;
		let str = indexAndStr.type;
		let index = indexAndStr.index;
		if(str&&str=='a'&&getters.score){
			getters.score[index].like++
		} else if(str&&str=='b'&&getters.score){
			getters.score[index].unlike++
		}	
		let score = JSON.stringify(state.score);
		storage.setItem('scored',score);		
	},
	getPictureId({commit}){
		getPictureIdName().then(data=>{	
			var content = data.categories;
			content.length = 3
			content.forEach(function(value1,index) {
				var id = value1.tag_id
				value1.idMassage = [];
				getIdPictures(id).then(data=>{
					if(data.post_list == '') {
						content.split(index,1)
					}	
					data.post_list !== ''&&data.post_list.forEach(function(value2) {
						getVideoer(value2.author_id).then(res=>{
							var images = {}
							images.src=res.posts[0].image_srcs[0];
							images.author_id = res.posts[0].author_id;
							images.name = res.sites[res.posts[0].author_id].name
							value1.idMassage.push(images)
							commit('getPictureId',content);	
						})
					})		
				})
			})
		})
	},
	getAuthorMassage({commit,state},id) {
		getVideoer(id).then(res=>{
			commit('getAuthorMassage',res)
		})
	},
	getVideo({commit}) {
		getName().then(res=>{
			var arr = res.data.data;
			commit('getVideo',arr)			
		})
	},
	getResultList({commit},value) {
		getResultList(value).then(res=>{
			console.log(res)
			const obj = {}
			obj.trs = res.ec.word[0].trs
			var word = res.simple.word[0]
			word.query = res.simple.query
			obj.simple = word
			if(res.syno) {
				obj.syno = res.syno.synos
			}			
			obj.webTrans = res.web_trans['web-translation'][0].trans
			obj.blngPart = res.blng_sents_part.sentencePair
			obj.ec21 = res.ec21.word[0]
			console.log(obj.ec21)
			obj.collins = res.collins.collins_entries[0]
			commit('getResultList',obj)
		})
	}

}