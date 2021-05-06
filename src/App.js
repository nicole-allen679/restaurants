import { React, useState, useEffect } from 'react'
import './App.css'

function App() {
  const [allRestaurants, setAllRestaurants] = useState()
  const [text, setText] = useState('Please enter your name')
  useEffect(() => {
    fetch('https://bocacode-intranet-api.web.app/restaurants')
      .then((response) => response.json())
      .then((promise) => setAllRestaurants(promise))
      .catch((err) => console.log(err))
  }, [])

  function handleSubmit(event){
    console.log(allRestaurants)
    event.preventDefault()

    const newRestaurant = {
      name: 'ice cream shop',
      address: '123main st',
      rating: 6,
    }

    fetch('https://bocacode-intranet-api.web.app/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRestaurant)
    })
    .then(response => response.json)
    .then(status => console.log(status))
  }

  return (
    <div className="App">
      <form>
        <label>
          <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
        </label>
        <button onClick={event => handleSubmit(event)}>Go Here</button>
      </form>

      {!allRestaurants ? (
        <h2>Loading...</h2>
      ) : (
        allRestaurants.map((restaurant) => {
          return (
            <div key={restaurant.id}>
              <h2>{restaurant.name}</h2>
              <span>{restaurant.address}</span>
              <span>{restaurant.cuisine}</span>
              <span>{restaurant.rating}</span>
              <img
                src={restaurant.photoUrl}
                alt={`${restaurant.name}`}
                style={{ maxWidth: '300px', borderRadius: '50%' }}
              />
            </div>
          )
        })
      )}
    </div>
  )
}

export default App
