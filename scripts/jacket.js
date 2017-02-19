if(!Console) { // We don't have any way of handling errors: show an alert to the user instead of just swallowing this
	alert('Failed to load console output library; please reload the page and try again.')
}

const start = () => {
	if("geolocation" in navigator) {
		Console.write('Getting user\'s location...')
		let success = (position) => {
			getWeatherAndProceedForLocation(position.coords)
		}
		let failure = () => {
			Console.writeError('Failed to get user\'s location; assuming the user is in Norman instead.')
			getWeatherAndProceedForNorman()
		}
		navigator.geolocation.getCurrentPosition(success, failure)
	} else {
		Console.write('Geolocation API unavailable; assuming the user is in Norman.')
		getWeatherAndProceedForNorman()
	}
}

const getWeatherAndProceedForNorman = () => getWeatherAndProceedForLocation({latitude: 35.20049918465069, longitude: -97.44509224083188})

const getWeatherAndProceedForLocation = (_location) => {
	Console.write(`Getting weather for location (${_location.latitude}, ${_location.longitude})...`)
	let location = {
		latitude : Math.round(_location.latitude * 10000) / 10000,
		longitude : Math.round(_location.longitude * 10000) / 10000	
	}
	try {
		let vector = document.createElement('script')
		vector.src = `https://jacket.hmltn.me/weather/${location.latitude}/${location.longitude}`
		vector.type = 'text/javascript'
		vector.id = 'jacketVector'
		document.head.appendChild(vector)
	} catch (err) {
		Console.writeError(err.message || 'Failed to fetch weather. Giving up.')
	}
}

const continueForWeather = function(response) {
	let vector = document.getElementById('jacketVector')
	if(vector) {
		document.head.removeChild(vector)
	}
	if(response.error) {
		return Console.writeError(response.error)
	}
	if(!response.hasOwnProperty('apparentTemperature')) {
		return Console.writeError('Empty response; giving up. Bring a jacket, just to be safe.')
	}
	let temperature = response.apparentTemperature
	Console.write(`Got response apparent temperature of ${temperature}.`)
	if(temperature < 21) { // 21 degrees Celcius
		return Console.writeYes()
	} else {
		return Console.writeNo()
	}
}

start()