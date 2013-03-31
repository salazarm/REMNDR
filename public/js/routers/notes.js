App.Routers.Notes = Backbone.Router.extend({
    routes: {
        "notes/:id":            "edit",
        "new":                  "newNote",
        "*path":                "index"  // Wildcard route
    },

    initialize: function() {
        router = this;
        Backbone.View.prototype.goTo = function (loc) {
          scr = document.body.scrollTop; 
          router.navigate(loc, true);
          document.body.scrollTop = scr; 
        };

        Backbone.history.start();
    },
    
    edit: function(id) {
        that=this;
        var note = new Note({ id: id });
        note.fetch({  
            success: function(model, response, options) {
                if (App.Editing){
                    // Clean up ghost view
                    App.Editing.destroy();
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
    },
    
    newNote: function() {
        if (App.Editing) {  
            // Clean up ghost view
            App.Editing.destroy(); 
        }
        App.Editing = new App.Views.Edit({ model: new Note(), el: $("#app") });
    },


});