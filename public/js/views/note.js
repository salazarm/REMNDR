App.Views.Note = Backbone.View.extend({

	model: App.Models.Note,

	tagName: "div",


    events: {
        "click"   :   "edit_note",
    },

	template: _.template($("#note-template").html()),

	initialize: function(){
		_.extend(this.model, ViewHelper);
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function(){
		if (this.model.on){
			this.$el.html(this.template(this.model.toJSON()));
		}
		return this;
	},

	edit_note: function(){
		this.goTo("/notes"+this.model.id);
	}
	
});