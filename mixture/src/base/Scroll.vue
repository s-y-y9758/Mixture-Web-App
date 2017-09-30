<template>
	<div class='wrapper' ref='wrapper'>
		<slot></slot>
	</div>
</template>

<script type="text/javascript">
import Bscroll from 'better-scroll'
export default {
	name:'scroll',
	data(){
		return {
			loadingConnecting: false,
            pullupTip: {
                text: '加载更多',     // 松开立即刷新
                rotate: ''    // icon-rotate
            },
		}
	},
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
	    pullup: {
            type: Boolean,
            default: false
        },
        loadingStatus: {
            type: Object,
            default: function () {
                return {
                    showIcon: false,
                    status: ''
                };
            }
        },
        pullupUI: {
            type: Boolean,
            default: false
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
			if (this.pullup) {
                this.scroll.on('scrollEnd', () => {
                    // 滚动到底部
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                        this.$emit('scrollToEnd');
                    }
                });
            }
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