
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
    sunriseTime.setHours(19,17,30);
    dayTime.setHours(19,18,00);
    sunsetTime.setHours(19,18,30);
    nightTime.setHours(00,00,00);

    if(betweenTime(cuTime,sunriseTime,dayTime)) switchAnimation('sunRise');

    if(betweenTime(cuTime,dayTime,sunsetTime)) switchAnimation('dayTime');

    if(betweenTime(cuTime,sunsetTime,nightTime)) switchAnimation('sunSet');

    if(betweenTime(cuTime,nightTime,sunriseTime)) switchAnimation('nightTime');


}

function betweenTime(curDate,befTime,aftTime){

    if(befTime <= curDate && curDate <= aftTime){
        return true;
    }
   return false; 
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


