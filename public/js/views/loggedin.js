App.Views.LoggedIn = Backbone.View.extend({
	
	_userDisplayTemplate: _.template($("#user-display-template").html()),

	initialize: function() {
		/* 
		   Behavior: This view destroys itself when the user logsout.
		   DESIGN DECISION: Chose to use a self distructing view
		   to avoid making the auth view manage this. 
		   should be slightly faster? Less template loading? 
		*/
		this.model.bind('change:loggedIn',this.self_destruct, this);
		this.render();
	},

	render: function() {
		this.$el.html(this._userDisplayTemplate(App.User.attributes));
	},

	self_destruct: function(p) {
		if (!p.attributes.loggedIn){
			this.$el.html("");
		    this.undelegateEvents();
		    this.$el.removeData().unbind(); 
		}
	}

});