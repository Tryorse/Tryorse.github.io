let lastUpdate = Date.now();
let counter = 0;
let active = true;

//this will be run every time the accelerometer updates and causes the "devicemotion" event to fire 
function accelerometerDataRetrieved(event) {
    if (event.accelerationIncludingGravity) {
      const acc = event.accelerationIncludingGravity;//grab the acceleartion

      document.getElementById("x").textContent = acc.x.toFixed(2);
      document.getElementById("y").textContent = acc.y.toFixed(2);
      document.getElementById("z").textContent = acc.z.toFixed(2);

      counter++;
      const now = Date.now();

      if (now - lastUpdate >= 1000) {
        document.getElementById("rate").textContent = counter;
        counter = 0;
        lastUpdate = now;
      }
    }
}

function startListening() {
  window.addEventListener("devicemotion", accelerometerDataRetrieved);
}

function stopListening() {
  window.removeEventListener("devicemotion", accelerometerDataRetrieved);
}

function toggleSensorDataGrab() {
  if (active) {
    stopListening();
  }
  else {
    requestPermission();
  }
}

function requestPermission() {
  if (typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function") {

    DeviceMotionEvent.requestPermission()
      .then(response => {
        if (response === "granted") {
          startListening();
        } else {
          alert("Permission denied.");
        }
      })
      .catch(console.error);

  } else {
    startListening();
  }
}

//this makes it so that the button can be clicked to start listening
document.getElementById("enableBtn")
        .addEventListener("click", requestPermission);
