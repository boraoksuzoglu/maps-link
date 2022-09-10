import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'

import google_icon from './assets/google-maps.png'
import yandex_icon from './assets/yandex.png'
import apple_icon from './assets/apple.png'
import marker_icon from './assets/marker.png'

function App() {
  const search = useLocation().search
  const location = new URLSearchParams(search).get('location')

  const initialLat = location ? Number(location.split(',')[0]) : 39.925533
  const initialLng = location ? Number(location.split(',')[1]) : 32.866287

  const [zoom] = useState(11)
  const [showLocationPage, setShowLocationPage] = useState(location !== null)
  const [coordinates, setCoordinates] = useState({
    lat: initialLat,
    lng: initialLng
  })

  useEffect(() => {
    if (location) return
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

  const copyLocationUrl = () => {
    const url = `${process.env.REACT_APP_URL}/?location=${coordinates.lat},${coordinates.lng}`
    navigator.clipboard.writeText(url)
  }

  const Marker = () => <img className="marker" src={marker_icon} />

  if (!showLocationPage) {
    return (
      <div className="App bg-dark">
        <div className="container-fluid vw-100 vh-100 pt-5">
          <div className="col-sm-10 col-md-8 col-lg-6 m-auto">
            <h1 className="text-light">Generate URL</h1>
            <p>Choose a location on map and generate URL</p>

            <div className="col-12 mt-3 map">
              <GoogleMapReact
                onClick={({ lat, lng }) => {
                  setCoordinates({ lat, lng })
                }}
                center={coordinates}
                defaultZoom={zoom}
                bootstrapURLKeys={{ key: '' }}>
                <Marker lat={coordinates.lat} lng={coordinates.lng} />
              </GoogleMapReact>
            </div>

            <div className="col-12 mt-2">
              <button
                type="button"
                onClick={copyLocationUrl}
                className="btn btn-secondary btn-lg btn-block">
                <p>Copy URL</p>
              </button>
            </div>

            <div className="col-12 mt-2">
              <a target="_blank" rel="noreferrer" id="url">
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={() => setShowLocationPage(true)}>
                  <p>Click to Go</p>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App bg-dark">
      <div className="container-fluid vw-100 vh-100 pt-5">
        <div className="col-10 col-sm-8 col-md-6 col-lg-4 m-auto">
          <h1 className="text-light">Location</h1>
          <div className="col-12">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`}
              target="_blank"
              rel="noreferrer">
              <button type="button" className="btn btn-google btn-lg btn-block">
                <img className="icon" src={google_icon} alt="Google Maps" />
                <p>Google Maps</p>
              </button>
            </a>
          </div>

          <div className="col-12 mt-2">
            <a
              href={`https://yandex.ru/maps/?pt=${coordinates.lng},${coordinates.lat}&z=18&l=map`}
              target="_blank"
              rel="noreferrer">
              <button type="button" className="btn btn-yandex btn-lg btn-block">
                <img className="icon" src={yandex_icon} alt="Yandex Maps" />
                <p>Yandex Maps</p>
              </button>
            </a>
          </div>

          <div className="col-12 mt-2">
            <a
              href={`https://maps.apple.com/?ll=${coordinates.lat},${coordinates.lng}`}
              target="_blank"
              rel="noreferrer">
              <button type="button" className="btn btn-apple btn-lg btn-block">
                <img className="icon" src={apple_icon} alt="Apple Maps" />
                <p>Apple Maps</p>
              </button>
            </a>
          </div>

          <div className="col-12 mt-3">
            <a rel="noreferrer">
              <button
                type="button"
                className="btn btn-secondary btn-lg btn-block"
                onClick={() => setShowLocationPage(false)}>
                <p>Generate new URL</p>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
