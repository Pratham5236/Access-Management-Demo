import { Router } from 'express';
import * as authController from '../controllers/authController.ts';

const router = Router();

router.get('/login', authController.loginSaml);
router.post('/login/callback', authController.samlCallback);

router.get('/login/oidc', authController.loginOidc);
router.get('/oidc/callback', authController.oidcCallback);

router.get('/login/uaepass', authController.loginUaePass);
router.get('/login/uaepass/callback', authController.uaePassCallback);

router.get('/logout', authController.logout);

export default router;
