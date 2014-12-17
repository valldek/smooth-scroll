var smooth = {
	duration : 1000,	// time needed for whole scroll
	steps : 20,			// number of steps during scroll
	fixedTop: 0,		// height of fixed top in px


	init : function(evt,el){
	/* 
	 * Initialize needed variables, basic calculation, if id string is not usable, stops script execution.
	 * Prevent default link behavior, stops ongoing scrolling
	 * @param {Object} evt Event
	 * @param {Object} el Clicked link
	 */
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
	/* 
	 * Get id name string or null from clicked link href attribute
	 * @param {Object} el Clicked element
	 * @return {String|null} Returns null if wrong href value
	 */		
		var h;
		if(el.attributes.href === undefined) {
			h = null;
		} else {
			h = el.attributes.href.value.toString();
			if(h.length > 1 && h.indexOf('#') != -1){
				h = h.substr(h.indexOf('#') + 1);
			} else {
				h = null;
			}
		}
		return h;
	},
	getAnchorPos : function(id){
	/* 
	 * Get anchor position in document
	 * @param {String} id String with anchor ID name
	 * @return {Number} anchor position in document
	 */			
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
	/* 
	 * Get current scroll position in document
	 * @return {Number} current position in document
	 */	
		var cp = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
		return cp;
	},
	startScroll : function(d,s,ap,gp,ad){
	/* 
	* Start scrolling procedure until desired position is reached. 
	* Temp corrects gap if ad is not equal 0. This ensure that gap is always an integer
	* @param {Number} d Duration time 
	* @param {Number} s Steps number 
	* @param {Number} ap Position to which scroll 
	* @param {Number} gp Gap - pixel number to scroll between each step 
	* @param {Number} ad The remainder of division 
*/
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
	/* 
	 * Stops ongoing scrolling
	 */	
		if(this.tm !== null) {
			clearTimeout(this.tm);
		}
	},
	tm : null		// initializing timer variable
}
