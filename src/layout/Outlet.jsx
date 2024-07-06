import React, { useState, useCallback } from 'react'
import FirstFoods from '../components/foods/FirstFoods'
import Salats from '../components/foods/Salats'
import SecondFoods from '../components/foods/SecondFoods'
import Header from '../components/Header'
import Main from '../components/Main'
import MarqueeFood from '../components/MarqueeFood'
import Shashlik from '../components/foods/Shashlik'
import Menu from '../shared/Menu'
import { useLocalStorage } from '../context/useLocalStorage'
import { useQuantity } from '../context/useQuantity'

function Outlet() {
	const [selectedCard, setSelectedCard] = useLocalStorage('selectedCard', null)
	const [menuItems, setMenuItems] = useLocalStorage('menuItems', [])
	const { quantity, increment, decrement, setQuantity } = useQuantity(1)
	const [showMenu, setShowMenu] = useState(false)

	const addToMenu = useCallback(
		card => {
			setMenuItems(prevItems => {
				const existingItemIndex = prevItems.findIndex(
					item => item.cardname === card.cardname
				)
				if (existingItemIndex !== -1) {
					const newItems = [...prevItems]
					newItems[existingItemIndex] = {
						...newItems[existingItemIndex],
						quantity: (newItems[existingItemIndex].quantity || 1) + quantity,
					}
					return newItems
				} else {
					return [...prevItems, { ...card, quantity: quantity }]
				}
			})
			setQuantity(1)
		},
		[setMenuItems, quantity, setQuantity]
	)

	const updateMenuItem = useCallback(
		(index, change) => {
			setMenuItems(prevItems => {
				const newItems = [...prevItems]
				const item = newItems[index]
				if (item) {
					newItems[index] = {
						...item,
						quantity: Math.max((item.quantity || 1) + change, 1),
					}
				}
				return newItems
			})
		},
		[setMenuItems]
	)

	const handleClear = useCallback(() => {
		setMenuItems([])
	}, [setMenuItems])

	const calculateTotalPrice = useCallback(() => {
		if (!selectedCard) return '0'
		return (selectedCard.cardprice * quantity).toFixed(2)
	}, [selectedCard, quantity])

	const foodComponents = [
		{ Component: Salats, name: 'Salats' },
		{ Component: FirstFoods, name: 'FirstFoods' },
		{ Component: SecondFoods, name: 'SecondFoods' },
		{ Component: Shashlik, name: 'Shashlik' },
	]

	return (
		<div className='absolute top-0 -z-10 h-full w-full bg-white'>
			<div className='absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]'></div>
			<Header
				selectedCard={selectedCard}
				setSelectedCard={setSelectedCard}
				menuItems={menuItems}
				setShowMenu={setShowMenu}
			/>
			<Main />
			<MarqueeFood />
			{foodComponents.map(({ Component, name }) => (
				<Component
					key={name}
					setSelectedCard={setSelectedCard}
					selectedCard={selectedCard}
					addToMenu={addToMenu}
					increment={increment}
					decrement={decrement}
					calculateTotalPrice={calculateTotalPrice}
					setQuantity={setQuantity}
					quantity={quantity}
				/>
			))}
			<Menu
				showMenu={showMenu}
				setShowMenu={setShowMenu}
				menuItems={menuItems}
				updateMenuItem={updateMenuItem}
				handleClear={handleClear}
			/>
		</div>
	)
}

export default Outlet
