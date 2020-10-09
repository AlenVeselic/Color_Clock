
function display_c(){
    var refresh=1000;
    mytime=setTimeout('display_ct()',refresh)
}

function display_ct(){
    var x = new Date();
    //var formatX=x.getHours()+":"+x.getMinutes()+":"+x.getSeconds();

    if(x.getHours()<10)formatX="0"+x.getHours()+":";
    else formatX=x.getHours()+":";

    if(x.getMinutes()<10)formatX+="0"+x.getMinutes()+":";
    else formatX+=x.getMinutes()+":";

    if(x.getSeconds()<10)formatX+="0"+x.getSeconds();
    else formatX+=x.getSeconds();

    document.getElementById('Clock').innerHTML = formatX;
    goAct(x);
    animationSwitcher(x);
    display_c();
}

function getBodyAttr(attr){

    elem=document.getElementsByTagName('body')[0];

    let currentAnimation=window.getComputedStyle(elem).getPropertyValue(attr);

    return currentAnimation;
}

function displayAnimationName(){
    name=getBodyAttr('animation-name');
    alert(name);
}

function displayCurrentBackgroundColor(){
    color=getBodyAttr('background-color');
    alert(color);
}

function switchAnimation(toThis){
    bod=document.getElementsByTagName('body')[0];
    bod.style.animationName=toThis;
}

function animationSwitcher(cuTime){
    sunriseTime=new Date();
    dayTime=new Date();
    sunsetTime=new Date();
    nightTime=new Date();
    sunriseTime.setHours(16,39,0);
    dayTime.setHours(16,40,0);
    sunsetTime.setHours(16,38,0);
    nightTime.setHours(16,39,0);

    if(cuTime>=sunriseTime && cuTime < dayTime) switchAnimation('sunRise');

    if(cuTime==dayTime) switchAnimation('dayTime');

    if(cuTime==sunsetTime) switchAnimation('sunSet');

    if(cuTime==nightTime) switchAnimation('nightTime');


}


function goAct(curTime){
    actTimeStart=new Date();
    actTimeEnd=new Date();
    actTimeStart.setHours(15,15,0);
    actTimeEnd.setHours(15,15,30);
    
    if(curTime>=actTimeStart && curTime < actTimeEnd){
        document.getElementById('act').innerHTML="The time to act is NOW!";
    }else{
        document.getElementById('act').innerHTML="Now is not the time to act...";
    }
}


