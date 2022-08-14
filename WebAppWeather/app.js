window.addEventListener('load', (e)=>{
    let long;
    let lat;

    const timezone = document.querySelector('.time-zone');
    const tempGrad = document.querySelector('.temperature-degree');
    const tempMin = document.querySelector('.min-temp');
    const tempMax = document.querySelector('.max-temp');
    const timeDescrip = document.querySelector('.temperature-description');

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long,lat);

            
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=a9a889ca35fe9b1bd9571a401ad95ca5`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp,temp_max,temp_min,feels_like} = data.main;
                    const {name} = data;
                    const {description} = data.weather[0];
                    // Set DOM elements from the API
                    timezone.textContent = name;
                    tempGrad.textContent = `${Math.round(temp)} °C`;
                    tempMax.textContent = `${Math.round(temp_max)} °`;
                    tempMin.textContent =  `${Math.round(temp_min)} °`;
                    timeDescrip.textContent = description;
                    

                    console.log(temp,name,description);
                    
                });
        });

        

    }
});