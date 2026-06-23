import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'dist')));

// HTTP에서 HTTPS로 리다이렉트
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// SPA 라우팅을 위한 catch-all 핸들러
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// HTTP 서버 시작
const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});

// HTTPS 서버 설정 (개발 환경에서는 생략)
if (process.env.NODE_ENV === 'production') {
  try {
    // SSL 인증서 파일 경로 (실제 환경에 맞게 수정 필요)
    const privateKey = fs.readFileSync('/path/to/private-key.pem', 'utf8');
    const certificate = fs.readFileSync('/path/to/certificate.pem', 'utf8');
    
    const credentials = { key: privateKey, cert: certificate };
    const httpsServer = https.createServer(credentials, app);
    
    httpsServer.listen(HTTPS_PORT, () => {
      console.log(`HTTPS Server running on port ${HTTPS_PORT}`);
    });
  } catch (error) {
    console.log('HTTPS server not started - SSL certificates not found');
    console.log('For production, please provide SSL certificates');
  }
}


