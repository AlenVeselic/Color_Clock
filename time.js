
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
    sunriseTime.setHours(21,13,0);
    dayTime.setHours(21,13,30);
    sunsetTime.setHours(21,14,30);
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

function spawnStar(){

    star=document.createElement("div");

    star.classList.add("star");

    star.style.position="absolute";
    star.style.zIndex=-1;

    star.style.animationDuration=Math.floor((Math.random()*30)+1)+"s";

    getSize=Math.floor((Math.random() * 50) + 1);
    star.style.width=getSize+"px";
    star.style.height=getSize+"px";

    xCoor=Math.floor((Math.random() * screen.availWidth) + 1);
    yCoor=Math.floor((Math.random() * screen.availHeight) + 1);

    star.style.left=xCoor+"px";
    star.style.top=yCoor+"px";

    document.body.appendChild(star);

}

function displayDebug(){
    debugEl=document.getElementById("debug");
    debugState=window.getComputedStyle(debugEl).getPropertyValue('display');
    if(debugState=="none"){
        debugEl.style.display="block";
        document.getElementById("dState").innerHTML="enabled";
    }else{
        debugEl.style.display="none";
        document.getElementById("dState").innerHTML="disabled";
    } 
}

