window.addEventListener('load', function() {
   let form = document.querySelector('form');
   form.addEventListener('submit', function(event) {
     alert("form submitted");
     event.preventDefault();

       let launchStatus = document.getElementById('launchStatus');
       let fuelStatus = document.getElementById('fuelStatus');
       let cargoStatus = document.getElementById('cargoStatus')
       let launchready = true;
       let items = document.getElementById('faultyItems');

       let pilotName = document.querySelector("input[name=pilotName]")
       let copilotName = document.querySelector("input[name=copilotName]");
       let fuelLevel = document.querySelector("input[name=fuelLevel]");
       let cargoMass = document.querySelector("input[name=cargoMass]");
         if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "")  {
                 alert("All fields are required!");
         }
         if (isNaN(fuelLevel.value)  || cargoMass.value === "" || isNaN(cargoMass.value) || !isNaN(copilotName.value) || !isNaN(pilotName.value)) {
                  alert("Enter correct field types!");
                 // stop the form submission

           } else {
             items.style.visibility = 'visible';
             document.getElementById('pilotStatus').innerHTML = `Pilot ${pilotName.value + ' '}Ready`
             document.getElementById('copilotStatus').innerHTML = `Co-pilot ${copilotName.value + ' '}Ready`
             
             if (fuelLevel.value < 10000) {
                 fuelStatus.innerHTML = 'Not enough fuel for launch';
                 launchready = false
             }
             if (cargoMass.value > 10000) {
                 cargoStatus.innerHTML = 'Too much mass for shuttle to take off'
                 launchready = false
             }
             if (launchready) {
             launchStatus.style.color = 'green';
             launchStatus.innerHTML = 'Shuttle is ready for launch';
             getData();
            } else {
             items.style.visibility = 'visible';
             launchStatus.style.color = 'red';
             launchStatus.innerHTML = 'Shuttle not ready for launch';
           }
         }
   });
});


function getData() {
   fetch("https://handlers.education.launchcode.org/static/planets.json")
      .then(function(response) {
      return response.json()
      })
      .then(function(json) {
         let possiblemissiontargets = document.getElementById("missionTarget")
         let missiontarget = json[0] //how to properly select a target from the json?
         possiblemissiontargets.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${missiontarget.name}</li>
            <li>Diameter: ${missiontarget.diameter}</li>
            <li>Star: ${missiontarget.star}</li>
            <li>Distance from Earth: ${missiontarget.distance}</li>
            <li>Number of Moons: ${missiontarget.moons}</li>
         </ol>
         <img src="${missiontarget.image}">
         `;
      });
}
