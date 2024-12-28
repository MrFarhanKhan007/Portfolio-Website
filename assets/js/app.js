const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(express.json());

const secretKey = process.env.SECRET_KEY;

app.post('/verify-recaptcha', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, error: 'Missing reCAPTCHA token' });
    }

    try {
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: secretKey,
                response: token
            }
        });

        if (response.data.success) {
            return res.status(200).json({
                success: true,
                score: response.data.score
            });
        } else {
            return res.status(400).json({
                success: false,
                error: response.data['error-codes']
            });
        }
    } catch (error) {
        console.error('reCAPTCHA verification failed:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
