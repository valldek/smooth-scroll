var smooth = {
	duration : 1000,
	steps : 20,
	fixedTop: 0,


	init : function(evt,el){
		var d,s,ft,id,ap,cp,df,ad,gp;

		d = this.duration;
		s = this.steps;
		ft = this.fixedTop;
		id = this.getAnchorId(el);
		if(id !== null) {
			evt.preventDefault();
			this.stopScroll();
			ap = this.getAnchorPos(id) - ft;
			cp = this.getCurrentPos();
			df = ap - cp;
			ad = df%s;
			gp = df/s > 0 ? Math.floor(df/s) : Math.ceil(df/s);

			this.startScroll(d,s,ap,gp,ad)
		} else {
			return;
		}
	},
	getAnchorId : function(el){
		var h;
		if(el.attributes.href === undefined) {
			h = null;
		} else {
			h = el.attributes.href.value.toString();
			if(h.length > 1 && h.indexOf('#') != -1){
				h = h.substr(1);
			}
		}
		return h;
	},
	getAnchorPos : function(id){
		var ap = 0;
		var el = document.getElementById(id);
		do {
			ap += el.offsetTop;
			el = el.offsetParent;
		} while (el.offsetParent != null && el.offsetParent != undefined);

		var ch = document.body.scrollHeight - document.documentElement.clientHeight;
		return (ch < ap) ? ch : ap;
	},
	getCurrentPos : function(){
		var cp = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
		return cp;
	},
	startScroll : function(d,s,ap,gp,ad){
		var temp;
		if(ad > 0) {
			temp = gp + 1;
			ad -= 1;
		} else if(ad < 0) {
			temp = gp -1;
			ad += 1;
		} else {
			temp = gp;
		}		
		var cp = this.getCurrentPos();

		if(cp !== ap){
			window.scrollTo(0,cp+temp);
			var self = this;
			this.tm = setTimeout(function(){
				self.startScroll(d,s,ap,gp,ad);
			}, d/s);
		}
	},
	stopScroll : function(){
		if(this.tm !== null) {
			clearTimeout(this.tm);
		}
	},
	tm : null
}
