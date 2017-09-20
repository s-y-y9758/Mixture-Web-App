<template>
<div id='pictureDetail'>
<scroll :data='authorMassage'>
	<div>
		<p class='author clearFix' @click='getAuthorSelf(authorMassage&&authorMassage.author_id)'>
			<span class='images'><img :src='authorMassage&&authorMassage.icon'></span>
			<span class='author_name'>{{authorMassage?authorMassage.name:''}}</span>
			<span class='publishTime'>{{authorMassage.time?authorMassage.time.split(' ')[0]:''}}</span>
		</p>
		<div>
			<div v-for='item in authorMassage&&authorMassage.imgSrc'>
				<p class='main_img'><img :src='item&&item'></p>				
			</div>
			<div class='content'>
				<h2 class='big-title'>{{authorMassage?authorMassage.title:''}}</h2>
				<p class="excerpt">{{authorMassage?authorMassage.excerpt:''}}</p>			
			</div>
		</div>
		<ul class='type clearFix'>
			<li class="list" v-for='item in authorMassage.tags'>{{item?item.tag_name:''}}</li>
		</ul>
	</div>
</scroll>
</div>

</template>

<script type="text/javascript">
import Scroll from 'base/Scroll';

export default {
	name:'pictureDetail',
	computed:{
		authorMassage() {
			return this.$store.getters.authorMassage
		}
	},
	mounted(){
		var obj = {}
		obj.id = this.$route.params.author_id;
		obj.index = 0
		console.log(obj.id,this.authorMassage.author_id)
		if(this.authorMassage.author_id == obj.id) {
			return
		}
		this.$store.dispatch('getAuthorMassage',obj);
	},
	methods:{
		getAuthorSelf(id) {
			this.$router.push({name:'AuthorSelf',params:{id:id}})
		}
	},
	components:{
		Scroll
	}

}
</script>

<style>
body,
html,
#pictureDetail {
	height: 100%;
}
#pictureDetail .wrapper {
	height: 100%;
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
#pictureDetail .author .images {
	float: left;
	width: 0.6rem;
	margin: 0 0.2rem;
	line-height: 1rem;
}
#pictureDetail .author .images img {
	width: 0.6rem;
	height: 0.6rem;
	border-radius: 50%;
}
#pictureDetail .author_name,
#pictureDetail .publishTime {
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