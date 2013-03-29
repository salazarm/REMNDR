App.Views.Notice = Backbone.View.extend({

	css : {
			"error" : "#errors",
		    "message": "#messages",
		    "success": "#success"
	},

	// Should be given both a message and a type that is either error
	// notice or success when this is created.

	initialize : function() {
		this.el = $("body");
		this.render();
	},

	render : function(){
		type = this.css[this.options.type];
		$(type,this.css["message"]).stop();
		$(type, this.css["message"]).hide();
		$(type).html(this.options.message);
		var before = $(type).height();
		$(type).fadeIn(300).delay(2500).fadeOut(1000);
	}

});