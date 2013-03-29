var Note = Backbone.Model.extend({

    defaults: function() {
      return {
        created_at: new Date(),
      };
    },

    initialize: function() {
      this.set({"created_at": this.defaults().created_at});
    },

    // TODO
    url : function() {
      var base = 'notes';
      if (this.isNew()){
        return base;
      } else {
        return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
      }
    },

    parse: function(response){
      return response;
    }

  });
