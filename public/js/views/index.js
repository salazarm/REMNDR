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

        this.listenTo(App.Notes, 'change', this.render);

        $("textarea").hide();
        $(".bttn").hide();
        $(".calendar").hide();
        this.days = [this.today, this.tomorrow, this.week, this.alls];
        this.switchToday();
        setInterval(this.fetch_models(), 1000);
    },

    fetch_models: function(){
        if (App.User.get("loggedIn")){
            App.Notes.fetch({
                error: function(model, response, options){
                    new App.Views.Notice({ message: response.msg? response.msg : "Failed to load reminders" , type: "error"})
                }
            });
        }
    },

    
    clean : function(){
        _.each(this.days, function(d){ d.removeClass("active");});
    },

    render : function() {
        if (App.Editing == null){
            $("#new-post-it-wrapper").show();
        }
        $(".reminders").empty();
        noteTemplate = this.noteTemplate;
        this.displays();

        /* 
            NOTE ON CODE DESIGN: 
        
            I am not creating a view for each note because I was having difficulty
            coming up for a way for notes to sort themselves when a new
            note is added or when a note's due date is changed. 
            (It would be a bit complicated ). I might clean this part of the
            code up if time permits in the next submission. I'd have to write a
            function that checks all of the children nodes of $(".reminders")
            and parses their due dates and then repositions their nodes. The
            currently used solution is much slower and creates a lot of unneeded
            re-rendering. 
        */
        _.each(
            this.displayCollection.collection.sort(
                // sorting function
                function(a,b){
                    order = (new Date(a.attributes.due)).getTime()-(new Date(b.attributes.due)).getTime();
                    return order;
                }), 

            // function run by the .each
            function(note){
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