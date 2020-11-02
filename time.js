
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
    sunriseTime.setHours(11,57,0);
    dayTime.setHours(11,57,30);
    sunsetTime.setHours(11,58,0);
    nightTime.setHours(11,58,30);

    clockEnd=new Date();
    clockEnd.setHours(24,0,0);

    clockStart=new Date();
    clockStart.setHours(0,0,0);

    if(betweenTime(cuTime,sunriseTime,dayTime)) switchAnimation('sunRise');

    if(betweenTime(cuTime,dayTime,sunsetTime)) switchAnimation('dayTime');

    if(betweenTime(cuTime,sunsetTime,nightTime)) switchAnimation('sunSet');

    if(betweenTime(cuTime,nightTime,clockEnd)||(betweenTime(cuTime,clockStart,sunriseTime))) switchAnimation('nightTime');


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

function givCoor(){
    
    elem=document.getElementById("loc");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(outputInfo);
        navigator.geolocation.getCurrentPosition(sunCalculation);
    }else{
        elem.innerHTML="No coords 4 u";
    }


}

function outputInfo(loc){

    elem=document.getElementById("loc");

    elem.innerHTML+="<br> lat:"+loc.coords.latitude;
    elem.innerHTML+="<br> long:"+loc.coords.longitude;


}

document.getElementById("loc").onload=givCoor();

monthDays=[31 ,29,31,30,31,30,31,31,30,31,30,31];

months = {
    "January": 31,
    "February": 29,
    "March": 31,
    "April":30,
    "May":31,
    "June":30,
    "July":31,
    "August":31,
    "September":30,
    "October":31,
    "November":30,
    "December":31
};

function dayOfYear(){

    dayNum=0;

    today=new Date();
    thisMonth=today.getMonth();
    dayOfMonth=today.getDate();

    for(counter=0;counter<thisMonth;counter++){

        for(dayCounter=0;dayCounter<monthDays[counter];dayCounter++){

            dayNum++;
            
        }

    }

    for(tCounter=0;tCounter<dayOfMonth;tCounter++){
        dayNum++;
    }

    return dayNum;

}

function equationOfTime(fracYear){

    return 229.18*(0.000075 + (0.001868*Math.cos(fracYear))-(0.032077*Math.sin(fracYear))-(0.014615*Math.cos(2*fracYear))-(0.040849*Math.sin(2*fracYear)));

}

function solarDecline(fracYear){

    return 0.006918 - (0.399912*Math.cos(fracYear))+(0.070257*Math.sin(fracYear))-(0.006758*Math.cos(2*fracYear))+(0.000907*Math.sin(2*fracYear))-(0.002697*Math.cos(3*fracYear))+(0.00148*Math.sin(3*fracYear));

}



function sunCalculation(loc){

    info=document.getElementById("sunCalcVar");
    info.innerHTML="";

    curTime=new Date();

    timezone=(curTime.getTimezoneOffset())/60;

    pie= Math.PI;

    longi=loc.coords.longitude;
    lat=loc.coords.latitude;


    fractionalYear=((2*pie)/366)*(dayOfYear()-1+((today.getHours()-12)/24));


    solutionOfTime=equationOfTime(fractionalYear);

    sunDecline =solarDecline(fractionalYear);

    timeOff=solutionOfTime+4*longi-60*timezone;

    trueSolarTime=(curTime.getHours()*60)+curTime.getMinutes()+(curTime.getSeconds()/60)+timeOff;

    solarHourAngle= (trueSolarTime/4)-180;

    solarZenithAngle=(Math.sin(lat)*Math.sin(sunDecline))+(Math.cos(lat)*Math.cos(sunDecline)*Math.cos(solarHourAngle));//add cos before variable name when using

    solarAzi=-(((Math.sin(lat)*Math.cos(solarZenithAngle))-Math.sin(sunDecline))/(Math.cos(lat)*Math.sin(solarZenithAngle)));
    //add cos on variable and inside the brackets (180- var)

    sha=-Math.acos(((Math.cos(1.58533492))/(Math.cos(lat)*Math.cos(sunDecline)))-(Math.tan(lat)*Math.tan(sunDecline)));

    shaD=sha*(180/pie);

    sunRise=720-(4*(longi+shaD))-solutionOfTime;


    info.innerHTML+= "Pi: "+pie+"<br>";
    info.innerHTML+= "Fractional year: " + fractionalYear + "<br>";
    info.innerHTML+= "Equation of time: "+ solutionOfTime + "<br>";
    info.innerHTML+= "Solar declination: "+ sunDecline*(180/pie) + "<br>";
    info.innerHTML+= "Timezone(h): "+timezone+"<br>";
    info.innerHTML+= "Time offset: "+timeOff+ "<br>";
    info.innerHTML+= "True solar time:" +trueSolarTime+"<br>";
    info.innerHTML+= "Solar Zenith angle:"+Math.cos(solarZenithAngle)*(180/pie)+"<br>";
    info.innerHTML+="Solar Azimuth angle:"+Math.cos(180 -(solarAzi))*(180/pie)+"<br>";

    info.innerHTML+="Sunset hour angle "+ shaD +"<br>";
    info.innerHTML+="Sunset hour: "+ sunRise/60+"<br>";


    

}
