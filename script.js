let lastUpdate = Date.now();
let counter = 0;

function startListening() {
  window.addEventListener("devicemotion", function(event) {
    if (event.accelerationIncludingGravity) {
      const acc = event.accelerationIncludingGravity;

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
  });
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

document.getElementById("enableBtn")
        .addEventListener("click", requestPermission);
