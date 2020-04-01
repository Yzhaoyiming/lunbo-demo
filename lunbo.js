$(function(){
    var $box=$('#box');
    var tiemr;
    //生成页面元素
    var html=''
        +'<div class="slider" id="slider">'
            +'<div class="slide">'+'<img src="img/b5.png" alt="">'+'</div>'
            +'<div class="slide">'+'<img src="img/b1.png" alt="">'+'</div>'
            +'<div class="slide">'+'<img src="img/b2.png" alt="">'+'</div>'
            +'<div class="slide">'+'<img src="img/b3.png" alt="">'+'</div>'
            +'<div class="slide">'+'<img src="img/b4.png" alt="">'+'</div>'
            +'<div class="slide">'+'<img src="img/b5.png" alt="">'+'</div>'
            +'<div class="slide">'+'<img src="img/b1.png" alt="">'+'</div>'
        +'</div>'
        +'<span id="left"><</span>'
        +'<span id="right">></span>'
        +'<ul class="nav" id="navs">'
            +'<li class="active">1</li>'
            +'<li>2</li>'
            +'<li>3</li>'
            +'<li>4</li>'
            +'<li>5</li>'
        +'</ul>',
    $container=$(html);
    $box.append($container);   

    var box=document.getElementById('box');
    var navarr = document.getElementById('navs').children;
    var slider = document.getElementById('slider');
    var left = document.getElementById('left');
    var right = document.getElementById('right')
    var index=1;
    var timer;
    var isMoving=false;
    //轮播图
    function getStyle(obj, brr){
        if(obj.currentStyle){
            return obj.currentStyle[brr];
        } else {
            return getComputedStyle(obj, null)[brr];
        }
    }
    function trans(obj,json,callback){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var isStop = true;
            for(var brr in json){
                var now = 0;
                if(brr == 'opacity'){
                    now = parseInt(getStyle(obj,brr)*100);
                }else{
                    now = parseInt(getStyle(obj,brr));
                }
                var speed = (json[brr] - now) / 7;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                var cur = now + speed;
                if(brr == 'opacity'){
                    obj.style[brr] = cur / 100;
                }else{
                    obj.style[brr] = cur + 'px';
                }
                if(json[brr] !== cur){
                    isStop = false;
                }
            }
            if(isStop){
                clearInterval(obj.timer);
                callback&&callback();
            }
        }, 25)
    }   
    box.onmouseover=function(){
        trans(left,{opacity:50})
        trans(right,{opacity:50})
        clearInterval(timer)
    }
    box.onmouseout = function(){
        trans(left,{opacity:0})
        trans(right,{opacity:0})
        timer = setInterval(down, 2000);
    }
    //绑定事件
    right.onclick = down;
    left.onclick = up;
    //下标
    for( var i=0; i<navarr.length; i++ ){
        navarr[i].index = i;
        navarr[i].onclick = function(){
            index = this.index+1;
            navmove();
            trans(slider,{left:-1200*index});
        }
    }
    //下一页
    function down(){
        if(isMoving){
            return;
        }
        isMoving=true;
        index++;
        navmove();
        trans(slider,{left:-1200*index},function(){
            if(index==6){
                slider.style.left='-1200px';
                index=1;
            }
            isMoving=false;
        });
    }
    //上一页
    function up(){
        if(isMoving){
            return;
        }
        isMoving=true;
        index--;
        navmove();
        trans(slider,{left:-1200*index},function(){
            if(index==0){
                slider.style.left='-6000px';
                index=5;
            }
            isMoving=false;
        });
    }
    function navmove(){
        for(var i=0;i<navarr.length;i++){
            navarr[i].className = "";
        }
        if(index<=0){
            navarr[4].className="active";
        }
        else if(index>5){
            navarr[0].className="active";
        }
        else{
            navarr[index-1].className="active";
        }
    }
    timer=setInterval(down,2000);
})