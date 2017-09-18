<template>
<scroll :data='authorMassage'>
	<div id='authorSelf'>
		<div class='forAuthor'>
			<div class='bg' :style="{backgroundImage:'url(https://s1.tuchong.com/sites/107/1073726/header.jpg?5)'}">
				<p class='icon' :style="{backgroundImage:'url('+authorMassage[0].sites[authorMassage[0].posts[0].author_id].icon +')'}">
				</p>
				<p class='name'>{{authorMassage[0]?authorMassage[0].sites[authorMassage[0].posts[0].author_id].name:''}}</p>
				<p class='des'>{{authorMassage[0]?authorMassage[0].sites[authorMassage[0].posts[0].author_id].description:''}}</p>
				<p class='follow'>粉丝:{{authorMassage[0]?authorMassage[0].sites[authorMassage[0].posts[0].author_id].followers:0}}</p>
			</div>
		</div>
		<p class='works_title'>作品</p>
		<ul class='works'>
			<li v-for='item in authorMassage[0].posts' @click='goDetails(item.author_id)'>
				<img v-lazy='item.image_srcs[0]'>
				<p class='num'>{{item.image_srcs.length>1?item.image_srcs.length:''}}</p>
				<p class='likes'>{{item.favorites}}喜欢</p>
			</li>
		</ul>
	</div>
</scroll>
</template>

<script type="text/javascript">
import Scroll from 'base/scroll'

export default {
	name:'authorSelf',
	computed:{
		authorMassage() {
			var arr = []
			arr.push(this.$store.getters.authorMassage)
			return arr
		}
	},
	methods:{
		goDetails(id){
			this.$router.push({name:'PictureDetail',params:{author_id:id}})
		}
	},
	components:{
		Scroll
	}
}	
</script>

<style scoped>
.forAuthor {
	position: relative;
	height: 4rem;
	background: #ccc;
}
.wrapper {
	width:100%;
	height:100%;
}
.bg {
	position: absolute;
	width:100%;
	height: 100%;
	font-size: 0.12rem;
	background-repeat: no-repeat;
	background-size:cover;
	color: #fff;
}
.bg .icon {
	width:0.72rem;
	height: 0.72rem;
	margin: 1.2rem auto 0;
	border-radius: 100%;
	background-position: center center;
	background-repeat: no-repeat;
}
.bg .name {
	line-height: 0.4rem;
}
.bg .des {
	padding: 0 0.6rem;
	line-height: 0.35rem;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
.bg p {
	text-align: center;
}
.works_title {
	height: 1rem;
	line-height: 1rem;
	text-indent: 0.4rem;
	font-size: 0.4rem;
	color: #ababab;
}
.works {
	overflow: hidden;
}
.works .num {
	font-size: 0.12rem;
	margin-top: -3.7rem;
	padding-right: 0.2rem;
	text-align: right;
	color: #fff;
}
.works .likes {
	font-size: 0.12rem;
	margin-top: 3rem;
	padding-left:0.2rem;
	color: #fff;
}
.works li {
	float: left;
	width: 50%;
	height:4rem;
	box-sizing: border-box;
}
.works>:nth-child(odd) {
	padding-right:0.1rem; 
}
.works>:nth-child(even) {
	padding-left:0.1rem; 
}
.works li img {
	width: 100%;
}	
</style>