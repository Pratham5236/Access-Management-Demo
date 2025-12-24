import { Router } from 'express';
import * as indexController from '../controllers/indexController.ts';
import { ensureAuthenticated } from '../middleware/authMiddleware.ts';

const router = Router();

router.get('/', indexController.renderHome);
router.get('/profile', ensureAuthenticated, indexController.renderProfile);
router.get('/profile-oidc', indexController.renderOidcProfile);
router.get('/profile-uaepass', indexController.renderUaePassProfile);

export default router;
