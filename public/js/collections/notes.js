App.Collections.Notes = Backbone.Collection.extend({

    url: '/notes',

    delta: 1000*5, /* 5 second lineincy */
    tomorrow: ViewHelper.days.tomorrow.ms,
    today: ViewHelper.days.today.ms,
    week: ViewHelper.days.week.ms,

    currentNotes: {}, 

    showing: "todays",

    turn_model_on: function(model) {
      console.log(model);
      model.turn_on();
    },

    hideAll: function() {
      _.each(this.collection, function(model){
        model.turn_off();
      });
    },

    getTodays: function() {
      return this.getNotes(0, this.today);
    },

    getTomorrows: function() {
      return this.getNotes(this.today, this.tomorrow);
    },

    getWeeks: function() {
      return this.getNotes(this.tomorrow, this.week);
    },

    getAllTimes: function(){
      return this.getNotes(-MAX_INT,MAX_INT);
    },

    showTodays: function() {
      this.hideAll();
      _.each(this.getTodays(), this.turn_model_on);
    },

    showTomorrows: function(){
      this.hideAll();
      _.each(this.getTomorrows(), this.turn_model_on);
    },

    showWeeks: function() {
      this.hideAll();
      _.each(this.getWeeks(), this.turn_model_on);
    },

    showAllTimes: function(){
      _.each(this.collection, this.turn_model_on);
    },

    /* Retrieves notes due between t1 and t2. */
    getNotes: function(t1, t2) {
      var that = this;
      return this.filter(function(note){ 
        return that.withinTimeFrame(note.get('due'),t1,t2);
      });
    },

    get_day: function(note) {
      var due = note.get('due');
      if (withinTimeFrame(due, 0, today))
          return "today";
      else if (withinTimeFrame(due, today, tomorrow))
          return "tomorrow";
      else if (withinTimeFrame(due, tomorrow, week))
          return "week";
      else
          return "none";
    },

    /* Check if a date is between two dates with leniency delta */
    withinTimeFrame: function(testDate, milli1, milli2) {
      var now = new Date();
      var due = new Date(testDate);
      var lapsed = due.getTime()-now.getTime();
      if (lapsed-this.delta <= milli2 && lapsed+this.delta >= milli1) {
        return true;
      } else {
        return false;
      }
    },

    comparator : function(){

    },

    initialize: function() {
      var collection = this;

      /* Collection updates itself every 50ms */
      setInterval(function(){
          if (App.User.get("loggedIn")){
              collection.fetch({
                  success: function(model, response, options){
                    
                  },

                  error: function(model, response, options){
                      new App.Views.Notice({ message: response.msg? response.msg : "Failed to load reminders" , type: "error"})
                  }
              });
          }
      }, 50);
   }

  });