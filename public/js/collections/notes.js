var MAX_INT = 9007199254740992; // max int

App.Collections.Notes = Backbone.Collection.extend({

    model: Note,
    url: '/notes',

    delta: 1000*5, // 5 second lineincy
    tomorrow: ViewHelper.days.tomorrow.ms, // time in milliseconds
    today: ViewHelper.days.today.ms, // time in milliseconds
    week: ViewHelper.days.week.ms, // time in milliseconds

    // Find the notes due within 24 hours
    getTodays: function() {
      return this.getNotes(0, this.today);
    },

    getTomorrows: function(){
      return this.getNotes(this.today, this.tomorrow);
    },

    getWeeks: function() {
      return this.getNotes(this.tomorrow, this.week);
    },

    getAllTimes: function(){
      return this.getNotes(-MAX_INT,MAX_INT);
    },

    // Finds notes due between t1 and t2.
    getNotes: function(t1, t2){
      that = this;
      return this.filter(function(note){ 
        return that.withinTimeFrame(note.get('due'),t1,t2);
      });
    },

    //Check if a date is between two dates with leniency delta
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

     parse: function(response) {
      return response;
   }

  });