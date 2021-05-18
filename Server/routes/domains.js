import express from "express";

import { getDomains, createDomain, subscribe, deleteDomain} from '../controllers/domains.js';

import auth from '../middleware/auth.js';

const router = express.Router();

// http://localhost:5000/domains

router.get('/',getDomains);
router.post('/',auth,createDomain);
router.patch('/:id/susbscribe',auth,subscribe);
router.delete('/:id',auth,deleteDomain);

export default router;
