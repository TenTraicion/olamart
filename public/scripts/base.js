// Calling Copyright Variable
const copy = document.getElementById("copy");
const udate = new Date();
copy.innerText = udate.getFullYear();

//Load time
let before_loadtime = udate.getTime();  
     window.onload = Pageloadtime;  
     function Pageloadtime() {  
         let aftr_loadtime = udate.getTime();  
         // Time calculating in seconds  
         const pgloadtime = (aftr_loadtime - before_loadtime);  
  
         document.getElementById("loadtime").innerText = pgloadtime;  
     } 

// show date
const show = document.getElementById("date");

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

const days = [
    'Sun',
    'Mon',
    'Tues',
    'Wednes',
    'Thurs',
    'Fri',
    'Satur'
  ]

const da = udate.getDay();
const day = days[da];
const date = udate.getDate();
const mo = udate.getMonth();
const month = months[mo];
const year = udate.getFullYear();
const today = `${day}day, ${month} ${date}, ${year}`;

const showClock = () => {
    const time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    let meridiem = '';

    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    meridiem = hour <= 12 ? meridiem = 'AM' : meridiem = 'PM';
    hour = hour == 00 ? hour = 12 : hour > 12 ? hour = hour - 12 : hour;
    let clock = `${hour} : ${minute} : ${second} ${meridiem}`;
    show.textContent = `${today} - ${clock}`;
}

setInterval(showClock, 100);