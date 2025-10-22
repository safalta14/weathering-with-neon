// document.addEventListener("DOMContentLoaded", function() {
const form=document.getElementById("center");
form.addEventListener("submit",function(e){
  e.preventDefault();
  getWeather();

});

const search=document.getElementById("search_icon")
search.addEventListener("click",function(e){
 getWeather();
});




async function getWeather() {
    const city = document.getElementById("centering").value;
    if (!city) 
      return;

    // Call your Django view instead of OpenWeatherMap directly
    const url = `/calling/?city=${city}`;
    

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
             //const description=data.weather.map(w=>w.description).join(",");
            const description = Array.isArray(data.weather)?data.weather.map(w => w.description).join(", "):" ";
            document.getElementById("result").innerHTML = `
                <h2>${data.city}</h2><br>
            Temperature: ${data.temperature}<br>
                Humidity: ${data.humidity}<br>
                Feels Like: ${data.feels_like}<br>
                Min Temp: ${data.min_temp}<br>
                Max Temp: ${data.max_temp}<br>
                Sunrise: ${data.sunrise}<br>
                Sunset: ${data.sunset}<br>
               
            `;
           const access_key="5WDBoln2C_TfYBCrZaTv1P6Qk8WFSP8F_1QIxW_YT2E";
            // Still call background image function
             background(city, access_key);
        } 
        else {
            throw new Error(data.error || "City not found");
        }
    } 
    catch (error) {
        document.getElementById("result").innerHTML = `<span style="color:red">${error.message}</span>`;
    }
}

async function background(city,access_key){
    // access_key="5WDBoln2C_TfYBCrZaTv1P6Qk8WFSP8F_1QIxW_YT2E"
  const url=`https://api.unsplash.com/search/photos?query=${city}&client_id=${access_key}&orientation=landscape`


  try{
    const res= await fetch(url)
    const data=await res.json()

    if(data.results.length>0){
      const imgurl=data.results[0].urls.regular //gets the image full uril with high quality pictures
      const bg=document.getElementById("background-layer");
      bg.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${imgurl})`;
      document.body.style.backgroundSize="cover"
      document.body.style.backgroundRepeat="no-repeat"
      document.body.style.backgroundPosition="center"
      document.body.classList.add("bg")
    }
  
  else{
    console.log("no image for the city found")
  }
}

  catch(err){
    console.log("error")
  }
}




{/* <h2>${data.city}</h2>
              
 Description: ${description} */}
















































































// async function getWeather() {

//      const api_key="3cf4d429e31906f1c566d3d8b9b0dea8"
//     accessKey="5WDBoln2C_TfYBCrZaTv1P6Qk8WFSP8F_1QIxW_YT2E"
//       const city=document.getElementById("centering").value
//      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
     
//        try{
//      const response= await fetch(url)
    
//       if(response.ok){
//         const data=await response.json()
//          const description=data.weather.map(w=>w.description).join(",");
       
//         document.getElementById("result").innerHTML= `temperature:${data.main.temp}C <br>
//                                                       humidity:${data.main.humidity}<br>
//                                                       feels_like:${data.main.feels_like}<br>
//                                                       min_temp:${data.main.temp_min} <br>
//                                                       max_temp:${data.main.temp_max}<br>
//                                                       sunrise:${new Date(data.sys.sunrise*1000).toLocaleTimeString()}<br>
//                                                       sunset:${new Date(data.sys.sunset*1000).toLocaleTimeString()}<br>
//                                                       description:${description}`
//       background(city,accessKey) 
//       }
//         else{
//             throw new Error("city not found")
//         }
//      }
//      catch(error){
//          document.getElementById("result").innerHTML=`<span style="color:red">${error.message}</span>`
//      }

// }







// async function getWeather(city) {
//     const response = await fetch(`/calling?city=${city}`);
//     const data = await response.json();

//     if (response.ok) {
//         document.getElementById("weather-info").innerHTML = `
//             <h2>${city}</h2>
//             <p>Temperature: ${data.temperature}</p>
//             <p>Feels like: ${data.feels_like}</p>
//             <p>Humidity: ${data.humidity}</p>
//             <p>Description: ${data.description}</p>
//             <img src="http://openweathermap.org/img/w/${data.icon}.png" />
//         `;
//     } else {
//         document.getElementById("weather-info").innerHTML = `<p>${data.error}</p>`;
//     }
// }
