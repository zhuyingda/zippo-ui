define(function(require,exports,module){
function initSlider(option){
        var conf = {},that = this,maxLength=0,wraplength=0,direction='',btnHandle='',boxsize='',maxcnt=0,slideLength=0,restore=[];
        function slider(option){
            this.conf = $.extend({
                Wrap:$('.div1'), //最外层div
                Handle:$('.scrollArea'),//滚动ul
                selector:'li',
                btnHandle:$('.btnscroll'),//控制滚动第几个按钮
                btnselector:'a',
                dir:1,//1为左右 0 为上下
                autoPlay:false,
                timer:5000,
                timeItd:'',
                btnLeft:'.left',
                btnRight:'.right',
                shape:'slide',
                canClick:true,
                btnshow:true,
                btnhover:false,
                current:0,
                index:0,
                show:1,
                cnt:1     //一次滑动多少个
            },option);
            if(this.conf) this.start();
        }
        slider.prototype.start= function() {
            this.calculate();
            this.dircontrol();
            if(wraplength<maxLength || conf.shape!='slide'){
                this.bindEvent();
                if(this.conf.autoPlay){
                    this.conf.shape==='slide' ?this.copyDom() :'';
                    this.loop();
                }else{
                    conf.Wrap.find(conf.btnLeft).hide();
                    conf.Wrap.find(conf.btnRight).show();
                }
            }
        };
        slider.prototype.dircontrol = function(){
            var $button = $('<span class="button" style="z-index:999"></span>');
            $button.append(conf.Wrap.find('.left'));
            $button.append(conf.Wrap.find('.right'));
            conf.Wrap.prepend($button);
            if(!conf.btnshow){
                conf.Wrap.find('.button').hide();
            }
        };
        slider.prototype.loop = function(){
            if(this.conf.autoPlay){
                conf.timeItd = setTimeout(function(){
                    that.control(true);
                    that.loop();
                },conf.timer);
            }
        };
        slider.prototype.stop = function(){
            if(this.conf.timeItd){
                clearTimeout(this.conf.timeItd);
                this.conf.timeItd = null;
            }
        };

        slider.prototype.control= function(flag){
            if(!conf.canClick) return;
            conf.canClick = false;
            flag ?  this.conf.current++ : this.conf.current --;
            var tmax = maxcnt;
            if(conf.shape==='slide'){
                this.scroll(conf.current);
               // tmax = tmax-1;
            }else if(conf.shape === 'fade'){
                this.fade(conf.current)
            }else if(conf.shape === 'explode'){
                var rand  = Math.ceil(Math.random()*2);
                if(rand==1) this.fade(conf.current);
                if(rand==2) this.explode(conf.current);
            }
            var cur = conf.current > tmax-1 ? conf.current-(tmax) : conf.current;
            btnHandle.find(conf.btnselector).eq(cur).addClass('cur').siblings().removeClass('cur');
        };
        slider.prototype.scroll = function(current){
            //如果是顺序轮播，就是当前margin + 需要轮播值
            var zslide = current>conf.index ? -slideLength*conf.cnt : slideLength*conf.cnt;
            var slide  = parseInt(conf.Handle.css(direction))+zslide;
            if(conf.autoPlay){
                this.autoPlay(slide);
                slide  = parseInt(conf.Handle.css(direction))+zslide;
            }else{
                slide = this.noAuto(slide);
            }
            conf.Handle.animate(this.animateObj(direction,slide),400,'swing',function(){conf.canClick=true;});
            conf.index = conf.current;
        };
        slider.prototype.jumpscroll = function(current){
            current ++;
            var slide = -current*slideLength*conf.cnt;
            conf.Handle.animate(this.animateObj(direction,slide),400,'swing',function(){conf.canClick=true;});
            conf.index = conf.current;
        };
        slider.prototype.fade =function(current){
            conf.current = current > maxcnt-1 ? 0 : (current < 0 ? maxcnt-1 :current);
            var domselector = conf.Handle.find(conf.selector);
            domselector.eq(conf.index).find('img').show();
            domselector.eq(conf.current).find('img').show();
            domselector.eq(conf.index).css('z-index',-1).fadeOut('normal',function(){conf.canClick =true;});
            domselector.eq(conf.current).css('z-index',1).fadeIn('normal',function(){conf.canClick =true;});
            conf.index = conf.current;
        };
        slider.prototype.explode= function(current){
            conf.current = current = current > maxcnt-1 ? 0 : (current < 0 ? maxcnt-1 :current);
            var handle = conf.Handle.find(conf.selector);
            var iDom = handle.eq(conf.index);
            var oDom = iDom.find('img');
            var nDom = handle.eq(conf.current);
            iDom.show();
            nDom.show().css('z-index',-1);
            nDom.find('img').show();
            oDom.hide();
            restore[conf.index] = [];
            //oDom.parent().css('position','relative');
            var W = nDom.width(),H = nDom.height(),C = 6,R = 3,aData=[],rnd =this.rnd,that=this,total=C*R;
            for(var i =0;i<R;i++){
                for(var j=0;j<C;j++){
                    aData[i]={left: W*j/C, top: H*i/R};
                    (function(){
                        if(restore[conf.index] && restore[conf.index][i+''+j]){
                           var newDiv  =  restore[conf.index][i+''+j];
                        }else{
                        var newDiv = $('<div></div>');
                        newDiv.css({'position':'absolute',
                            'background':'url('+oDom.attr('src')+')'+-aData[i].left+'px '+-aData[i].top+'px no-repeat',
                            'width':Math.ceil(W/6)+'px','height':Math.ceil(H/3)+'px','left':aData[i].left,'top':aData[i].top,
                            'transition':'0.5s all ease-out'
                        });
                        }
                        restore[conf.index][i+''+j] = newDiv;
                        oDom.parent().append(newDiv);
                        var l=((aData[i].left+W/12)-W/2)*rnd(1,2)+W/2-W/(2*C);
                        var t=((aData[i].top+H/6)-H/2)*rnd(1,2)+H/2;
                        setTimeout((function(newDiv){
                            return function(){
                                newDiv.css({left: l+'px', top: t+'px', opacity: 0});
                                newDiv.css('transform', 'perspective(300px) rotateX('+rnd(-180, 180)+'deg) rotateY('+rnd(-180, 180)+'deg) rotateZ('+rnd(-180, 180)+'deg) scale('+rnd(1.5, 2)+')');
                                setTimeout(function(){
                                    if(total <=1){
                                        iDom.hide();
                                        nDom.css('z-index',1);
                                        conf.index  = conf.current;
                                        conf.canClick =true;
                                    }
                                    newDiv.remove();
                                    total--;
                                },700);
                            };

                        })(newDiv),rnd(0,200));
                    })();
                }
            }
        };
        slider.prototype.rnd = function(min,max){
            return Math.random()*(max-min)+min;
        };
        slider.prototype.animateObj = function(animatedirection,slide){
            var aobj = {};
            aobj[animatedirection] = slide+'px';
            return aobj;
        };

        slider.prototype.autoPlay = function(slide){
            var limit = Math.floor(maxcnt/conf.cnt);
            var oplace = parseInt(conf.Handle.css(direction));
            if(conf.current>limit || (conf.current == limit && oplace<-maxcnt*slideLength)){
                var backlength = oplace+limit*conf.cnt*slideLength+slideLength*(maxcnt%conf.cnt);
                var mfloat = maxcnt%conf.cnt >=conf.show-1 ? 0 : (conf.cnt - maxcnt%conf.cnt);
                conf.Handle.css(direction,backlength+'px');
                if(backlength <= -(conf.cnt-mfloat)*slideLength){
                conf.current = 1;
                }else{
                conf.current = 0;
            }
            }else if(conf.current<-1 || (conf.current == -1 && oplace >-(conf.cnt)*slideLength)){
                var backlength = oplace-limit*conf.cnt*slideLength-slideLength*(maxcnt%conf.cnt);
                conf.Handle.css(direction,backlength+'px');
                var mfloat = maxcnt%conf.cnt >=conf.show-1 ? 0 : maxcnt%conf.cnt;
                if(backlength >= (-maxcnt-mfloat)*slideLength){
                 conf.current = limit-2;
                }else{
                conf.current = limit-1;    
              }
            }
           // console.log(conf.current);
        };
        slider.prototype.noAuto= function(slide){
            var btnLeft = conf.Wrap.find(conf.btnLeft);
            var btnRight = conf.Wrap.find(conf.btnRight);
                //不需要自动轮播
                if(Math.abs(slide)+wraplength>=maxLength){
                    btnRight.hide();    
                    btnLeft.show(); 
                }
                else if(Math.abs(slide) ===0){
                    btnLeft.hide();
                    btnRight.show();    
                }else{
                    btnRight.show();
                    btnLeft.show();
                }
                return slide;
            };
        slider.prototype.copyDom = function(){
            var list =conf.Handle.find(conf.selector);
            for(var i = 0;i<conf.show;i++){
                conf.Handle.append(list.eq(i).clone());
                conf.Handle.prepend(list.eq(maxcnt-1-i).clone());
            }   
            conf.Handle.css(direction,-conf.show*slideLength+'px');
            conf.Handle.css(boxsize,((conf.show*2+maxcnt)*slideLength)+'px');
        };

        slider.prototype.calculate = function(){
            conf = this.conf;that = this;  
            slideLength = conf.dir ? conf.Handle.find(conf.selector).outerWidth(true) : conf.Handle.find(conf.selector).outerHeight(true);
            maxcnt = Math.ceil(conf.Handle.find(conf.selector).length);
            wraplength = conf.dir ? conf.Wrap.width() : conf.Wrap.height();
            direction = conf.dir ? 'marginLeft' :'marginTop';
            boxsize = conf.dir ? 'width' :'height';
            conf.shape == 'slide' ? conf.Handle.css(boxsize,maxcnt*slideLength+'px') :'';
            conf.show = Math.floor(wraplength/slideLength);
            maxLength = conf.dir ? conf.Handle.outerWidth(true):conf.Handle.outerHeight(true);
            if(conf.shape !='slide'){
                $('html').css('overflow-x','hidden');
                conf.Handle.find(conf.selector).css('position','absolute');
                conf.Wrap.css('z-index',2);
            }
        };

        slider.prototype.bindEvent= function(){
            btnHandle = conf.Wrap.find(conf.btnHandle);
            conf.Wrap.on('click',conf.btnLeft,function(){
                if($(this).find(conf.btnRight).css('display')!='none')
                    that.control(false);
            });
            conf.Wrap.on('click',conf.btnRight,function(){
                if($(this).find(conf.btnRight).css('display')!='none')
                    that.control(true);
            });
            if(conf.btnhover){
                btnHandle.find(conf.btnselector).hover(function(){
                    var cur =  $(this).index();
                    btnmove(cur);
                });
            }else{
                btnHandle.find(conf.btnselector).click(function(){
                    var cur =  $(this).index();
                    btnmove(cur);
                });
            }
            function btnmove(cur){
                if(!conf.canClick) return;
                if(cur!=conf.current){
                    conf.canClick = false;
                    conf.current = cur;
                    btnHandle.find(conf.btnselector).eq(cur).addClass('cur').siblings().removeClass('cur');
                    conf.shape ==='slide' ?  that.jumpscroll(conf.current) :(conf.shape ==='fade' ? that.fade(conf.current) :that.explode(conf.current));
                }
            }
            conf.Wrap.hover(function(){
                that.stop();
                conf.btnshow ? '' : conf.Wrap.find('.button').show();
            },function(){
                conf.btnshow ? '' : conf.Wrap.find('.button').hide();
                that.loop();
            });
        };
        return new slider(option);
    }
    module.exports = initSlider;
}); 
