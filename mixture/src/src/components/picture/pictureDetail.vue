<template>
<div id='pictureDetail'>
<scroll :data='authorMassage' ref='scroller'>
	<div>
		<p class='author clearFix' @click='getAuthorSelf(authorMassage&&authorMassage.author_id)'>
			<span class='images'><img :src='authorMassage&&authorMassage.icon'></span>
			<span class='author_name'>{{authorMassage?authorMassage.name:''}}</span>
			<span class='publishTime'>{{authorMassage.time?authorMassage.time.split(' ')[0]:''}}</span>
		</p>
		<div>
			<div>
				<p class='main_img'><img :src='authorMassage.imgSrc&&authorMassage.imgSrc[0]'></p>				
			</div>
			<div class='content'>
				<h2 class='big-title'>{{authorMassage?authorMassage.title:''}}</h2>
				<p class="excerpt">{{authorMassage?authorMassage.excerpt:''}}</p>	
			</div>
		</div>
		<ul class='type clearFix'>
			<li class="list" v-for='item in authorMassage.tags' @click='goTag(item.tag_name)'>{{item?item.tag_name:''}}</li>
		</ul>
		<p class='works_title' @click='getAuthorSelf(authorMassage&&authorMassage.author_id)'>
			<span class="images">
				<img :src='authorMassage&&authorMassage.icon'>
			</span>
			<span class='text'>{{authorMassage?authorMassage.name+'的其他作品':''}}</span>
			<span class='more'>更多>></span>
		</p>
		<pictureType :authorMassage='authorMassage' @goDetail='pictureDetail'></pictureType>
	</div>
</scroll>
</div>

</template>

<script type="text/javascript">
import Scroll from 'base/Scroll';
import PictureType from 'base/PictureType'
import {getNewObj} from 'common/js/getNewObj'

export default {
	name:'pictureDetail',
	data() {
		return{
			scrollY:-1
		}
	},
	computed:{
		authorMassage() {
			var message = this.$store.getters.authorMassage;
			var newMessage = getNewObj(message);
			if(newMessage.imgSrcs) {
				newMessage.imgSrcs.length = 4;
			}
			
			return newMessage
		}
	},
	mounted(){
		var obj = {}
		obj.id = this.$route.params.author_id;
		obj.index = 0
		if(this.authorMassage.author_id == obj.id) {
			return
		}
		this.$store.dispatch('getAuthorMassage',obj);
	},
	methods:{
		getAuthorSelf(id) {
			this.$router.push({name:'AuthorSelf',params:{id:id}})
		},
		pictureDetail(obj){
			this.$store.dispatch('getAuthorMassage',obj);
			this._scrollTo();
		},
		goTag(name){
			this.$router.push({name:'Tags',params:{id:name}})
		},
		_scrollTo(){
			this.$refs.scroller.scrollTo(0,0,600)
		}
	},
	components:{
		Scroll,
		PictureType
	}

}
</script>

<style scoped>
body,
html,
#pictureDetail {
	height: 100%;
}
#pictureDetail .wrapper {
	height: 100%;
}
.works_title {
	height: 1rem;
	line-height: 1rem;
	font-size: 0.4rem;
	color: #ababab;
}
.works_title .text,
#pictureDetail .more{
	float: left;
	height:0.6rem;
	line-height: 0.6rem;
	color:#000;
	font-size: 0.3rem;
}
#pictureDetail .more{
	float: right;
	padding-right: 0.3rem;
	color:#919393;
}
#pictureDetail .type .list {
	float: left;
	margin: 0.15rem 0.14rem 0 0;
	height: 0.44rem;
	line-height: 0.44rem;
	padding: 0 0.26rem 0 0.2rem;
	border: 1px solid #e4e4e6;
	border-radius: 0.2rem;
	background: #f4f5f7;	
	font-size: 0.22rem;
	color:#88898b;
}

#pictureDetail .author {
	line-height: 1.18rem;
	height: 1.18rem;
	padding-left: 0.25rem 0 0 0.28rem; 
}
#pictureDetail .author .images,
.works_title .images{
	float: left;
	width: 0.6rem;
	margin: 0 0.2rem;
	line-height: 1rem;
}
#pictureDetail .author .images img,
.works_title img {
	width: 0.6rem;
	height: 0.6rem;
	border-radius: 50%;
}
#pictureDetail .author_name,
#pictureDetail .publishTime{
	float: left;
	margin: 0 0.2rem 0 0;
	line-height: 1.18rem;
	font-size: 0.26rem;
	color: #7a7a7c;
}

#pictureDetail .main_img {
	width: 100%;
	text-align: center;
}
#pictureDetail .main_img img {
	width: 100%;
}
#pictureDetail .content,
#pictureDetail .type {
	padding: 0 0.35rem 0 0.3rem;
}
#pictureDetail .type {
	overflow: hidden;
	padding-bottom: 0.5rem;
}
#pictureDetail .big-title {
	font-size: 0.34rem;
	line-height: 0.96rem;
	color: #1e1e1e;
}
#pictureDetail .excerpt {
	font-size: 0.24rem;
	line-height: 0.38rem;
	color: #9c9c9c;
}
</style>