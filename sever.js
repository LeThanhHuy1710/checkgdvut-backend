const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/check", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ status: "error", message: "Thiếu URL" });

  try {
    const html = await axios.get(url);
    const uidMatch = html.data.match(/"userID":"(\d+)"/);
    const uid = uidMatch ? uidMatch[1] : null;

    if (!uid) return res.json({ status: "not_found", message: "Không tìm thấy UID" });

    // Dữ liệu test
    if (uid === "100087654321234") {
      return res.json({
        status: "found",
        name: "Nguyễn Văn Scam",
        uid,
        link: url,
        baohiem: "✅ Đã có",
        coc: "200,000 VND",
        note: "Lừa đảo 2 người"
      });
    } else {
      return res.json({ status: "not_found", uid });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ status: "error", message: "Lỗi khi xử lý URL" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại cổng ${PORT}`);
});
