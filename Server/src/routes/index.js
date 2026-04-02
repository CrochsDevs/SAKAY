import express from 'express';
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Add your other routes here
// router.post('/login', loginController);
// router.post('/register', registerController);

export default router;
