import React, { useEffect, useState } from 'react'
import supabase from '../../supabase/config'
import images from '../../ImportedPictures'

function FirstFood({ tab }) {
	const [shashlikFood, setShashlikFood] = useState([])
	const [editIndex, setEditIndex] = useState(null)
	const [shashlikForm, setShashlikForm] = useState({
		cardname: '',
		carddescreption: '',
		cardpicture: '',
		cardprice: '',
	})

	const fetchShashlik = async () => {
		const { data, error } = await supabase.from('shashlik').select('*')
		if (error) console.error(error)
		else setShashlikFood(data)
	}

	useEffect(() => {
		fetchShashlik()
	}, [])

	const handleChange = e => {
		const { name, value } = e.target
		setShashlikForm(prevState => ({ ...prevState, [name]: value }))
	}

	const handleEdit = (index, data) => {
		if (!data) return
		setEditIndex(index)
		setShashlikForm({
			cardname: data.cardname || '',
			carddescreption: data.carddescreption || '',
			cardpicture: data.cardpicture || '',
			cardprice: data.cardprice || '',
		})
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.showModal()
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const { cardname, carddescreption, cardpicture, cardprice } = shashlikForm

		if (!cardname || !carddescreption || !cardpicture || !cardprice) {
			console.error('Please provide all details for the form.')
			return
		}

		try {
			if (editIndex !== null) {
				const { data, error } = await supabase
					.from('shashlik')
					.update({
						cardname,
						carddescreption,
						cardpicture,
						cardprice,
					})
					.eq('id', shashlikFood[editIndex].id)

				if (error) throw error

				setShashlikFood(prevData => {
					const updatedData = [...prevData]
					if (data && data.length > 0) {
						updatedData[editIndex] = data[0]
					}
					return updatedData
				})
			} else {
				const { data, error } = await supabase
					.from('shashlik')
					.insert({
						cardname,
						carddescreption,
						cardpicture,
						cardprice,
					})
					.single()

				if (error) throw error
				if (data) {
					setShashlikFood(prevData => [...prevData, data])
				}
			}

			setEditIndex(null)
			setShashlikForm({
				cardname: '',
				carddescreption: '',
				cardpicture: '',
				cardprice: '',
			})
			handleCloseModal()
			fetchShashlik()
		} catch (err) {
			console.error(err)
		}
	}

	const handleDelete = async (id, index) => {
		try {
			await supabase.from('shashlik').delete().eq('id', id)
			if (error) {
				console.error('Error deleting record:', error.message)
				return
			}
			const newData = [...shashlikFood]
			newData.splice(index, 1)
			setShashlikFood(newData)
			fetchShashlik()
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
					<h3 className='font-bold text-[25px] my-[20px] text-center text-black'>
						Shashlik qo'shish
					</h3>
					<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
						<input
							type='text'
							name='cardname'
							placeholder='Taom nomi'
							className='input bg-[#17171A] text-white'
							value={shashlikForm.cardname}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='carddescreption'
							placeholder='Malumot'
							className='input bg-[#17171A] text-white'
							value={shashlikForm.carddescreption}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='cardpicture'
							placeholder='Rasm'
							className='input bg-[#17171A] text-white'
							value={shashlikForm.cardpicture}
							onChange={handleChange}
							required
						/>
						<input
							type='number'
							name='cardprice'
							placeholder='Narx'
							className='input bg-[#17171A] text-white'
							value={shashlikForm.cardprice}
							onChange={handleChange}
							required
						/>

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
						</tr>
					</thead>
					<tbody>
						{shashlikFood.map((card, index) => (
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

export default FirstFood
