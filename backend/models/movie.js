import mongoose from "mongoose";
/* 
id
title
overview
vote_average
poster_path
*/

const Schema = mongoose.Schema

const movieSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'user',
	},
	id: {
		type: String,
		unique: true,
	},
	title: {
		type: String,
		required: true,
		trim: true,
	},
	overview: {
		type: String,
	},
	vote_average: {
		type: Number,
	},
	poster_path: {
		type: String,
	}

});

export default mongoose.model("movie", movieSchema)