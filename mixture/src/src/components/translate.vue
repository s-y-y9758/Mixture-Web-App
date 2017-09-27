<template>
<div id='translate'>
	<div class="header">
		<search
		ref='searches'
		@on-change="getResult()"
		position="relative"></search>
		<ul class='search_resultWrap' v-show='searchList.entries'>
			<li class='search_result' v-for='item,index in searchList.entries' ref='search_result' @touchstart='goDetail(index)'>
				<span class='result_text'>{{`${item.entry}&nbsp;&nbsp;&nbsp;${item.explain}`}}</span>
				<span class='word'>
					<i class='iconfont'>&#xe6ac;</i>
				</span>
			</li>
		</ul>
	</div>
	<div class='translate_main'>
		<div class='translate_content'>
			<div class='content_query'>{{resultList.simple?resultList.simple.query:''}}</div>
			<div class='symbol'>
				<span class="one" v-if='resultList.simple'>{{`/${resultList.simple.phone}/`}}</span>
			</div>
		</div>
		<div>
	      	<tab :line-width=2 active-color='#000' v-model="index">
	        	<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
	      	</tab>
	      	<swiper v-model="index" height="437px" :show-dots="false">
	        	<swiper-item v-for="(item, index) in list2" :key="index">
	        		<scroll :data='resultList'>
	          		<div class="tab-swiper vux-center">
					    <div class='itemListContent' v-if='index==0'>
					    	<div class='ec' v-if='resultList.syno'>
					    		<p class='ec_content' v-for='item1 in resultList.syno'>
					    			<span>{{item1.syno?item1.syno.pos:''}}</span>
					    			<span>{{item1.syno?item1.syno.tran:''}}</span>
								</p>
					    	</div>
					    	<div class='netWork'>
					    		<h4 class='title'>网络释义</h4>
					    		<ul class="list">
					    			<li class='listDetail' v-for='item2,index in resultList.webTrans'>
				    					<p class='listDetail_title'>
					    					<span class='listDetail_title'>{{index+1}}</span>
					    					<span class='text'>{{item2.value}}</span>
					    				</p>
					    				<p class='text'>{{item2.summary.line[0]}}</p>
					    			</li>
					    		</ul>
					    		<p class='more'>查看更多></p>
					    	</div>
					    </div>
					    <div class='collins' v-if='index==1'>
					    	<div class='collins-top'>
					    		<span class='headword'>{{resultList.collins?resultList.collins.headword:''}}</span>
					    		<span class='phonetic' v-if='resultList.collins'>/{{resultList.collins?resultList.collins.phonetic:''}}/</span><span class='cet'>{{resultList.collins?resultList.collins.cet:''}}</span>
					    		
					    	</div>
					    	<p class='wordform' v-if='resultList.collins.wordform'>
					    		<span v-for='item8 in resultList.collins.wordform'>{{item8}}</span></p>
					    	<ul>
					    		<li class='tranentry' v-for='item3,index in resultList.collins.entry'>
					    			<span class="num">{{index+1}}</span>
					    			<span class='tran' v-html='item3.tran_entry[0].tran'></span>
					    			<p class='eng_sent' v-if='item3.tran_entry[0].exam_sents'>·&nbsp;{{item3.tran_entry[0].exam_sents?`${item3.tran_entry[0].exam_sents.sent[0].eng_sent}`:''}}</p>
					    			<p class='chn_sent'>{{item3.tran_entry[0].exam_sents?`${item3.tran_entry[0].exam_sents.sent[0].chn_sent}`:''}}</p>
					    		</li>
					    	</ul>
					    </div>
					    <div class='ec21' v-if='index==2'>
					    	<div class='ec21_head'>
					    		<span class='headword'>{{resultList.collins.headword}}</span>
					    		<span class='phonetic'>/{{resultList.collins.phonetic}}/</span>
					    	</div>
					    	<div class='ec21_trs'>
					    		<ul v-for='item5 in resultList.ec21.trs'>
					    			<p class='ec21_trs_head'>{{item5?item5.pos:''}}</p>
					    			<li class='ec21_tr' v-for='item6,index in item5.tr'>
					    				<span class="ec21_num">{{index+1}}</span>
						    			<span class='ec21_l'>{{item6.l.i[0]}}</span>
						    			<div class='ec21_exam' v-for='item7 in item6.exam'>
						    				<p class='ec21_examn'>·&nbsp;{{item7.i.f.l.i}}</p>
						    				<p class='ec21_exami'>{{item7.i.n.l.i}}</p>
						    			</div>
						    			
					    			</li>
					    		</ul>
					    	</div>
					    </div>
	          		</div>
	          		</scroll>
	        	</swiper-item>
	      	</swiper>
	    </div>	 
	</div>
</div>
</template>

<script type="text/javascript">
import Scroll from 'base/Scroll';
import {Search,Tab,TabItem,Swiper,SwiperItem} from 'vux'
import {getSearchList,getResultList} from 'api/fetch'
const list = () => ['简明',"柯林斯",'21世纪']

export default{
	data(){
		return {
			searchList:{},
			list2:list(),
			demo2:'简明',
			index:0
		}
	},
	created(){
		this.$store.dispatch('getResultList','account')			
	},
	computed:{
		resultList(){
			return this.$store.getters.resultList
		}
	},
	methods:{
		onItemClick (index) {
		    this.$emit('on item click:', index)
		},
		getResult() {
			let value = this.$refs.searches._data.currentValue
			this._getSearchList(value)
		},
		goDetail(index) {
			var value = this.searchList.entries[index].entry
			this.$store.dispatch('getResultList',value)
			this.searchList ={}
		},
		_getSearchList(value) {
			getSearchList(value).then(res=>{
				this.searchList = res.data
			})
		}
	},
 	components:{
		Search,
		Tab,
		TabItem,
		Swiper,
		SwiperItem,
		Scroll
	}
}	
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 413331 */
  src: url('//at.alicdn.com/t/font_413331_2pbqi89ivp74x6r.eot');
  src: url('//at.alicdn.com/t/font_413331_2pbqi89ivp74x6r.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_413331_2pbqi89ivp74x6r.woff') format('woff'),
  url('//at.alicdn.com/t/font_413331_2pbqi89ivp74x6r.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_413331_2pbqi89ivp74x6r.svg#iconfont') format('svg');
}
#translate .iconfont {
	font-family: iconfont;
}
#translate {
	height: 100%;
	background: #f8f8f8;
}
#translate .wrapper {
	height: 100%;
}
#translate .weui-icon-search {
	margin-top: 0.2rem;
}
#translate .weui-search-bar__cancel-btn {
	font-size: 0.4rem !important;
	line-height: 1rem !important;
}
#translate .weui-search-bar__input {
	margin: 0.2rem 0.3rem 0 0.2rem !important;
	vertical-align: top;
}
#translate .weui-search-bar__label {
	text-align: left !important;
	box-sizing: border-box;
	padding-left: 0.3rem;
	margin-top: 0.1rem !important; 
}
#translate .weui-search-bar__label span {
	margin-top: -0.3rem !important;
}
#translate .weui-search-bar__label .weui-icon-search {
	margin-top: -0.3rem !important;
}
#translate .search_resultWrap {
	position: absolute;
	top: 1.32rem;
	width: 100%;
	background: #fff;
	min-height: 100%;
	z-index: 2;
}
#translate .translate_main {
	position: absolute;
	top: 1.32rem;
	width: 100%;
}
#translate .search_result {
	margin:0 2.5%;
	height: 1.2rem;
	width: 95%;
	box-sizing: border-box;
	line-height: 1.2rem;
	border-bottom: 1px solid #ccc;
	font-size: 0.3rem;
}
#translate .word{
	float: left;
	width:6%;
}
#translate .search_result .result_text {
	float: left;
	height: 1.2rem;
	margin: 0 0.3rem; 
	width:6rem;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
#translate .translate_content {
	margin-bottom: 0.1rem;
	height: 2.4rem;
	padding: 0 0.36rem;
	font-size: 0.4rem;
	background: #fff;
}
#translate .content_query {
	margin-bottom: 0.2rem;
	height: 1.2rem;
	line-height: 1.2rem;
	font-size: 0.6rem;
}
#translate .symbol {
	font-size: 0.3rem;
}
#translate .symbol .mei {
	margin-right: 0.2rem;
}
#translate .tabWrap {
	background: #fff;
}
#translate .itemListContent,
#translate .collins,
#translate .ec21 {
	width: 100%;
	margin-top: 0.05rem;
	background: #fff;
	font-size: 0.3rem;
	background: #f1f1f1;
}
#translate .ec21 {
	padding: 0.3rem 0 0.3rem;
	background: #fff;
}
#translate .collins {
	background: #fff;
	font-size: 0.35rem;
	padding: 0.3rem 0 0.5rem;
}
#translate .collins-top,
#translate .ec21_head {
	line-height: 0.6rem;
	padding: 0 0.3rem;
}
#translate .headword {
	color: #ce424b;
	font-size: 0.35rem;
	margin-right: 0.1rem;
}
#translate .phonetic {
	font-style: italic;
}
#translate .cet {
	margin-left: 0.2rem;
}
#translate .wordform{
	line-height: 0.5rem;
	padding: 0 0.3rem;
}
#translate .tranentry,
#translate .ec21_tr{
	padding: 0.3rem 0.2rem 0 0.3rem;
}
#translate .ec21_trs_head {
	margin-top: 0.3rem;
}
#translate .tranentry .tran,
#translate .tranentry .eng_sent,
#translate .tranentry .chn_sent,
#translate .ec21_l
{
	line-height: 0.5rem;
}
#translate .ec21_examn,
#translate .ec21_exami {
	line-height: 0.4rem;
	color: #929292;
}
#translate .ec21_exami {
	margin-left:0.15rem;
}
#translate .ec21_exam p {
	padding-left: 0.25rem;
}
#translate .tranentry .tran b {
	color: #ce424b;
}
#translate .tranentry .eng_sent,
#translate .tranentry .chn_sent,
#translate .ec21_examn {
	margin-top: 0.1rem;
	color: #929292;
}
#translate .tranentry .num 
#translate .ec21_num{
	margin-right: 0.15rem;
	color: #929292;
}
#translate .ec21_num {
	margin-right: 0.1rem;
}
#translate .ec21_trs_head {
	padding: 0.1rem 0.3rem 0; 
}
#translate .vux-slider > .vux-swiper{
	height: 432px !important;
}
#translate .itemListContent .ec {
	margin-bottom: 0.1rem;
	background: #fff;
	padding: 0.3rem;
}
#translate .ec_content {
	line-height: 0.5rem;
	margin-bottom: 0.2rem;
}
#translate .ec_content span:nth-of-type(1) {
	margin-right: 0.2rem;
}

#translate .itemListContent .netWork {
	background: #fff;
	padding: 0.3rem;
}
#translate .netWork .title {
	font-size: 0.4rem;
	color: #8f9094;
	margin-bottom:0.3rem;
}
#translate .listDetail {
	padding-bottom: 0.3rem;
}
#translate .listDetail .listDetail_title {
	margin-bottom: 0.15rem;
}
#translate .listDetail .listDetail_title span:nth-of-type(1){
	float: left;
	line-height: 0.45rem;
	margin-right: 0.1rem;
	color:#acabb0;
}
#translate .listDetail .listDetail_title span:nth-of-type(2){
	color:#29282d;
}
#translate .listDetail .text {
	padding-left: 0.3rem;
	line-height: 0.45rem;
	color: #9a9ba0;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
#translate .netWork .more {
	padding: 0.3rem 0 0.3rem;
	text-align:right;
	color: #9a9ba0;
}
#translate .weui-search-bar__box .weui-icon-clear {
	line-height: 50px !important;
}

</style>