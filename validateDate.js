/**
 * validate Date
 *
 * @description Multi format date validator
 * @author Samitha Fernando
 * Licensed under the MIT (MIT-LICENSE.txt)
 *
 */
;(function ($,window) {
    "use strict";
    $.fn.validateDate = function (method) {
        var helpers = {
                init: function () {
                    var $element = $(this),
                        plugin = this.validateDate,
                        settings = plugin.settings;
                    //store settings 
                    $element.data('validateDate', settings);
                },
                isValidDate: function(string){
                    //Thanks to http://stackoverflow.com/questions/5812220/test-if-date-is-valid
                    var bits = string.split('/');
                    var y = bits[2], m  = bits[1], d = bits[0];
                    // Assume not leap year by default (note zero index for Jan)
                    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

                    // If evenly divisible by 4 and not evenly divisible by 100,
                    // or is evenly divisible by 400, then a leap year
                    if ( (!(y % 4) && y % 100) || !(y % 400)) {
                        daysInMonth[1] = 29;
                    }
                    return d <= daysInMonth[--m];
                },
                validate: function (value,settings){
                    var matched 		= null,
                        value			= value.replace(/ /g,"/"),
                        format			= null,
                        matchedformat	= null,
                        monthIndex      = null,
                        dateConfig		= {},
                        date			= null,
                        today           = new Date(),
                        shortMonthNames = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],
                        longMonthNames  = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
                        formats = [
                            {'regex':/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/,'format':['day','month','year']},
                            {'regex':/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,'format':['day','month','year']},
                            {'regex':/^(\w{3})\/(\d{1,2})\/(\d{2})$/,'format':['month','day','year'],'month':shortMonthNames},
                            {'regex':/^(\w{3})\/(\d{1,2})\/(\d{4})$/,'format':['month','day','year'],'month':shortMonthNames},
                            {'regex':/^(\d{1,2})\.(\d{1,2})\.(\d{2})$/,'format':['day','month','year']},
                            {'regex':/^(\d{1,2})\-(\d{1,2})\-(\d{2})$/,'format':['day','month','year']},
                            {'regex':/^(\d{1,2})\/(\w{3})\/(\d{2})$/,'format':['day','month','year'],'month':shortMonthNames},
                            {'regex':/^(\w{3,9})\/(\d{1,2})\/(\d{4})$/,'format':['month','day','year'],'month':longMonthNames},
                            {'regex':/^(\w{3})\/(\d{1,2})$/,'format':['month','day','year'],'month':shortMonthNames},
                            {'regex':/^(\d{1,2})\/(\w{3})$/,'format':['day','month','year'],'month':shortMonthNames},
                            {'regex':/^(\w{3})\/(\w{3})$/,'format':['day','month','year'],'month':shortMonthNames},

                            {'regex':/^(\d{1,2})\/(\w{3})\/(\d{4})$/,'format':['day','month','year'],'month':shortMonthNames}
                        ];

                    /*
                     1/1/12 - valid
                     01/01/2012 - valid
                     Jan 1 12 - valid
                     Jan 1 2012 - valid
                     1.1.12 - valid
                     1-1-12 - valid
                     1 Jan 12 - valid
                     January 1 2012 - valid
                     Jan 1 - valid
                     1 Jan - valid
                     1st Jan - valid
                     */
                    $.each(formats,function(k,format){
                        if(matched === null){
                            matched = value.match(format['regex']);
                            if(matched !== null){
                                matchedformat = k;
                            }
                        }
                    });
                    if(matchedformat !== null){
                        matched = value.match(formats[matchedformat]['regex']);
                        format = formats[matchedformat]['format'];
                        dateConfig[format[0]] = matched[1];
                        dateConfig[format[1]] = matched[2];
                        dateConfig[format[2]] = matched[3] || today.getFullYear();

                        if(isNaN(dateConfig.month)){
                            //month is not a number. Therefore lookup from array
                            monthIndex =  formats[matchedformat]['month'].indexOf(dateConfig.month.toLowerCase());
                            if(monthIndex > -1){
                                dateConfig.month = monthIndex + 1;
                            }
                        }
                        if(isNaN(dateConfig.day)){
                            //date is not a number. Must be 1st format
                            dateConfig.day = parseInt(dateConfig.day,10);
                        }

                        //validate month and the date is in the range
                        if(helpers.isValidDate(dateConfig.day+'/'+dateConfig.month+'/'+dateConfig.year)){
                            date = new Date(dateConfig.year, dateConfig.month-1, dateConfig.day);
                            //check have a date before 1970
                            if (date !== null && date.getFullYear() < settings.minYear) {
                                //if user has entered year in two digit add another 100 years
                                if(dateConfig.year.length == 2){
                                    date.setFullYear(date.getFullYear() + 100);
                                }
                            }
                        }
                    }
                    return date;
                }
            },
            methods = {
                init: function (options) {
                    this.validateDate.settings = $.extend({}, this.validateDate.defaults, options);
                    var self = this;
                    return this.each(function () {
                        helpers.init.apply(self);
                    });
                },
                validate: function () {
                    var $element    = $(this),
                        plugin      = this.validateDate,
                        settings    = $element.data('validateDate');

                    return helpers.validate.apply(this,[$element.val(),settings]);
                }
            };
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method "' + method + '" does not exist in validateDate plugin!');
        }
    };
    $.fn.validateDate.defaults = {
        minYear:1970
    };
    $.fn.validateDate.settings = {};
})(jQuery,window);

