import express from "express";

import { getDomains, createDomain, subscribe, deleteDomain, getDomainById} from '../controllers/domains.js';

import auth from '../middleware/auth.js';

const router = express.Router();

// http://localhost:5000/domains

router.get('/',getDomains);
router.get('/:id',getDomainById)
router.post('/',createDomain);
router.patch('/:id/susbscribe',subscribe);
router.delete('/:id',deleteDomain);

export default router;
