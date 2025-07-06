require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ API CheckGDVUT đang hoạt động!');
});

app.get('/check', async (req, res) => {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: 'Thiếu URL' });

  try {
    // Bước 1: Lấy UID từ link Facebook thông qua finduid.org hoặc 1 dịch vụ khác
    const uidRes = await axios.get(`https://finduid.org/api.php?link=${encodeURIComponent(url)}`);
    const uid = uidRes.data?.uid;

    if (!uid) return res.json({ status: 'not_found', message: 'Không tìm thấy UID' });

    // Bước 2: Kiểm tra UID trong hệ thống Firebase hoặc database của bạn
    // Giả lập dữ liệu:
    if (uid === '100095041414973') {
      return res.json({
        status: 'found',
        name: 'Nguyễn Văn A',
        uid: uid,
        link: url,
        baohiem: '✔ Có bảo hiểm',
        coc: '200.000đ',
        note: 'Đã được xác minh bởi cộng đồng.',
      });
    } else {
      return res.json({
        status: 'not_found',
        uid: uid,
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Lỗi khi xử lý yêu cầu.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại cổng ${PORT}`));
