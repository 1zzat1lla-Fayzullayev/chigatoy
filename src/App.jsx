import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Import BrowserRouter as Router
import Admin from './components/admin/Admin'

function App() {
	const [bag, setBag] = useState([])

	const addToBag = product => {
		setBag([...bag, product])
	}
	return (
		<Router>
			{' '}
			{/* Wrap Routes in Router */}
			<div>
				<Routes>
					<Route
						path='/'
						element={
							<div>
								<Navbar bag={bag} />
								<Products addToBag={addToBag} />
								{/* <Hero /> */}
							</div>
						}
					/>
					<Route path='/adminpanelchigatoy' element={<Admin />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
