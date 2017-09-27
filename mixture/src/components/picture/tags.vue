<template>
<div id='tag'>
	<scroll>
		<div class='tagWrap'>
			<p class='bg'><img :src='authorMassage.coverUrl'></p>
			<p class='works_title'>{{authorMassage.name}}</p>
			<pictureType :authorMassage='authorMassage'></pictureType>		
		</div>
	</scroll>
</div>	
</template>

<script type="text/javascript">
import Scroll from 'base/Scroll'
import PictureType from 'base/PictureType'
import {getTags} from 'api/fetch'

export default{
	data(){
		return{
			authorMassage:{coverUrl:'',name:'', authorMassage:''}
		}
	},
	mounted(){
		var _this = this
		getTags(this.$route.params.id).then(res=>{	
			_this.authorMassage.imgSrcs =[]
			res.postList.forEach(function(value){
				if(value.cover_image_src){
					var obj = {}
					obj.author_id = value.author_id
					obj.image_srcs = value.cover_image_src
					obj.favorites = value.favorites
					_this.authorMassage.imgSrcs.push(obj)
				}
			})
			_this.authorMassage.coverUrl = res.coverUrl
			_this.authorMassage.name = _this.$route.params.id
			console.log(_this.authorMassage)
		})
	},
	methods:{

	},
	components:{
		Scroll,
		PictureType
	}
}	
</script>

<style scoped>
.bg {
	width: 100%;
	height: 4.5rem;
}
.bg img {
	width: 100%;
	height: 100%;
}
#tag .works_title {
	position: relative;
	top: 0;
	height: 1rem;
	line-height: 1rem;
	text-indent: 0.4rem;
	font-size: 0.35rem;
	color: #5c5d5d;
}	
</style>