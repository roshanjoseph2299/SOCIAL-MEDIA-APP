import express from 'express';
import {
  adminpage,
  authAdmin,
  findAllusers
} from '../../controllers/admin/adminController.js';

const router = express.Router();

router.get('/admin', adminpage);
router.post('/adminlogin', authAdmin);
router.get('/findUsers', findAllusers);

export default router;