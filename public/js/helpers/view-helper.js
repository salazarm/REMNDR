var ViewHelper = {

    pretty_date : function(date_str) {
        var seconds = this.get_seconds(date_str);
        var token = 'ago';
        list_choice = 1;
        if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = 'from now';
            list_choice = 2;
        }
        var i = 0,
            format;
        while (format = this.time_formats[i++]){
            if (seconds < format[0]) {
                if (typeof format[2] == 'string') { 
                    return format[list_choice];
                } else { 
                    if (format[1] == 'just now'){
                        return Math.floor(seconds / format[2]) + ' seconds '+ ' ' + token;
                    }
                    return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
                }
            }
        }
        return time;
    },

    time_formats : [
        [60, 'just now', 1], // 60 
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2 
        [86400, 'hours', 3600], // 60*60*24, 60*60 
        [172800, 'yesterday', 'tomorrow'], // 60*60*24*2 
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24 
        [1209600, 'last week', 'next week'], // 60*60*24*7*4*2 
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7 
        [4838400, 'last month', 'next month'], // 60*60*24*7*4*2 
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4 
        [58060800, 'last year', 'next year'], // 60*60*24*7*4*12*2 
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12 
        [5806080000, 'last century', 'next century'], // 60*60*24*7*4*12*100*2 
        [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ],

    /* closure for days */
    days : (function(){ 

        var day = function(ms){
            return {
                ms: ms,
                to_s: function(){
                    return this.ms/1000();
                }
            };
        };

        // times in milliseconds
        var today_milli = new day( 86400000 ); 
        var tomorrow_milli = new day( 172800000 );
        var week_milli = new day( 604800000 );
        
        return {
            today: function(){
                return today_milli();
            },

            tomorrow: function (){
                return tomorrow_milli();
            },

            week: function(){
                return week_milli();
            }
        }

        })(),


    color : {

            /* Closure for colors */
           colors: (function(){
                    color_red = {    r: 200, g: 83, b: 68    };
                    color_yellow = {    r: 250, g: 213, b: 31    };
                    color_blue = {    r: 19, g:157, b: 197    };
                    color_grey = {    r: 153, g:153, b:153    };

                    return {
                        red: function(){ return color_red; },
                        yellow: function(){ return color_yellow; },
                        blue: function(){ return color_blue; },
                        grey: function(){ return color_grey; }
                    };
                }
            )(),


            colorfy: function(date_str){
                var get_in_between = function( rgb1, rgb2, dec) {
                    r = between_colors(rgb1.r, rgb2.r, dec);
                    g = between_colors(rgb1.g, rgb2.g, dec);
                    b = between_colors(rgb1.b, rgb2.b, dec);
                    return make_rgb(r, g, b);
                };
                var between_colors = function(c1, c2, dec) {
                    return c1+(c2-c1)*dec;
                };
                var make_rgb = function(r,g,b){
                    return "rgb("+Math.floor(r)+","+Math.floor(g)+","+Math.floor(b)+");";
                };
                
                today = ViewHelper.days.today.to_s;
                tomorrow = ViewHelper.days.tomorrow.to_s;
                week = ViewHelper.days.week.to_s;
                var seconds = -ViewHelper.get_seconds(date_str);
                if (seconds < 0){
                    return "rgb(186,141,117);"
                } else if (seconds < today) {
                    dec = seconds/today;
                    return get_in_between(this.colors.red(), this.colors.yellow(), dec);
                } else if (seconds < tomorrow) {
                    dec = (seconds-today)/(tomorrow-today);
                    return get_in_between(this.colors.yellow(), this.colors.blue(), dec);
                } else if (seconds < week) {
                    dec = (seconds-tomorrow)/(week-tomorrow);
                    return get_in_between(this.colors.blue(), this.colors.grey(), dec);
                } else {
                    grey = this.colors.grey();
                    return make_rgb(grey.r, grey.g, grey.b);
                }
            }
        },

    get_seconds : function(date_str){
        var time = ('' + date_str).replace(/-/g, "/").replace(/[TZ]/g, " ");
        var seconds = ((new Date).getTime() - (new Date(time)).getTime()) / 1000;
        // Quick timezone hack for this submission while I figure out how to
        // fix this issue.
        seconds += 60*60*4;
        return seconds;
    }
}


var restoreRailsErrors = function(response){
    r = JSON.parse(response.responseText);
    for (var re in r){
        alert(re+": "+r[re]);
    }
}