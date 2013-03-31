var App = {
    Views: {},
    Routers: {},
    Collections: {},
    Models: {},
    Utils: {},
    Editing: null,
    Router: null,
    init: function(user) {
        App.User = user;
        /* Fire up this bad boy */
        new App.Views.Auth({ model: App.User, el: $("#auth") });
    },
};