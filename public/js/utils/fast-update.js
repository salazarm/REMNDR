App.Utils.Optimize = {
  refreshCollection: function( collection, collectionJSON ){
    // update/add
    _( collectionJSON ).each( function( modelJSON ) {
      modelJSON._touched = true; // MARK THE ONES TO KEEP
      var model = collection.get( modelJSON.id );
      if( model ) {
        model.set( modelJSON );
      } else {
        collection.add( modelJSON );
      }
    });
    // REMOVE THE UNMARKED
    collection.remove(collection.filter(function(m) { return !m.get('_touched'); }));
    // CLEAN UP
    collection.each(function(m) { m.unset('_touched', {silent: true}); });
  },
}