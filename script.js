function toggleMenu() {
    const menu = document.getElementById('overlayMenu');
    menu.classList.toggle('show');
  }
  
  function closeMenu() {
    const menu = document.getElementById('overlayMenu');
    menu.classList.remove('show');
  }
  

document.addEventListener("DOMContentLoaded", function () {
    const weatherInfo = document.getElementById("weatherInfo");

    function updateWeather() {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
                .then(response => response.json())
                .then(data => {
                    weatherInfo.textContent = `${data.current_weather.temperature}°C, ${data.current_weather.weathercode}`;
                })
                .catch(error => {
                    weatherInfo.textContent = "Weather unavailable";
                });
        });
    }

    updateWeather();

    function playStation(playerId) {
        document.querySelectorAll("audio").forEach(audio => {
            audio.pause();
            audio.style.display = "none";
        });
        const player = document.getElementById(playerId);
        player.style.display = "block";
        player.play();
    }

    function showGiveawayForm() {
        document.getElementById("giveawayForm").style.display = "block";
    }

    function closeGiveawayForm() {
        document.getElementById("giveawayForm").style.display = "none";
    }

    document.getElementById("giveawayEntryForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;

        const entry = `${fullName}, ${email}\n`;
        localStorage.setItem("giveawayEntries", (localStorage.getItem("giveawayEntries") || "") + entry);
        alert("Entry submitted successfully!");
        closeGiveawayForm();
    });

    function moveCarousel(direction) {
        let slides = document.querySelectorAll(".carousel-slide");
        let currentSlide = Array.from(slides).findIndex(slide => slide.classList.contains("active"));

        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    document.querySelector(".carousel-prev").addEventListener("click", () => moveCarousel(-1));
    document.querySelector(".carousel-next").addEventListener("click", () => moveCarousel(1));

    function switchStation(station) {
        document.querySelectorAll(".now-playing-section").forEach(section => section.style.display = "none");
        document.getElementById(`${station}Station`).style.display = "block";
    }
});



