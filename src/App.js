import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useLocation } from 'react-router-dom'
import GoogleMapReact from 'google-map-react';

import google_icon from './assets/google-maps.png'
import yandex_icon from './assets/yandex.png'
import apple_icon from './assets/apple.png'

function App() {

	const search = useLocation().search
	const location = new URLSearchParams(search).get('location')

	if (!location) {

		const defaultProps = {
			center: {
				lat: 39.925533,
				lng: 32.866287
			},
			zoom: 11
		};

		const copyToClipboard = () => {
			navigator.clipboard.writeText(document.getElementById('url').href)
		}	

		return (
			<div className="App bg-dark">
				<div className="container-fluid vw-100 vh-100 pt-5">
					<div className="col-sm-10 col-md-8 col-lg-6 m-auto">
						<h1 className='text-light'>Generate URL</h1>
						<p>Choose a location on map and generate URL</p>

						<div className='col-12 mt-3 map'>
							<GoogleMapReact
							    onClick={ev => {
									document.getElementById('url').href=`http://localhost:3000/?location=${ev.lat},${ev.lng}`

								}}
								bootstrapURLKeys={{ key: "" }}
								defaultCenter={defaultProps.center}
								defaultZoom={defaultProps.zoom}
								>
								</GoogleMapReact>
						</div>
						<div className="col-12 mt-2">
							<button type="button" onClick={copyToClipboard} className="btn btn-secondary btn-lg btn-block">
								<p>Copy URL</p>
							</button>
						</div>
						<div className="col-12 mt-2">
							<a target="_blank" href={`http://localhost:3000/?location=${defaultProps.center.lat},${defaultProps.center.lng}`} rel="noreferrer" id='url'>
								<button type="button" className="btn btn-primary btn-lg btn-block">
									<p>Click to Go</p>
								</button>
							</a>
						</div>
					</div>
				</div>
			</div>
		)
	}

	var coords = location.split(',')
	var lat = coords[0]
	var lon = coords[1]

	return (
		<div className="App bg-dark">
			<div className="container-fluid vw-100 vh-100 pt-5">
				<div className="col-10 col-sm-8 col-md-6 col-lg-4 m-auto">
					<h1 className='text-light'>Location</h1>
					<div className="col-12">
						<a
							href={'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lon}
							target="_blank"
							rel="noreferrer"
						>
							<button type="button" className="btn btn-google btn-lg btn-block">
								<img className='icon' src={google_icon} alt="Google Maps" />
								<p>Google Maps</p>
							</button>
						</a>
					</div>

					<div className="col-12 mt-2">

						<a href={'https://yandex.ru/maps/?pt=' + lon + ',' + lat + '&z=18&l=map'} target="_blank" rel="noreferrer">
							<button type="button" className="btn btn-yandex btn-lg btn-block">
								<img className='icon' src={yandex_icon} alt="Yandex Maps" />
								<p>Yandex Maps</p>
							</button>
						</a>
					</div>

					<div className="col-12 mt-2">
						<a href={'https://maps.apple.com/?ll=' + lat + ',' + lon} target="_blank" rel="noreferrer">
							<button type="button" className="btn btn-apple btn-lg btn-block">
								<img className='icon' src={apple_icon} alt="Apple Maps"  />
								<p>Apple Maps</p>
							</button>
						</a>
					</div>

					<div className="col-12 mt-3">
						<a href='http://localhost:3000' rel="noreferrer">
							<button type="button" className="btn btn-secondary btn-lg btn-block">
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
