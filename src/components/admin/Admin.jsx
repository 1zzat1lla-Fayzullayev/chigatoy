import React, { useEffect, useState } from 'react'
import { app, db } from '../../firebase/firebaseConfig'
import { useCollection } from 'react-firebase-hooks/firestore'
import {
	getFirestore,
	collection,
	deleteDoc,
	doc,
	setDoc,
} from 'firebase/firestore'
import { Link } from 'react-router-dom'
import logo from '../../assets/chigatoy.jpg'

function Admin() {
	const [tab, setTab] = useState(1)
	const [isLogged, setLogged] = useState(
		localStorage.getItem('isLoggedIn') === 'true'
	)
	const [postOrPut, setPostOrPut] = useState(new Date().getTime())

	const [foods] = useCollection(collection(getFirestore(app), 'products'), {
		snapshotListenOptions: { includeMetadataChanges: true },
	})

	useEffect(() => {
		localStorage.setItem('isLoggedIn', isLogged)
	}, [isLogged])

	const deleteItem = async (collectionName, id) => {
		await deleteDoc(doc(db, collectionName, id))
	}

	const [inputValues, setInputValues] = useState({})

	const addItem = async collectionName => {
		if (Object.values(inputValues).every(value => value)) {
			const itemRef = doc(db, collectionName, postOrPut.toString())

			setInputValues({
				name: '',
				desc: '',
				price: '',
				image: '',
			})

			document.getElementById('modal').close()

			setPostOrPut(new Date().getTime())

			await setDoc(itemRef, inputValues, { merge: true })
		}
	}
	return (
		<div className='font-Poppins'>
			{isLogged ? (
				<div className='flex justify-start flex-col md:flex-row items-start'>
					<div className='w-full md:w-[360px] bg-[#FFFFFF] md:h-screen flex flex-col items-center md:pb-0 pb-[20px] pt-5 shadow-admin'>
						<Link to='/'>
							<img src={logo} alt='logo' className='w-10' />
						</Link>
						<div className='mt-[35px] flex flex-col items-start gap-3 w-full px-6'>
							<p
								onClick={() => setTab(1)}
								className={`${
									tab === 1
										? 'bg-[#458FF6] text-[#fff] font-medium '
										: 'bg-[#ececec50] text-[#7a7c80] '
								} text-lg rounded-[8px] hover:cursor-pointer hover:translate-x-1.5 transition-all py-[8px] px-[25px] w-full mr-5`}
							>
								Taomlar
							</p>
						</div>
					</div>
					<div className='p-5 bg-[#FAFBFF] w-full md:w-11/12'>
						{tab === 1 && (
							<div className='overflow-x-auto h-screen'>
								<div className='flex justify-between items-center my-3'>
									<h1 className='text-2xl font-[800] text-[#5c5c5c]'>
										Taomlar
									</h1>
									<button
										onClick={() => document.getElementById('modal').showModal()}
										className='btn bg-[#458FF6] hover:bg-[#3166AF] text-[#fff]'
									>
										Taom qo'shish
									</button>
								</div>
								<table className='shadow-admin2 table my-20 bg-[#FFFFFF] w-11/12 mx-auto'>
									<thead className='2xl:table hidden md:block w-full'>
										<tr className='flex justify-between py-2.5'>
											<th className='w-[50px] text-center'>№</th>
											<th className='w-full md:w-4/12'>Nomi</th>
											<th className='w-full md:w-4/12'>Malumot</th>
											<th className='w-full md:w-3/12'>Narx</th>
											<th className='w-1/12'>O'zgartirish</th>
											<th className='w-1/12 text-center'>O'chirish</th>
										</tr>
									</thead>
									<tbody className='rounded-[30px] w-full flex flex-col items-center gap-10 md:gap-0'>
										{foods?.docs.map((item, index) => (
											<tr
												key={item.id}
												className='bg-[#FFFFFF] hover:bg-[#f1f1f16c] flex-col items-start xl:flex-row flex justify-between w-full py-[10px] gap-[20px]'
											>
												<th className='w-[50px] hidden xl:block text-center'>
													{index + 1}
												</th>
												<td className='w-full md:w-4/12'>{item.data().name}</td>
												<td className='w-full md:w-4/12'>{item.data().desc}</td>
												<td className='w-full md:w-3/12'>
													{item.data().price}
												</td>
												<td
													onClick={() => {
														document.getElementById('modal').showModal()
														setPostOrPut(item.id)
														setInputValues(item.data())
													}}
													className='w-1/12 font-semibold text-yellow-400 cursor-pointer'
												>
													O'zgartirish
												</td>
												<td
													onClick={() => deleteItem('products', item.id)}
													className='w-1/12 cursor-pointer block hover:scale-105 transition-all text-red-500 text-center  '
												>
													O'chirish
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className='flex h-screen w-full justify-center items-center'>
					<input
						type='password'
						className='input input-bordered'
						placeholder='Parol'
						onChange={e => {
							if (e.target.value === 'nodir2008') {
								setLogged(true)
							}
						}}
					/>
				</div>
			)}

			<dialog id='modal' className='modal'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>Taom qo'shish</h3>
					<div className='w-full flex flex-col gap-2 mt-[15px]'>
						<input
							onChange={e =>
								setInputValues(prev => ({ ...prev, name: e.target.value }))
							}
							value={inputValues.name || ''}
							type='text'
							placeholder='Nomi'
							className='input input-bordered'
						/>
						<input
							onChange={e =>
								setInputValues(prev => ({ ...prev, desc: e.target.value }))
							}
							value={inputValues.desc || ''}
							type='text'
							placeholder='Malumot'
							className='input input-bordered'
						/>
						<input
							onChange={e =>
								setInputValues(prev => ({ ...prev, price: e.target.value }))
							}
							value={inputValues.price || ''}
							type='number'
							placeholder='Narx'
							className='input input-bordered'
						/>
						<input
							onChange={e =>
								setInputValues(prev => ({ ...prev, image: e.target.value }))
							}
							value={inputValues.image || ''}
							type='text'
							placeholder='Картинка URL'
							className='input input-bordered'
						/>

						<button
							onClick={() => addItem('products')}
							className='mt-[10px] btn bg-[#458FF6] hover:bg-[#3166AF] text-[#fff]'
						>
							Qo'shish
						</button>
					</div>
				</div>
				<form method='dialog' className='modal-backdrop'>
					<button onClick={() => document.getElementById('modal').close()}>
						close
					</button>
				</form>
			</dialog>
		</div>
	)
}

export default Admin
