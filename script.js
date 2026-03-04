let lastUpdate = Date.now();
let counter = 0;
let active = false;

//put the names of the sensor events to listen for here
const sensorEvents = [ "devicemotion" ];

//The below are the sensor to grab data from and the function to be triggered when it happens
const sensorEvent = sensorEvents[0];
const callbackFunction = accelerometerDataRetrieved;

//this will be run every time the accelerometer updates and causes the "devicemotion" event to fire 
function accelerometerDataRetrieved(event) {
    if (event.accelerationIncludingGravity) {
      const acc = event.accelerationIncludingGravity;//grab the acceleartion

      console.log("fwjfefwjfewfjwfp");
      if (acc == null)//if there is no data
        return;//end the function early

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

function startListening(sensorEvent, callbackFunction) {
    console.log("Adding listener for:", sensorEvent);
  console.log("Callback is:", callbackFunction);
  window.addEventListener(sensorEvent, callbackFunction);
  // window.addEventListener("devicemotion", accelerometerDataRetrieved);
}

function stopListening(sensorEvent, callbackFunction) {
  window.removeEventListener(sensorEvent, callbackFunction);
  // window.removeEventListener("devicemotion", accelerometerDataRetrieved);
}

function toggleSensorDataGrab() {
  if (active) {
    stopListening(sensorEvent, callbackFunction);
    document.getElementById("toggleButton").textContent = "Enable Accelerometer";
    active = false;
  }
  else {
    requestPermission(sensorEvent, callbackFunction);
  }
}

function requestPermission(sensorEvent, callbackFunction) {
  if (typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function") {

    DeviceMotionEvent.requestPermission()
      .then(response => {
        if (response === "granted") {
          startListening(sensorEvent, callbackFunction);
          document.getElementById("toggleButton").textContent = "Disable Accelerometer";
          active = true;
        } else {
          alert("Permission denied.");
        }
      })
      .catch(console.error);

  } else {
    startListening(sensorEvent, callbackFunction);
    document.getElementById("toggleButton").textContent = "Disable Accelerometer";
    active = true;
  }
}

//NOTE: the below functions but breaks the site. If the listener is not loaded such that it is done at the bottom of the HTML file, then it will fail. Making it wait for the DOM to load apparently messes with that. Instead it is better t odo onClick=functionName() in the HTML file
// //this makes it so that the button can be clicked to start listening. It does so by making a listener that waits for the DOM to load so that it can properly grab the toggle button
// window.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("toggleButton").addEventListener("click", toggleSensorDataGrab);
// });