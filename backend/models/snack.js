import mongoose from "mongoose";

const Schema = mongoose.Schema

const snackSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'user',
	},
	title: {
		type: String,
		required: true,
		trim: true,
	},
	category: {
		type: String,
		required: true,
		trim: true,
	},
	price: {
		type: String,
		required: true,
		trim: true,
	},


}, { timestamps: true })

export default mongoose.model("snack", snackSchema)