App.Views.Index = Backbone.View.extend({

    collection: App.Collections.Notes,

    user: App.Models.User,
    
    events: {
        "click #new-post-it-wrapper"    :   "newNote",
    },

    initialize : function() { 
        $("textarea").hide();
        $(".bttn").hide();
        new App.Views.Nav({ collection: this.collection, el: $(".app-header") });
        this.listenTo(this.collection, "sync", this.check_sync);
    },

    render : function() {
        if (App.Editing == null){
            $("#new-post-it-wrapper").show();
        }
    },

    newNote : function() {
        this.goTo("new");
    },

    check_sync : function() {

    }

});