var App = {
    Views: {},
    Routers: {},
    Collections: {},
    Models: {},
    Utils: {},
    Notes : null, 
    Index: null,
    Editing: null,
    init: function(user) {
        App.User = user;

        /*  Wasn't sure how to connect the login flow with my router since
            I created them separately. So I created a global user variable
            that everone knows about which might not be good design?
            For next phase I will try to clean up code.
        */
        var appRouter = new App.Routers.Notes({ });
        Backbone.View.prototype.goTo = function (loc) {
          scr = document.body.scrollTop;
          appRouter.navigate(loc, true);
          document.body.scrollTop = scr;
        };
        App.loaded = false;
        App.Notes = new App.Collections.Notes({}); 
        App.Auth = new App.Views.Auth({ model: App.User, el: $("#auth") });
        Backbone.history.start();
    },
};