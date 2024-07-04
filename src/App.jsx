import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Outlet from './layout/Outlet'
import Admin from './admin/Admin'

function App() {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 3000)
		return () => clearTimeout(timer)
	}, [])

	if (loading) {
		return (
			<div className='loading_p'>
				<div className='loader'></div>
			</div>
		)
	}

	return (
		<div className='absolute top-0 -z-10 h-full w-full bg-white'>
			<div className='absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]'></div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Outlet />} />
					<Route path='/admin' element={<Admin />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
