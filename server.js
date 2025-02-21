// Install these resources to run the server.
const express = require('express'); 
const axios = require('axios');

const app = express();
const PORT = 3000; // I used 3000 for convience. Feel free to use whatever port!

app.use(express.json());

// Webhook Proxy Endpoints
app.post('/api/webhooks/:webhookId/:webhookToken', async (req, res) => {
    const { webhookId, webhookToken } = req.params;
    const discordWebhookUrl = `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`;

    try {
        // Change the URL > Send it to the domain
        const response = await axios.post(discordWebhookUrl, req.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Send your webhook to your actual webhook. 
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error forwarding webhook:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Console to start your server.
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
