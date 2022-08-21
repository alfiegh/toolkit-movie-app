import mongoose from 'mongoose'
import Snack from '../models/snack.js'

export const getSnacks = async (req, res) => {
	const allSnacks = await Snack.find({user: req.user}).sort({ createdAt: -1 })
	
	res.status(200).json(allSnacks)
}

// adding a snack
export const addSnack = async (req, res) => {
	const { title, category, price } = req.body
	console.log('REQ USER ID-->', req.user)
	console.log(title, category)

	try {
		// if email already exists, send an error
		const isAvailable = await Snack.findOne({ title: title });
		if (isAvailable) {
			return res.status(400).send("Snack already exists!")
		}

		const newSnack = await Snack.create({
			title: title,
			category: category,
			price: price,
			user: req.user,
		})

		res.status(200).send(newSnack)

	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// delete a snack
export const deleteSnack = async (req, res) => {
		const { id } = req.params
		console.log(id)

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: "No such snack was found!" })
		}

		const snack = await Snack.findOneAndDelete({ _id: id })

		if (!snack) {
			return res.status(400).json({ error: "No such snack was found!" })
		}

		res.status(200).json(snack)
}