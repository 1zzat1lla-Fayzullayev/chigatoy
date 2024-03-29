import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Import BrowserRouter as Router
import Admin from './components/admin/Admin'

function App() {
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
								<Navbar />
								<Products />
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
