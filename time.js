function display_c() {
  var refresh = 1000;
  mytime = setTimeout("display_ct()", refresh);
}

function display_ct() {
  var x = new Date();
  //var formatX=x.getHours()+":"+x.getMinutes()+":"+x.getSeconds();

  if (x.getHours() < 10) formatX = "0" + x.getHours() + ":";
  else formatX = x.getHours() + ":";

  if (x.getMinutes() < 10) formatX += "0" + x.getMinutes() + ":";
  else formatX += x.getMinutes() + ":";

  if (x.getSeconds() < 10) formatX += "0" + x.getSeconds();
  else formatX += x.getSeconds();

  document.getElementById("Clock").innerHTML = formatX;
  goAct(x);
  animationSwitcher(x);
  display_c();
}

function getBodyAttr(attr) {
  elem = document.getElementsByTagName("body")[0];

  let currentAnimation = window.getComputedStyle(elem).getPropertyValue(attr);

  return currentAnimation;
}

function displayAnimationName() {
  name = getBodyAttr("animation-name");
  alert(name);
}

function displayCurrentBackgroundColor() {
  color = getBodyAttr("background-color");
  alert(color);
}

function switchAnimation(toThis) {
  bod = document.getElementsByTagName("body")[0];
  bod.style.animationName = toThis;
}

function animationSwitcher(cuTime) {
  sunriseTime = new Date();
  dayTime = new Date();
  sunsetTime = new Date();
  nightTime = new Date();
  sunriseTime.setHours(11, 57, 0);
  dayTime.setHours(11, 57, 30);
  sunsetTime.setHours(11, 58, 0);
  nightTime.setHours(11, 58, 30);

  clockEnd = new Date();
  clockEnd.setHours(24, 0, 0);

  clockStart = new Date();
  clockStart.setHours(0, 0, 0);

  if (betweenTime(cuTime, sunriseTime, dayTime)) switchAnimation("sunRise");

  if (betweenTime(cuTime, dayTime, sunsetTime)) switchAnimation("dayTime");

  if (betweenTime(cuTime, sunsetTime, nightTime)) switchAnimation("sunSet");

  if (
    betweenTime(cuTime, nightTime, clockEnd) ||
    betweenTime(cuTime, clockStart, sunriseTime)
  )
    switchAnimation("nightTime");
}

function betweenTime(curDate, befTime, aftTime) {
  if (befTime <= curDate && curDate <= aftTime) {
    return true;
  }
  return false;
}

function goAct(curTime) {
  actTimeStart = new Date();
  actTimeEnd = new Date();
  actTimeStart.setHours(15, 15, 0);
  actTimeEnd.setHours(15, 15, 30);

  if (curTime >= actTimeStart && curTime < actTimeEnd) {
    document.getElementById("act").innerHTML = "The time to act is NOW!";
  } else {
    document.getElementById("act").innerHTML = "Now is not the time to act...";
  }
}

function spawnStar() {
  star = document.createElement("div");

  star.classList.add("star");

  star.style.position = "absolute";
  star.style.zIndex = -1;

  star.style.animationDuration = Math.floor(Math.random() * 30 + 1) + "s";

  getSize = Math.floor(Math.random() * 50 + 1);
  star.style.width = getSize + "px";
  star.style.height = getSize + "px";

  xCoor = Math.floor(Math.random() * screen.availWidth + 1);
  yCoor = Math.floor(Math.random() * screen.availHeight + 1);

  star.style.left = xCoor + "px";
  star.style.top = yCoor + "px";

  document.body.appendChild(star);
}

function displayDebug() {
  debugEl = document.getElementById("debug");
  debugState = window.getComputedStyle(debugEl).getPropertyValue("display");
  if (debugState == "none") {
    debugEl.style.display = "block";
    document.getElementById("dState").innerHTML = "enabled";
  } else {
    debugEl.style.display = "none";
    document.getElementById("dState").innerHTML = "disabled";
  }
}

function givCoor() {
  elem = document.getElementById("loc");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(outputInfo);
    navigator.geolocation.getCurrentPosition(sunCalc);
  } else {
    elem.innerHTML = "No coords 4 u";
  }
}

function outputInfo(loc) {
  elem = document.getElementById("loc");

  elem.innerHTML += "<br> lat:" + loc.coords.latitude;
  elem.innerHTML += "<br> long:" + loc.coords.longitude;
}

document.getElementById("loc").onload = givCoor();

monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function dayOfYear() {
  dayNum = 0;

  today = new Date();
  thisMonth = today.getMonth();
  dayOfMonth = today.getDate();

  for (counter = 0; counter < thisMonth; counter++) {
    for (dayCounter = 0; dayCounter < monthDays[counter]; dayCounter++) {
      dayNum++;
    }
  }

  for (tCounter = 0; tCounter < dayOfMonth; tCounter++) {
    dayNum++;
  }

  return dayNum;
}

function equationOfTime(fracYear) {
  return (
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(fracYear) -
      0.032077 * Math.sin(fracYear) -
      0.014615 * Math.cos(2 * fracYear) -
      0.040849 * Math.sin(2 * fracYear))
  );
}

function solarDecline(fracYear) {
  return (
    0.006918 -
    0.399912 * Math.cos(fracYear) +
    0.070257 * Math.sin(fracYear) -
    0.006758 * Math.cos(2 * fracYear) +
    0.000907 * Math.sin(2 * fracYear) -
    0.002697 * Math.cos(3 * fracYear) +
    0.00148 * Math.sin(3 * fracYear)
  );
}

function sunCalculation(loc) {
  info = document.getElementById("sunCalcVar");
  info.innerHTML = "";

  curTime = new Date();

  timezone = curTime.getTimezoneOffset() / 60;

  pie = Math.PI;

  longi = loc.coords.longitude;
  lat = loc.coords.latitude;

  fractionalYear =
    ((2 * pie) / 366) * (dayOfYear() - 1 + (today.getHours() - 12) / 24);

  solutionOfTime = equationOfTime(fractionalYear);

  sunDecline = solarDecline(fractionalYear);

  timeOff = solutionOfTime + 4 * longi - 60 * timezone;

  trueSolarTime =
    curTime.getHours() * 60 +
    curTime.getMinutes() +
    curTime.getSeconds() / 60 +
    timeOff;

  solarHourAngle = trueSolarTime / 4 - 180;

  solarZenithAngle =
    Math.sin(lat) * Math.sin(sunDecline) +
    Math.cos(lat) * Math.cos(sunDecline) * Math.cos(solarHourAngle); //add cos before variable name when using

  solarAzi = -(
    (Math.sin(lat) * Math.cos(solarZenithAngle) - Math.sin(sunDecline)) /
    (Math.cos(lat) * Math.sin(solarZenithAngle))
  );
  //add cos on variable and inside the brackets (180- var)

  sha = -Math.acos(
    Math.cos(1.58533492) / (Math.cos(lat) * Math.cos(sunDecline)) -
      Math.tan(lat) * Math.tan(sunDecline)
  );

  shaD = sha * (180 / pie);

  sunRise = 720 - 4 * (longi + shaD) - solutionOfTime;

  info.innerHTML += "Pi: " + pie + "<br>";
  info.innerHTML += "Fractional year: " + fractionalYear + "<br>";
  info.innerHTML += "Equation of time: " + solutionOfTime + "<br>";
  info.innerHTML += "Solar declination: " + sunDecline * (180 / pie) + "<br>";
  info.innerHTML += "Timezone(h): " + timezone + "<br>";
  info.innerHTML += "Time offset: " + timeOff + "<br>";
  info.innerHTML += "True solar time:" + trueSolarTime + "<br>";
  info.innerHTML +=
    "Solar Zenith angle:" + Math.cos(solarZenithAngle) * (180 / pie) + "<br>";
  info.innerHTML +=
    "Solar Azimuth angle:" + Math.cos(180 - solarAzi) * (180 / pie) + "<br>";

  info.innerHTML += "Sunset hour angle " + shaD + "<br>";
  info.innerHTML += "Sunset hour: " + sunRise / 60 + "<br>";
}

function jDN() {
  date = new Date();
  months = date.getMonth();
  year = date.getFullYear();
  day = date.getDate();

  monthEq = (months - 14) / 12;
  yearEq = year + 4800;

  firstEq = (1461 * (yearEq + monthEq)) / 4;

  monthEq2 = months - 2 - 12 * monthEq;

  secondEq = (367 * monthEq2) / 12;

  thirdEq = (3 * ((yearEq + 100 + monthEq) / 100)) / 4;

  dayEq = day - 32075;

  return firstEq + secondEq - thirdEq + dayEq;
}

function sunCalc2(loc) {
  info = document.getElementById("sunCalc2Var");
  info.innerHTML = "";

  curTime = new Date();
  pie = Math.PI;

  longi = loc.coords.longitude;
  lat = loc.coords.latitude;

  curYear = curTime.getFullYear();
  curMonth = curTime.getMonth();

  julianDay = Date.now() / 86400000 + 2440587.5;

  jdnFrac = (julianDay - 0.5) % 1;

  meanSolarNoon = Math.floor(julianDay) - longi / 360;

  solarMeanAnomaly = (357.5291 + 0.98560028 * meanSolarNoon) % 360;

  equationOfCenter =
    1.9148 * Math.sin(solarMeanAnomaly) +
    0.02 * Math.sin(2 * solarMeanAnomaly) +
    0.0003 * Math.sin(3 * solarMeanAnomaly);

  eqCtoDeg = equationOfCenter * (180 / pie);

  eclipticLongitude =
    (solarMeanAnomaly + equationOfCenter + 180 + 102.9372) % 360;

  solarTransit =
    2451545.0 +
    meanSolarNoon +
    0.0053 * Math.sin(solarMeanAnomaly) -
    0.0069 * Math.sin(2 * eclipticLongitude);

  sunDecline = Math.sin(eclipticLongitude) * Math.sin(23.44);

  info.innerHTML +=
    "The current Julian Day Number is: " + Math.floor(julianDay) + "<br>";
  info.innerHTML +=
    "Julian day with the current fractional part:" + julianDay + "<br>";
  info.innerHTML += "Julian day fractional part: " + jdnFrac + "<br>";
  info.innerHTML += "The mean solar noon is: " + (meanSolarNoon + 0.5) + "<br>";
  info.innerHTML += "The solar mean anomaly is: " + solarMeanAnomaly + "<br>";
  info.innerHTML += "The equation of center is: " + eqCtoDeg + "<br>";
  info.innerHTML += "The ecliptic longitude is:" + eclipticLongitude + "<br>";
  info.innerHTML += "The solar transit value is: " + solarTransit + "<br>";
  info.innerHTML += "Sun declination: " + radToDeg(sunDecline) + "<br>";

  sunCalc(loc);
}

function sunCalc(loc) {
  pie = Math.PI;
  info = document.getElementById("sunCalc2Var");
  curDate = new Date(2023, 5, 7, 0, 06, 0);

  time = 0.1 / 24;

  julianDay = curDate.valueOf() / 86400000 + 2440587.5;
  julianCentury = (julianDay - 2451545) / 36525;

  geomMeanLongSun =
    (280.46646 + julianCentury * (36000.76983 + julianCentury * 0.0003032)) %
    360;
  geomMeanAnomSun =
    357.52911 + julianCentury * (35999.05029 - 0.0001537 * julianCentury);

  eccentEarthOrbit =
    0.016708634 - julianCentury * (0.000042037 + 0.0000001267 * julianCentury);

  sunEqOfCtr =
    Math.sin(geomMeanAnomSun * (pie / 180)) *
      (1.914602 - julianCentury * (0.004817 + 0.000014 * julianCentury)) +
    Math.sin(2 * geomMeanAnomSun * (pie / 180)) *
      (0.019993 - 0.000101 * julianCentury) +
    Math.sin(3 * geomMeanAnomSun * (pie / 180)) * 0.000289;

  sunTrueLongInDegrees = geomMeanLongSun + sunEqOfCtr;
  sunTrueAnomInDegrees = geomMeanAnomSun + sunEqOfCtr;
  sunRadVector;

  info.innerHTML += `Date: ${new Date(curDate).toDateString()} <br>`;
  info.innerHTML +=
    "Julian day with the current fractional part:" + julianDay + "<br>";
  info.innerHTML += "Julian century:" + julianCentury + "<br>";
  info.innerHTML += "Geom Mean Long Sun in degrees:" + geomMeanLongSun + "<br>";
  info.innerHTML += "Geom Mean Anom Sun in degrees:" + geomMeanAnomSun + "<br>";
  info.innerHTML += "Eccent Earth Orbit:" + eccentEarthOrbit + "<br>";
  info.innerHTML += "Sun Equinox of Center:" + sunEqOfCtr + "<br>";
  info.innerHTML += "Sun True Long in degrees:" + sunTrueLongInDegrees + "<br>";
  info.innerHTML += "Sun True Anom in degrees:" + sunTrueAnomInDegrees + "<br>";
}

function radToDeg(val) {
  return val * (180 / Math.PI);
}
