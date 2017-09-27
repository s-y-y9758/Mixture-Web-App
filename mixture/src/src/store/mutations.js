 const mutations= {
	getTodayList(state,arr){
		state.todayList = arr
	},
	score(state,parseScore) {
		state.score = parseScore;
	},
	scoring(state,data){
		state.score = data
	},
	getPictureId(state,content1) {
		state.pictureId = content1
	},
	getAuthorMassage(state,content){
		state.authorMassage = content
	},
	getVideo(state,content) {
		state.videoes = content
	},
	getResultList(state,content){
		state.resultList = content
	}
}
export default mutations