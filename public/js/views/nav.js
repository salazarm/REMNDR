// App.Views.Nav = Backbone.View.extend({
	
// 	collection: App.Collections.Notes,

//     events: {
//         "click .tod-wrap"   :  "switchToday",
//         "click .tom-wrap"   :  "switchTomorrow",
//         "click .week-wrap"  :  "switchWeek",
//         "click .all-wrap"   :  "switchAllTime",
//     },

//     clean : function(){
//         _.each(this.days, function(d){ 
//         	d.removeClass("active");
//         });
//     },

//     switchToday : function() {   
//         this.collection.showTodays();
//         this.clean();
//         this.$(".tod-wrap").addClass("active");
//     },

//     switchTomorrow : function() {
//         this.collection.showTomorrows();
//         this.clean();
//         this.$(".tom-wrap").addClass("active");
//     },
    
//     switchWeek : function() {
//         this.collection.showWeeks();
//         this.clean();
//         this.$(".week-wrap").addClass("active");
//     },

//     switchAllTime : function() {
//         this.collection.showAllTimes();
//         this.clean();
//         this.$(".all-wrap").addClass("active");
//     },

//     initialize : function() {
//         this.days = [this.$(".tod-wrap"), this.$(".tom-wrap"), this.$(".week-wrap"), this.$(".all-wrap")];
//         this.collection.bind('change' , this.render, this);
//         this.switchAllTime();
//         this.render();
//     },

//     render : function() {
//     	this.$("span.today").html( this.collection.getTodays().length );
//         this.$("span.tomorrow").html( this.collection.getTomorrows().length );
//         this.$("span.week").html( this.collection.getWeeks().length );
//         this.$("span.all-time").html( this.collection.getAllTimes().length );
//         return this;
//     }

// });