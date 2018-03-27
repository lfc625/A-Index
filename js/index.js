var switchAttention = function () {
    var prev = $('#slider').find('.prev');
    var next = $('#slider').find('.next');
    var img = $('#slider').find('ul');
    var $indicator = $("#slider .slider-indicator");
    var w = img.find('li').outerWidth(true);
    var index = 0;
    var len = img.find('li').length;
    next.click(function () {
        img.animate({'margin-left': -w}, function () {
            img.find('li').eq(0).appendTo(img);
            img.css({'margin-left': 0});
            index++;
            (index > len - 1) && (index -= 4);
            $indicator.find(".indicator").removeClass('active');
            $indicator.find('.indicator').eq(index).addClass('active');
        });
    });
    prev.click(function () {
        img.find('li:last').prependTo(img);
        img.css({'margin-left': -w});
        img.stop().animate({'margin-left': 0});
        index--;
        (index < 0) && (index += 4);
        $indicator.find(".indicator").removeClass('active');
        $indicator.find('.indicator').eq(index).addClass('active');
    });
    var sl = setInterval(function () {
        next.click();
    }, 4000);
    $("#slider").hover(function () {
        clearInterval(sl);
    }, function () {
        sl = setInterval(function () {
            next.click();
        }, 4000);
    });
}
var switchMemory = function () {
    var img = $('#memory-content').find('ul');
    var $indicator = $("#memory-rank .slider-indicator .indicator");
    var w = img.find('li').outerWidth(true);
    var index = 0;
    $indicator.click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var myindex = $(this).index();
        var offset = -w * (myindex - index);//算出每次点击小圆点的偏移量，（目标值-原始值）*-600
        img.animate({'margin-left': offset});

    });
}
var memoryAnimate = function () {
    var $memoryBar = $("#memory-content").find('.memory_chart_con');
    $memoryBar.each(function () {
        var h = $(this).css('top');
        $(this).css('top', '100%');
        $(this).animate({'top': h}, 1500, 'linear')
    })
}
var cicleProgress = function () {
    $('.circle').each(function (index, el) {
        var num = $(this).find('.percent').text().replace("%", "") * 3.6;
        if (num <= 180) {
            $(this).find('.left').rotate({
                animateTo: -num
            })
        } else {
            var $this = $(this)
            $(this).find('.left').rotate({
                animateTo: -180,
                duration: 1000,
                easing: function (x, t, b, c, d) {
                    return c * (t / d) + b;
                }
            });
            setTimeout(function () {
                $this.find('.right').rotate({
                    animateTo: 180 - num
                })
            }, 1000)
        }
        ;
    });
}
var yundong = function () {
    var colorAry = ['severity-ball', 'major-ball', 'minor-ball', 'warn-ball', 'hint-ball', 'normal-ball', 'unknow-ball'];

    function randomColor() {
        var randomIndex = Math.floor(Math.random() * 7);
        return colorAry[randomIndex];
    }

    $(function () {
        var count = 0;
        var finish = true;
        $('.evtGraph').click(function () {
            if (finish) {
                finish = false;
                var $ball0 = $('.ball0');
                var $ball123 = $('.ball1,.ball2,.ball3');
                var $ball4 = $('.ball4');
                var $ball567 = $('.ball5,.ball6,.ball7')
                var $ball8 = $('.ball8');
                var curClass = randomColor()
                $ball0.addClass(curClass).removeClass('nodata-ball')
                $ball0.find('dt').addClass(curClass.split('-')[0]);
                $ball0.find('dl').css('display', 'block')
                $ball0.velocity({top: '+=144px'}, 550, "swing").velocity({left: '+=14%'}, 450, "swing", function () {
                    callback();
                });
                $ball123.velocity({left: '+=20%'}, 1000, "swing", function () {
                    callback();
                });
                $ball4.velocity({left: '+=15%'}, 250, "swing").velocity({top: '+=112px'}, 500, "swing").velocity({left: '-=15%'}, 250, "swing", function () {
                    callback();
                });
                $ball567.velocity({left: '-=20%'}, 1000, "swing", function () {
                    callback();
                });
                $ball8.velocity({left: '-=20%', opacity: 0}, 1000, "swing", function () {
                    callback();
                });
            }
        });

        function callback() {
            var htmlstr = '<div class="ball nodata-ball ball0">' +
                '<dl style="display: none;">' +
                '<dt>12/9 11:11:11</dt>' +
                '<dd class="name">asd-PC</dd>' +
                '<dd>IP:11.168.12.211</dd>' +
                '<dd>监控项:cad</dd>' +
                '</dl>' +
                '</div>';
            count++;
            if (count == 5) {
                $('.ball').each(function () {
                    var $this = $(this);
                    if ($this.hasClass('ball0')) {
                        $this.removeClass('ball0').addClass('ball1');
                        $('.evtGraph').append(htmlstr);
                    } else if ($this.hasClass('ball1')) {
                        $(this).removeClass('ball1').addClass('ball2');
                    } else if ($this.hasClass('ball2')) {
                        $(this).removeClass('ball2').addClass('ball3');
                    } else if ($this.hasClass('ball3')) {
                        $(this).removeClass('ball3').addClass('ball4');
                    } else if ($this.hasClass('ball4')) {
                        $(this).removeClass('ball4').addClass('ball5');
                    } else if ($this.hasClass('ball5')) {
                        $this.removeClass('ball5').addClass('ball6');
                    } else if ($this.hasClass('ball6')) {
                        $this.removeClass('ball6').addClass('ball7');
                    } else if ($this.hasClass('ball7')) {
                        $this.removeClass('ball7').addClass('ball8');
                    } else if ($this.hasClass('ball8')) {
                        $(this).remove();
                    }
                });
                finish = true;
                count = 0;
            } else {
                return;
            }
        }
    });
}
var onmouseover = function () {
    $(".ball").click(function () {
        var $this = $(this);
        $("#current-info").stop(true).slideUp().slideDown(function () {
            var time = $this.find('dt').text();
            var ip = $this.find('dd:first').text();
            var monitor = $this.find('dd').eq(1).text();
            var duration = $this.find('dd:last').text();
            $("#current-name").empty().text(monitor)
            $("#current-time").empty().text(time)
            $("#current-ip").empty().text(ip)
            $("#current-duration").empty().text(duration)
        })

    })
}
var score = function () {
    $("#score").countUp({to: 85});
}
var battary = function () {
    $('.battery-item').each(function () {
        var title = $(this).find('.battery-title').text()
        var oLi = $(this).find('li');
        var oLiWidth = oLi.width()
        oLi.removeClass('yes');
        var percent = 3;
        var int = parseInt(percent / 10);
        var res = percent % 10;
        switch (title) {
            case '宕机':
                for (var i = 0; i < int; i++) {
                    oLi.eq(i).addClass("down");
                }
                break;
            case '告警':
                for (var i = 0; i < int; i++) {
                    oLi.eq(i).addClass("warn");
                }
                break;
            case '正常':
                for (var i = 0; i < int; i++) {
                    oLi.eq(i).addClass("normal");
                }
                if (res > 0) {
                    oLi.eq(int).addClass('normal');
                }
                break;
        }
        if (res > 0) {
            var _width = (res * 0.1 * oLiWidth) + 'px';
            oLi.eq(int).find("span").width(_width);
        }
    })
}
var rotation = function () {
    /*优雅降级解决IE9不支持CSS3动画问题*/
    var browser = navigator.appName
    var b_version = navigator.appVersion
    var version = b_version.split(";");
    if (version[1] != null) {
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
            var angle = 0;
            setInterval(function () {
                angle += 3;
                $("#score-mod .scan_browse").rotate(angle);
            }, 80);
            setInterval(function () {
                angle += 3;
                $("#score-mod .scan_load").rotate(angle);
            }, 30);
        }
    }
    /*传递系统健康度*/
    $("#score-mod .scan_arrows").rotate({
        animateTo: 300,
        duration: 1500,
        easing: function (x, t, b, c, d) {
            return c * (t / d) + b;
        }
    });
};
var cpumouserover = function () {
    $("#cpu-use dd").mouseover(function () {
        $(this).find('.cpu-li-num').css({
            'background': '-webkit-gradient(linear,100% 0%, 0% 0%, from(#42a1ff), to(#2CC4F3))',
            'color': '#ffffff'
        })
    })
    $("#cpu-use dd").mouseout(function () {
        $(this).find('.cpu-li-num').css({
            'background': '-webkit-gradient(linear,100% 0%, 0% 0%, from(#e0e9ef), to(#cee0ea))',
            'color': '#9eadb7'
        })
    })
}
var addEvt = function () {
    $('#evtTotal-icon').click(function () {
        var str = '<li>' +
            '<div class="evt-common evt-serious"></div>' +
            '<div class="stream-left-div">' +
            '<span class="evt-name evt-bolder">WIN-ID3H [172.172.28.176]</span>' +
            '<span class="break-word"><a title="aa">admin-ls-PC192.168.212.105的memory(Physical Memory)异常，{规则：物理内存使用率>=75}.</a></span>' +
            '</div>' +
            '<div class="stream-right-div">' +
            '<span class="evt-time evt-bolder">12/9 13:13:23</span>' +
            '<span class="break-word">持续时长：1天21时20分10秒</span>' +
            '</div>' +
            '</li>';
        $('#evt-stream').find('li:first').replaceWith(str);
        var li = $('#evt-stream').find('li');
        li.velocity({top: '0'}, 1000, "swing", function () {
            $('#evt-stream').find('li:last').remove();
            $('#evt-stream').prepend('<li></li>');
            li.css('top', '-67px')
        });
    })

}
$(function () {
    switchAttention();
    switchMemory();
    memoryAnimate();
    cicleProgress();
    yundong();
    onmouseover();
    score();
    battary();
    rotation();
    cpumouserover();
    addEvt()
    /* $(window).resize(function () {
     switchMemory();
     })*/
});

