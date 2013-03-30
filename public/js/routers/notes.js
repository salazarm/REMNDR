App.Routers.Notes = Backbone.Router.extend({
    routes: {
        "notes/:id":            "edit",
        "new":                  "newNote",
        "*path":                "index"  // Wildcard route
    },
    
    edit: function(id) {
        if (!App.User.get("loggedIn")) return;
        that=this;
        var note = new Note({ id: id });
        this.beforeRoute();
        note.fetch({  
            success: function(model, response, options) {
            if (App.Editing){
                App.Editing.undelegateEvents();
            }
                App.Editing = new App.Views.Edit({el: $("#app"), model: note });
            },
            error: function(model, response, options) {
                new App.Views.Notice({ message: 'Could not find that note.', type: "error" });
            }
        })
    },
    
    index: function(path) {
        this.navigate("");
        if (!App.User.get("loggedIn")) return;
        App.Notes.fetch({
            success: function(model, response, options){
                if (App.Index == null){
                    App.Index = new App.Views.Index({el: $("#app"), collection: App.Notes});
                }
            },
            error: function(model, response, options){
                new App.Views.Notice({ message: response.msg, type: "error"})
            }
        });
    },
    
    newNote: function() {
        if (!App.User.get("loggedIn")) return;
        this.beforeRoute();
        if (App.Editing){
            App.Editing.undelegateEvents();
        }
        App.Editing = new App.Views.Edit({ model: new Note(), el: $("#app") });
    },

    // Check if reminders are loaded
    beforeRoute: function() {
        if (!App.loaded){
            this.index();
        }
    },
});