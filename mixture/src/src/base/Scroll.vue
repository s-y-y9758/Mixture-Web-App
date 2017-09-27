<template>
	<div class='wrapper' ref='wrapper'>
		<slot></slot>
	</div>
</template>

<script type="text/javascript">
import Bscroll from 'better-scroll'
export default {
	name:'scroll',
	props: {
		click: 
		{
			type:Boolean,
			default:true
		},
		probeType:{
			type:Number,
			default:1
		},
	    data: {
	        // type: Array,
	        default: null
	    },
	    scrollY:{
	    	type: Boolean,
	        default: true
	    },
	    scrollX:{
	        type: Boolean,
	        default: false
	    },
	    listenScroll:{
	    	type:Boolean,
	    	default:false
	    }
	},
	mounted() {
		this.$nextTick(function() {
			this._initScroll()
		})
	},
	methods:{
		_initScroll() {
			if (!this.$refs.wrapper) {
	          return
	        }
			this.scroll = new Bscroll(this.$refs.wrapper,{
				click:this.click,
				probeType:this.probeType,
				scrollX:this.scrollX
			});
			if(this.listenScroll) {
				var me = this;
				this.scroll.on('scroll', function(pos) {
		            me.$emit('scroll', pos)
		        })
			};
		},
		disable() {
        	this.scroll && this.scroll.disable()
	    },
	    enable() {
	        this.scroll && this.scroll.enable()
	    },
		refresh() {
	        this.scroll && this.scroll.refresh()
	    },
	    scrollTo() {
	        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
	    },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
	},
	watch:{
		data() {
	        setTimeout(() => {
	          this.refresh()
	        }, 20)
	      }
	}
}
</script>

<style>
	
</style>