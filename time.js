
function display_c(){
    var refresh=1000;
    mytime=setTimeout('display_ct()',refresh)
}

function display_ct(){
    var x = new Date();
    var formatX=x.getHours()+":"+x.getMinutes()+":"+x.getSeconds();
    document.getElementById('Clock').innerHTML = formatX;
    display_c();
}

function displayAName(){

    Name=document.styleSheets.;

    alert(Name[0].value);
}