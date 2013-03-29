App.Views.Edit = Backbone.View.extend({

    events: {
        "click .save1" : "save",
        "click .close1" : "close",
        "click .delete1" : "destroy"
    },
    
    initialize : function() {
        this.model.bind('reset', this.render(), this);
    },
    
    save : function() {
        that = this;
        var msg = this.model.isNew() ? 'Successfully created!' : "Saved!";
        var due;

        var title = this.$('[name=title]').val();

        if ( title == "") {
            new App.Views.Notice({ 
                    message: "Reminder title cannot be empty!", 
                    type: "error" 
                });
            return
        }

        try {
            due = (new Date( this.$("#due-date").val() )).toISOString();
        } catch (err) {
            new App.Views.Notice({ 
                    message: "Invalide date!", 
                    type: "error" 
                });
            return;
        }


        new App.Views.Notice({ 
                message: "Saving...", 
                type: "message"
            });

        this.model.save({ 
                          title: title, 
                          content: this.$('[name=content]').val(),
                          due: due,
                      }, 
        {
            success: function(model, resp) {
                new App.Views.Notice({ 
                        message: msg, 
                        type: "success" 
                    });
                that.goTo('notes/' + model.get("id"));
                that.render(true);
            },
            error: function(model, response, options) {
                new App.Views.Notice({ message: "Save failed!", type: "error" });
            }
        });
        
        return false;
    },
    
    destroy : function() {
        that = this;
        new App.Views.Notice({ message: "Removing reminder...", type: "message"});
        this.model.destroy({
            success: function(model, response, options){
                that.close();
                new App.Views.Notice({message: "Successfully remove reminder", type:"success"});
            },

            error: function(model, response, options) {
                new App.Views.Notice({message: "Could not remove reminder", type:"error"});
            }
        });
    },

    render : function(fastRender) {
        $("#new-post-it-wrapper").hide();
        if (fastRender) {
            $('.created-at').html("Created: "+ViewHelper.pretty_date(this.model.get("created_at")));
            $('#due-date').val( ( new Date( this.model.get("due") ).format("yyyy-mm-dd h:MM:ss TT Z") ) );
        } else {
            if ($("textarea").is(":visible")){
                var that = this;
                $("textarea").fadeOut(200, function(){
                    $('[name=content]').val(that.model.get('content'));
                    $('[name=title]').val(that.model.get('title'));
                });
                $("textarea").fadeIn(200);
                $(".bttn").fadeIn(200);
            } else {
                $('[name=content]').val(this.model.get('content'));
                $('[name=title]').val(this.model.get('title'));
                $("textarea").fadeIn(400);
                $(".bttn").fadeIn(400);
            }
            $('.save1').html(this.model.isNew() ? 'Create' : 'Save');
            if (!this.model.isNew()){
                $('.created-at').html("Created: "+ViewHelper.pretty_date(this.model.get("created_at")));
                $('#due-date').val( ( new Date( this.model.get("due") ).format("yyyy-mm-dd h:MM:ss TT Z") ) );
            } else { 
                $('.created-at').hide();
                $('#due-date').val((new Date()).format("yyyy-mm-dd h:MM:ss TT Z"));
            }
        }
    },

    close : function() {
        App.Editing.undelegateEvents();
        $("textarea").fadeOut(600, function(){
            $("#new-post-it-wrapper").fadeIn(400);
            App.Editing = null;
        });
        $(".bttn").fadeOut(400);
        this.goTo("");
    }
});