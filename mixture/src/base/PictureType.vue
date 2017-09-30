<template>
<div id='PictureType'>
	<ul class='works'>
		<li v-for='item,index in authorMassage.imgSrcs' @click='goDetails(authorMassage.author_id,index)' ref='li'>
			<img :src='item&&item.image_srcs[0]'>
			<p class='num'>{{item.image_srcs.length>1?item.image_srcs.length:''}}</p>
			<p class='likes'>{{item.favorites}}喜欢</p>
		</li>
	</ul>
	<slot></slot>
</div>
	
</template>

<script type="text/javascript">
export default{
	name:'PictureType',
	props:['authorMassage'],
	methods:{
		goDetails(id,index){
			var obj = {id,index}
			this.$emit('goDetail',obj)
		}
	}
}	
</script>

<style scoped>

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
	height:3.8rem;
	box-sizing: border-box;
	overflow:hidden;
}
.works>:nth-child(odd) {
	padding-right:0.05rem; 
}
.works>:nth-child(even) {
	padding-left:0.05rem; 
}
.works li img {
	width: 100%;
}		
</style>