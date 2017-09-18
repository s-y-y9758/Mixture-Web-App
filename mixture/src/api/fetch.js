import axios from 'axios'

export function getHotTalk() {
	let mine = new Promise((resolve,reject)=>{
		axios.get('/api/v4/tabs/selected?eyepetizer://campaign/list/?title=%E4%B8%93%E9%A2%98')
    	.then(res=>{
	          	resolve(res.data)
		})
	})
	return mine
}

// export function getHotTalk() {//获取热门资讯
// 	return fetch('/api/v4/tabs/selected?eyepetizer://campaign/list/?title=%E4%B8%93%E9%A2%98').then((data)=>{
// 		return data.json()
// 	})
// }

export function getCity() {//获取当前手机ip所在的城市
	return fetch('/iplookup/iplookup.php?format=js').then((data)=>{
		return data.text()
	})
}

export function getWeather(id) {
	let mine = new Promise((resolve,reject)=>{
		axios.get(`weathers/app/weather/listWeather?cityIds=${id}`)
    	.then(res=>{
          	resolve(res.data)
		})
	})
	return mine
}

// export function getWeather(id) {	
// 	return fetch(`weathers/app/weather/listWeather?cityIds=${id}`).then((data)=>{
// 		console.log(data)
// 		return data.json()
// 	})
// }

export function getPictureIdName() {
	let mine = new Promise((resolve,reject)=>{
		axios.get('/discover/discover-app')
    	.then(res=>{
          	resolve(res.data)
		})
	})
	return mine
}

// export function getPictureIdName() {//获取图片，来自图虫api
// 	return fetch('/discover/discover-app').then((data)=>{	
// 		return data.json()
// 	})
// }

export function getIdPictures(id) {
	let mine = new Promise((resolve,reject)=>{
		axios.get(`/discover/discover/${id}/category?os_api=25&device_type=MI&device_platform=android&ssmix=a&manifest_version_code=232&dpi=450&abflag=0&uuid=329642135962135&version_code=232&count=20&app_name=tuchong&version_name=2.3.2&openudid=53fa4df32154dfa3&resolution=1280*1000&os_version=5.0.1&ac=wifi&aid=0&page=1`)
    	.then(res=>{
          	resolve(res.data)
		})
	})
	return mine
}

// export function getIdPictures(id) {//获取图片，来自图虫api
// 	return fetch(`/discover/discover/${id}/category?os_api=25&device_type=MI&device_platform=android&ssmix=a&manifest_version_code=232&dpi=450&abflag=0&uuid=329642135962135&version_code=232&count=20&app_name=tuchong&version_name=2.3.2&openudid=53fa4df32154dfa3&resolution=1280*1000&os_version=5.0.1&ac=wifi&aid=0&page=1`).then((data)=>{
// 		return data.json()
// 	})
// }

export function getVideoer(id) {
	let mine = new Promise((resolve,reject)=>{
		axios.get(`/rest/sites/${id}/posts?page=1&count=20`)
    	.then(res=>{
          	resolve(res.data)
		})
	})
	return mine
}

// export function getVideoer(id) {//获取图片里每个摄影师对应的数据，来自图虫api
// 	return fetch(`/rest/sites/${id}/posts?page=1&count=20`).then((data)=>{
// 		return data.json()
// 	})
// }

export function getSearchList(value) {//获取搜索内容
	let mine = new Promise((resolve,reject)=>{
		axios.get(`/suggest/suggest?q=${value}&le=eng&num=15&ver=2.0&doctype=json&keyfrom=mdict.7.2.0.android&model=honor&mid=5.6.1&imei=659135764921685&vendor=wandoujia&screen=1080x1800&ssid=superman&abtest=2`)
    	.then(res=>{
          	resolve(res.data)
		})
	})
	return mine
}

// export function getSearchList(value) {//获取搜索内容
// 	return fetch(`/suggest/suggest?q=${value}&le=eng&num=15&ver=2.0&doctype=json&keyfrom=mdict.7.2.0.android&model=honor&mid=5.6.1&imei=659135764921685&vendor=wandoujia&screen=1080x1800&ssid=superman&abtest=2`).then((data)=>{
// 		return data.json()
// 	})
// }

export function getResultList(value) {//获取翻译结果
	let mine = new Promise((resolve,reject)=>{
		axios.get(`/suggest/jsonapi?jsonversion=2&client=mobile&q=${value}&dicts=%7B%22count%22%3A99%2C%22dicts%22%3A%5B%5B%22ec%22%2C%22ce%22%2C%22newcj%22%2C%22newjc%22%2C%22kc%22%2C%22ck%22%2C%22fc%22%2C%22cf%22%2C%22multle%22%2C%22jtj%22%2C%22pic_dict%22%2C%22tc%22%2C%22ct%22%2C%22typos%22%2C%22special%22%2C%22tcb%22%2C%22baike%22%2C%22lang%22%2C%22simple%22%2C%22wordform%22%2C%22exam_dict%22%2C%22ctc%22%2C%22web_search%22%2C%22auth_sents_part%22%2C%22ec21%22%2C%22phrs%22%2C%22input%22%2C%22wikipedia_digest%22%2C%22ee%22%2C%22collins%22%2C%22ugc%22%2C%22media_sents_part%22%2C%22syno%22%2C%22rel_word%22%2C%22longman%22%2C%22ce_new%22%2C%22le%22%2C%22newcj_sents%22%2C%22blng_sents_part%22%2C%22hh%22%5D%2C%5B%22ugc%22%5D%2C%5B%22longman%22%5D%2C%5B%22newjc%22%5D%2C%5B%22newcj%22%5D%2C%5B%22web_trans%22%5D%2C%5B%22fanyi%22%5D%5D%7D&keyfrom=mdict.7.2.0.android&model=honor&mid=5.6.1&imei=659135764921685&vendor=wandoujia&screen=1080x1800&ssid=superman&network=wifi&abtest=2&xmlVersion=5.1`)
    	.then(res=>{
          	resolve(res.data)
		})
	})
	return mine
}

// export function getResultList(value) {//获取翻译结果
// 	return fetch(`/suggest/jsonapi?jsonversion=2&client=mobile&q=${value}&dicts=%7B%22count%22%3A99%2C%22dicts%22%3A%5B%5B%22ec%22%2C%22ce%22%2C%22newcj%22%2C%22newjc%22%2C%22kc%22%2C%22ck%22%2C%22fc%22%2C%22cf%22%2C%22multle%22%2C%22jtj%22%2C%22pic_dict%22%2C%22tc%22%2C%22ct%22%2C%22typos%22%2C%22special%22%2C%22tcb%22%2C%22baike%22%2C%22lang%22%2C%22simple%22%2C%22wordform%22%2C%22exam_dict%22%2C%22ctc%22%2C%22web_search%22%2C%22auth_sents_part%22%2C%22ec21%22%2C%22phrs%22%2C%22input%22%2C%22wikipedia_digest%22%2C%22ee%22%2C%22collins%22%2C%22ugc%22%2C%22media_sents_part%22%2C%22syno%22%2C%22rel_word%22%2C%22longman%22%2C%22ce_new%22%2C%22le%22%2C%22newcj_sents%22%2C%22blng_sents_part%22%2C%22hh%22%5D%2C%5B%22ugc%22%5D%2C%5B%22longman%22%5D%2C%5B%22newjc%22%5D%2C%5B%22newcj%22%5D%2C%5B%22web_trans%22%5D%2C%5B%22fanyi%22%5D%5D%7D&keyfrom=mdict.7.2.0.android&model=honor&mid=5.6.1&imei=659135764921685&vendor=wandoujia&screen=1080x1800&ssid=superman&network=wifi&abtest=2&xmlVersion=5.1`).then((data)=>{
// 		return data.json()
// 	})
// }

export function getToday() {//获取今日文章
	let mine = new Promise((resolve,reject)=>{
		axios.get('/article/today?dev=1')
    	.then(res=>{
          	resolve(res.data)
		})
	})
	return mine
}

// export function getToday() {//获取今日文章
// 	return fetch('/article/today?dev=1').then((data)=>{
// 		return data.json()
// 	})
// }

export function getAnotherDay(time) {//获取某日文章
	let mine = new Promise((resolve,reject)=>{
		axios.get(`/article/day?dev=1&date=${time}`)
    	.then(res=>{
          	resolve(res.data)
		})
	})
	return mine
}

// export function getAnotherDay(time) {//获取某日文章
// 	return fetch(`/article/day?dev=1&date=${time}`).then((data)=>{
// 		return data.json()
// 	})
// }

export function getRandomDay() {//获取随机文章
	let mine = new Promise((resolve,reject)=>{
		axios.get("/article/random?dev=1")
    	.then(res=>{
          	resolve(res.data)
		})
	})
	return mine
}

// export function getRandomDay() {//获取随机文章
// 	return fetch("/article/random?dev=1").then((data)=>{
// 		return data.json()
// 	})
// }