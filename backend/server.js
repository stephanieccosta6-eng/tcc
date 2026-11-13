const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve o frontend estático diretamente pela rede local para o celular acessar via IP
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'API GlowUp acessível pelo celular!' });
});

app.post('/api/auth/login', (req, res) => {
    const { email } = req.body;
    res.json({
        success: true,
        token: 'jwt_glowup_mobile_2026',
        user: { name: 'Maria Silva', email: email || 'maria.silva@glowup.com', skinType: 'Mista', goal: 'Luminosidade & Brilho' }
    });
});

app.post('/api/auth/register', (req, res) => {
    const { name, email } = req.body;
    res.json({
        success: true,
        token: 'jwt_glowup_mobile_2026',
        user: { name: name || 'Maria Silva', email: email || 'maria.silva@glowup.com', skinType: 'Mista', goal: 'Luminosidade & Brilho' }
    });
});

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    const ip = getLocalIP();
    console.log('===================================================');
    console.log('🌟 GlowUp App rodando com sucesso!');
    console.log(`💻 No Computador: http://localhost:${PORT}`);
    console.log(`📱 No Celular (mesmo Wi-Fi): http://${ip}:${PORT}`);
    console.log('===================================================');
});
