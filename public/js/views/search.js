App.Views.Search = Backbone.View.extend({

	results: $("#results"),
	bottom: _.template($("#bottom-results-template").html()),

	events: {
		"focus"    : "show_results",
		"blur"     : "hide_results",
		"keydown" : "render",
		"keyup"   : "render"
	},

	show_results : function() {
		this.results.show();
	},

	hide_results : function(ev) {
		this.results.hide();
	},

	initialize: function(){
		this.note_template = this.options.note_template;
	},	

	render: function() {
		this.results.html("");
		var query = $("#search").val();
		if (query != ""){
			this.results.show();
			var results = this.collection.search(query);
			that = this;
			var i = 0;
			_.each(results, function(note){
				if (i<11){
					i+=1;
					_.extend(note.attributes, ViewHelper);
	                that.results.append(that.note_template(note.attributes));
	            }
			});
			this.results.append(this.bottom({
					showing: i,
					total: results.length
				}));
		} else {
			this.results.hide();
		}
	}

})