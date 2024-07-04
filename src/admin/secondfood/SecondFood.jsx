import React, { useEffect, useState } from 'react'
import supabase from '../../supabase/config'
import images from '../../ImportedPictures'

function SecondFood({ tab }) {
	const [secondFood, setSecondFood] = useState([])
	const [editIndex, setEditIndex] = useState(null)
	const [secondForm, setSecondForm] = useState({
		cardname: '',
		carddescreption: '',
		cardpicture: '',
		cardprice: '',
		firstprice: '',
		secondprice: '',
	})

	const fetchSecondFood = async () => {
		const { data, error } = await supabase.from('secondfood').select('*')
		if (error) console.error(error)
		else setSecondFood(data)
	}

	useEffect(() => {
		fetchSecondFood()
	}, [])

	const handleChange = e => {
		const { name, value } = e.target
		setSecondForm(prevState => ({ ...prevState, [name]: value }))
	}

	const handleEdit = (index, data) => {
		if (!data) return
		setEditIndex(index)
		setSecondForm({
			cardname: data.cardname || '',
			carddescreption: data.carddescreption || '',
			cardpicture: data.cardpicture || '',
			cardprice: data.cardprice || '',
			secondprice: data.secondprice || '',
			firstprice: data.firstprice || '',
		})
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.showModal()
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const {
			cardname,
			carddescreption,
			cardpicture,
			cardprice,
			secondprice,
			firstprice,
		} = secondForm

		if (!cardname || !carddescreption || !cardpicture) {
			console.error('Please provide all required details for the form.')
			return
		}

		try {
			if (editIndex !== null) {
				const { data, error } = await supabase
					.from('secondfood')
					.update({
						cardname,
						carddescreption,
						cardpicture,
						cardprice: cardprice || null,
						secondprice: secondprice || null,
						firstprice: firstprice || null,
					})
					.eq('id', secondFood[editIndex].id)

				if (error) throw error

				setSecondFood(prevData => {
					const updatedData = [...prevData]
					if (data && data.length > 0) {
						updatedData[editIndex] = data[0]
					}
					return updatedData
				})
			} else {
				const { data, error } = await supabase
					.from('secondfood')
					.insert({
						cardname,
						carddescreption,
						cardpicture,
						cardprice: cardprice || null,
						secondprice: secondprice || null,
						firstprice: firstprice || null,
					})
					.single()

				if (error) throw error
				if (data) {
					setSecondFood(prevData => [...prevData, data])
				}
			}

			setEditIndex(null)
			setSecondForm({
				cardname: '',
				carddescreption: '',
				cardpicture: '',
				cardprice: '',
				secondprice: '',
				firstprice: '',
			})
			handleCloseModal()
			fetchSecondFood()
		} catch (err) {
			console.error(err)
		}
	}

	const handleDelete = async (id, index) => {
		try {
			const { error } = await supabase.from('secondfood').delete().eq('id', id)
			if (error) {
				console.error('Error deleting record:', error.message)
				return
			}
			const newData = [...secondFood]
			newData.splice(index, 1)
			setSecondFood(newData)
			fetchSecondFood()
		} catch (error) {
			console.error('Error deleting record:', error.message)
		}
	}

	const handleCloseModal = () => {
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.close()
	}

	return (
		<>
			<dialog id={`my_modal_${tab}`} className='modal font-Poppins'>
				<div className='modal-box glass-effect'>
					<h3 className='font-bold text-[25px] my-[10px] text-center text-black'>
						Ikkinchi Taom
					</h3>
					<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
						<input
							type='text'
							name='cardname'
							placeholder='Taom nomi'
							className='input bg-[#17171A] text-white'
							value={secondForm.cardname}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='carddescreption'
							placeholder='Malumot'
							className='input bg-[#17171A] text-white'
							value={secondForm.carddescreption}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='cardpicture'
							placeholder='Rasm'
							className='input bg-[#17171A] text-white'
							value={secondForm.cardpicture}
							onChange={handleChange}
							required
						/>
						<input
							type='number'
							name='cardprice'
							placeholder='Narx'
							className='input bg-[#17171A] text-white w-full'
							value={secondForm.cardprice}
							onChange={handleChange}
						/>
						<h2 className='text-red-500'>
							Faqatgina KG o'lchamli taomlar uchun!
						</h2>
						<div className='flex items-center gap-[10px]'>
							<input
								type='number'
								name='firstprice'
								placeholder='1 por'
								className='input bg-[#17171A] text-white w-full'
								value={secondForm.firstprice}
								onChange={handleChange}
							/>
							|
							<input
								type='number'
								name='secondprice'
								placeholder='1 kg'
								className='input bg-[#17171A] text-white w-full'
								value={secondForm.secondprice}
								onChange={handleChange}
							/>
						</div>

						<button className='btn btn-success text-white'>
							{editIndex !== null ? 'Yangilash' : 'Yuborish'}
						</button>
					</form>
					<img
						src={images.close}
						alt='close'
						onClick={handleCloseModal}
						className='absolute top-2 right-2 w-[30px] cursor-pointer'
					/>
				</div>
			</dialog>
			<div className='overflow-x-auto'>
				<table className='min-w-full mt-[20px]'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Taom nomi
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Malumot
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Rasm
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Narx
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								1 por narx
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								1 kg narx
							</th>
						</tr>
					</thead>
					<tbody>
						{secondFood.map((card, index) => (
							<tr key={card.id} className='text-black'>
								<td className='px-6 py-4 text-sm'>{card.cardname}</td>
								<td className='px-6 py-4 text-sm'>{card.carddescreption}</td>
								<td className='px-6 py-4 text-sm'>
									<img
										src={card.cardpicture}
										alt={card.cardname}
										className='w-[100px] rounded-[5px]'
									/>
								</td>
								<td className='px-6 py-4 text-sm'>{card.cardprice}</td>
								<td className='px-6 py-4 text-sm'>{card.firstprice}</td>
								<td className='px-6 py-4 text-sm'>{card.secondprice}</td>

								<td className='px-6 py-4 text-sm'>
									<div className='flex items-center gap-3'>
										<button
											onClick={() => handleEdit(index, card)}
											className='bg-orange-500 text-white px-3 py-1 rounded-lg'
											key={`edit-${card.id}`}
										>
											Edit
										</button>
										<button
											onClick={() => handleDelete(card.id, index)}
											className='bg-red-500 text-white px-3 py-1 rounded-lg'
											key={`delete-${card.id}`}
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default SecondFood
