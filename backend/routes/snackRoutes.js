import express from 'express'
import { addSnack, deleteSnack, getSnacks } from '../controllers/snackController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET all snack
router.get('/snacks', auth, getSnacks)

// GET a single snack
// router.get('snacks/:id', )

// POST(Create) a new snack
router.post('/add', auth, addSnack);

// DELETE a snack
router.delete('/snack/:id', auth, deleteSnack)

// UPDATE a snack
// router.put('snacks/:id', )





export default router;

