import { useState } from 'react'

export const useQuantity = (initialQuantity = 1) => {
	const [quantity, setQuantity] = useState(initialQuantity)

	const increment = () => setQuantity(prev => prev + 1)
	const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

	return { quantity, increment, decrement, setQuantity }
}
