/**
 * Created by zx on 2016/12/26.
 */
(function($) {
    $.fn.countUp = function(config) {
        var _default = {
            from: 0,
            to: 100,
            time: 2000,
            step: 50
        };
        var $elem = $(this);
        var options = $.extend(options, _default, config);
        var increment = Math.ceil((options.to - options.from) / Math.ceil(options.time / options.step));
        var value = options.from;
        var e = null;
        if (!!e) {
            clearInterval(e);
        }
        e = setInterval(update, options.step);

        function update() {
            value += increment;
            if (value <= options.to) {
                $elem.html(htmlStr(value));
            } else {
                $elem.html(htmlStr(options.to));
                clearInterval(e);
                e = null;
            }
        }
        function htmlStr(num) {
            if (num == 100) {
                return '<span>1</span><span>0</span><span>0</span>';
            } else {
                return '<span class="nohundred">0</span><span>'+ parseInt(num / 10) +'</span><span>'+ (num % 10) +'</span>';
            }
        }
    }
})(jQuery);