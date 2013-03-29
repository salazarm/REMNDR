App.Views.Index = Backbone.View.extend({
    // Enum types

    displayCollection : Backbone.Collection.extend({ }),

    noteTemplate: _.template($('#note-template').html()),

    displaying : "todays",

    events: {
        "click .reminder"   : "editNote",
        "click #new-post-it-wrapper"    :  "newNote",
        "click .tod-wrap"   :  "switchToday",
        "click .tom-wrap"   :  "switchTomorrow",
        "click .week-wrap"  :  "switchWeek",
        "click .all-wrap"   :  "switchAllTime",
    },

    // Used on render to update the displayCollectionz
    displays: function(){
        switch(this.displaying){
            case "todays":
                this.displayCollection.collection = App.Notes.getTodays();
                break;
            case "tomorrows":
                this.displayCollection.collection = App.Notes.getTomorrows();
                break;
            case "weeks":
                this.displayCollection.collection = App.Notes.getWeeks();
                break;
            case "allTimes":
                this.displayCollection.collection = App.Notes.getAllTimes();
                break;
        }
    },

    switchToday : function() {   
        this.displaying = "todays";
        this.clean();
        this.today.addClass("active");
        this.render();
    },

    switchTomorrow : function() {
        this.displaying = "tomorrows";
        this.clean();
        this.tomorrow.addClass("active");
        this.render();
    },
    
    switchWeek : function() {
        this.displaying = "weeks";
        this.clean();
        this.week.addClass("active");
        this.render();
    },

    switchAllTime : function() {
        this.displaying = "allTimes"
        this.clean();
        this.alls.addClass("active");
        this.render();
    },

    initialize : function() { 
        this.today = $(".tod-wrap");
        this.tomorrow = $(".tom-wrap");
        this.week = $(".week-wrap");
        this.alls = $(".all-wrap");
        this.today_num = $("span.today");
        this.tomorrow_num = $("span.tomorrow");
        this.week_num = $("span.week");
        this.all_time_num = $("span.all-time");


        $("textarea").hide();
        $(".bttn").hide();
        $(".calendar").hide();
        this.days = [this.today, this.tomorrow, this.week, this.alls];
        App.Notes.bind('change' , this.render, this);
        this.switchToday();
        setInterval(function(){
            if (App.User.get("loggedIn")){
                console.log("in")
                App.Notes.fetch({
                    error: function(model, response, options){
                        new App.Views.Notice({ message: response.msg? response.msg : "Failed to load reminders" , type: "error"})
                    }
                });
            }
        }, 1000);
    },
    
    clean : function(){
        _.each(this.days, function(d){ d.removeClass("active");});
    },

    render : function() {
        // Fill in the reminders
        if (App.Editing == null){
            $("#new-post-it-wrapper").show();
        }
        $(".reminders").empty();
        noteTemplate = this.noteTemplate;
        this.displays();
        _.each(this.displayCollection.collection.sort(function(a,b){
            s = (new Date(a.attributes.due)).getTime()-(new Date(b.attributes.due)).getTime();
            return s;
        }), function(note){
            _.extend(note.attributes, ViewHelper);
            $(".reminders").append(noteTemplate(note.attributes));
        });

        // fill in the number values for each type
        this.today_num.html( this.collection.getTodays().length );
        this.tomorrow_num.html( this.collection.getTomorrows().length );
        this.week_num.html( this.collection.getWeeks().length );
        this.all_time_num.html( this.collection.getAllTimes().length );
    },

    editNote : function(ev) {
        this.goTo("notes/"+ev.currentTarget.id);
    },

    newNote : function(){
        this.goTo("new");
    },

});