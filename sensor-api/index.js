const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(cors());

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: '34.64.145.37',
    user: 'ssong',
    password: '1004',
    database: 'solar_data_db'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }
    console.log('MySQL 연결 성공');
});

// 태양광 데이터 API 제공
app.get('/api/solar-data', (req, res) => {
    const query = 'SELECT * FROM solar_data_table';

    db.query(query, (error, results) => {
        if (error) {
            console.error('데이터 조회 오류:', error);
            res.status(500).json({ error: '데이터 조회 실패' });
            return;
        }

        // 모든 필드를 문자열로 강제 변환
        const processedResults = results.map((item) => {
            const processedItem = { ...item };
            if (item.REG_DATE) {
                processedItem.REG_DATE = String(new Date(item.REG_DATE).toISOString().split('T')[0]);
            }
            return processedItem;
        });

        // 서버 로그에 변환된 결과 확인
        console.log("Processed Results:", JSON.stringify(processedResults));

        // JSON 문자열로 강제 반환
        res.send(JSON.stringify(processedResults));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
