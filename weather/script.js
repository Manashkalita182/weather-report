let weather = {
    apiKey: "91f776ac8194507e4be92906f420980d",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      this.changeBackground(description, data.sys.sunrise, data.sys.sunset);
      document.querySelector(".weather").classList.remove("loading");
    },
    changeBackground: function (description, sunrise, sunset) {
      const body = document.body;
      let backgroundImageUrl = "";
      
      const currentTime = new Date().getTime() / 1000;
  
      if (currentTime > sunrise && currentTime < sunset) {
        // Daytime
        switch (description.toLowerCase()) {
          case "rain":
            backgroundImageUrl =
              "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Ftessett%2Fart%2FNIGHT-ANIMATED-RAIN-gif-Evening-Sky-256x256-491376012&psig=AOvVaw3QS9YRSOtE7KgwxTGNYAbT&ust=1707064692669000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjb1NbNj4QDFQAAAAAdAAAAABAE/rain)";
            break;
          case "clouds":
            backgroundImageUrl =
              "url('https://media1.tenor.com/m/438H6u87JfsAAAAC/sky-clouds.gif')";
            break;
          case "clear":
            backgroundImageUrl =
              "url('https://c1.wallpaperflare.com/preview/232/993/172/sky-blue-nature-weather.jpg')";
          default:
            backgroundImageUrl =
              "url(https://img.freepik.com/free-vector/sky-background-video-conferencing_23-2148625271.jpg?w=1800&t=st=1706978004~exp=1706978604~hmac=d9aae22a9e4ad6c65602021491543101ec52f1ca602245d66df3ed0bd9c31add)";
        }
      } else {
        // Nighttime
        switch (description.toLowerCase()) {
          case "rain":
            backgroundImageUrl =
              "url('https://source.unsplash.com/1600x900/?night,rain')";
            break;
          case "clouds":
            backgroundImageUrl =
              "url('https://source.unsplash.com/1600x900/?night,clouds')";
            break;
          case "clear":
            backgroundImageUrl =
              "url('https://source.unsplash.com/1600x900/?night,sunny')";
            break;
          default:
            backgroundImageUrl =
              "url('https://source.unsplash.com/1600x900/?night,default')";
        }
      }
  
      body.style.backgroundImage = backgroundImageUrl;
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
  
  weather.fetchWeather("INDIA");
  
  