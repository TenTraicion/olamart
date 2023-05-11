// Calling Copyright Variable
const copy = document.getElementById("copy");
const date = new Date();
copy.innerText = date.getFullYear();

// Show Timezone

document.getElementById('tz').innerText = Intl.DateTimeFormat().resolvedOptions().timeZone;


// show date
const show = document.getElementById("date");

const format = date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const showClock = () => {
    const time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    let meridiem = '';

    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    // meridiem = hour <= 12 ? meridiem = 'AM' : meridiem = 'PM';
    // hour = hour == 00 ? hour = 12 : hour > 12 ? hour = hour - 12 : hour;
    hour = hour == 00 ? (hour = 24) : hour > 24 ? (hour = hour - 24) : hour;
    let clock = `${hour} : ${minute} : ${second} ${meridiem}`;
    show.textContent = `${format} at ${clock}`;
}

setInterval(showClock, 100);

// Show Referrer
const linkOfTheWebsiteUserCame = document.referrer;

console.log(linkOfTheWebsiteUserCame);

// show referrer on 404 page
const ref = document.getElementById("ref");
ref.setAttribute("href", linkOfTheWebsiteUserCame);
if (linkOfTheWebsiteUserCame == "") {
    ref.setAttribute("href", "/");
}

// Generate Load Time
document.addEventListener('DOMContentLoaded', function() {
  const load = performance.now() / 1000;
  document.getElementById("loadtime").innerText = `${load.toFixed(2)} seconds`;
}, false);
