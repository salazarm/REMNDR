/* 
	Author: Marco Salazar <salazarm@mit.edu>
	Included are useful methods for searching through text in javascript
	Distributed under MIT License
*/

var _search = (function(){
	var combos = (function(){
		/*
			Todo: Special algorithms for searching. 
			Need to find good heuristics.
		*/
		algorithms = {

		};
		return algorithms
	})();

	var pattern_build = function(query){ 
		/* 
			Todo: Basic search algorithm implementation 
			Need to generate more possible patterns the user may want.
			The score goes down as the pattern deviates from the original.
		*/
		var patterns = [];
		patterns.push({ pattern: query, score: query.length });
		var temp = query.split(" ");
		var toks = [];
		_.each(temp, function(token){
			var t = token.split(",");
			tokens = toks;
			_.each(t, function(tok){
				if (tok.length > 0){
					tokens.push(tok);
				}
			});
		});
		_.each(tokens, function(token){
			patterns.push({ pattern: token, score: token.length })
		});
		return patterns // for now just returning exact matches
	};

	var search =  function(text, query) {
		var score = false;
		_.each(pattern_build(query), function(search) {
			var queryPat = new RegExp(search.pattern, "i" /* Ignore Case */);
			if (queryPat.exec(text)) {
				score += search.score;
			}
		});
		return score;
	};

	return search;
})();


