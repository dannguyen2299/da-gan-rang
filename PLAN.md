# PLAN – Web demo "Đá Gắn Răng" (Cubic Zirconia)

Tài liệu giao việc cho Codex: dựng **giao diện landing page demo** để trình bày với khách. Đọc kèm `RESEARCH.md` (số liệu thị trường, FAQ). Nếu đã có code trong thư mục này thì **chỉnh lại cho khớp plan**, không làm lại từ đầu trừ khi cần.

## 1. Sản phẩm (phải thể hiện đúng)
- **Đá gắn răng Cubic Zirconia (kim cương nhân tạo)**, **cắt tròn, trắng trong**, đế bằng (gắn không cần khoan).
- Bán theo **thẻ vỉ niêm phong 5 viên**. Mỗi thẻ có bảng thông số, mã thẻ và mã QR.
- Các size hiện có (đơn vị mm) và trọng lượng cả thẻ 5 viên:

| Size | Trọng lượng (5 viên) | Độ trong | Màu |
|---|---|---|---|
| 2.25 mm | 0.45 ct | Trong | Không màu |
| 2.50 mm | 0.60 ct | Trong | Không màu |
| 2.70 mm | 0.80 ct | Trong | Không màu |
| 3.00 mm | 1.00 ct | Trong | Không màu |

- Thông số trên thẻ: `Measure (mm)`, `Weight (ct) (5 pc)`, `Clarity`, `Color`, `Comment`, mã thẻ dạng `C5xxxx`, ngày, tem "Niêm phong", QR.
- **Chỉ có một kiểu: tròn trắng.** Không tạo mục trái tim, ngôi sao, giọt nước, đá màu, AB. Nếu sau này shop có thì thêm vào `data/products.js`.
- Khách hàng: **nha khoa, spa, thẩm mỹ viện, thợ gắn** (mua sỉ) và khách lẻ.
- Giá: chưa có. Dùng giá minh họa trong `data/products.js`, đánh dấu `TODO`, giao diện hiển thị "Liên hệ báo giá" nếu giá rỗng.

## 2. Mục tiêu
- Demo cho khách xem: web chuyên nghiệp, giới thiệu rõ sản phẩm, dẫn khách **nhắn Zalo / gọi / đăng ký mua sỉ**.
- Người xem chủ yếu dùng **điện thoại** (mobile-first).
- Dễ thay nội dung thật sau khi khách duyệt.

## 3. Nguyên tắc về ảnh (quan trọng)
- **Không dùng ảnh thật/ảnh chụp thẻ của khách, không tải ảnh từ web.** Chưa có ảnh nào được cấp cho web này.
- Toàn bộ hình là **SVG/CSS tự vẽ**, lưu trong `assets/img/` hoặc inline:
  - Viên đá tròn cắt kiểu brilliant (SVG nhiều mặt cắt, hiệu ứng lấp lánh bằng gradient).
  - **Thẻ vỉ bằng HTML/CSS:** thẻ trắng, ô nhựa trong chứa 5 viên đá xếp hình quincunx (4 góc + 1 giữa), bảng thông số, QR giả (placeholder, không có mã thật), tem "Niêm phong". Không dùng logo của bên thứ ba (ví dụ GGJ, Swarovski).
  - Hình minh họa răng cửa + viên đá để so sánh size (vẽ theo tỷ lệ).
- Mỗi ảnh placeholder đặt tên rõ và có `data-placeholder`, để sau này thay bằng ảnh thật của khách chỉ cần đổi đường dẫn trong `data/products.js`.
- Không dùng ảnh người thật.

## 4. Công nghệ
- **HTML + CSS + JavaScript thuần**, không framework, không bước build. Mở `index.html` là chạy.
- Font Google Fonts có subset `vietnamese`: `Be Vietnam Pro` (nội dung), `Playfair Display` (tiêu đề lớn).
- Cấu trúc:
```
da-gan-rang/
├── index.html
├── css/style.css
├── js/main.js
├── data/products.js   # sản phẩm, giá, FAQ, liên hệ (sửa 1 chỗ)
└── assets/img/        # SVG placeholder
```
- Mọi thông tin thay đổi (SĐT, Zalo, giá, size, FAQ) nằm trong `data/products.js`; `main.js` render ra DOM.

## 5. Phong cách thiết kế
- Cảm giác: **sạch, sang, chuyên nghiệp, kiểu trang sức/nha khoa cao cấp**.
- Nền sáng `#F7F9FC`, chữ `#141B2D`. Khối nhấn màu navy `#0B1F4B`. Màu chính xanh sapphire `#1F4FBF`, phụ bạc `#C9D3E3`, điểm nhấn vàng ánh kim `#C9A24B`.
- Khai báo màu bằng CSS variables ở `:root`.
- Bo góc 16–24px, đổ bóng mềm, nhiều khoảng trắng, tối đa 2 font.
- Hiệu ứng lấp lánh nhẹ trên viên đá (CSS keyframes). Tôn trọng `prefers-reduced-motion`.

## 6. Các section (theo thứ tự)
1. **Header dính:** logo chữ "Đá Gắn Răng", menu neo (Sản phẩm, Chọn size, Mua sỉ, Hỏi đáp, Liên hệ), nút "Nhắn Zalo". Mobile: hamburger.
2. **Hero:** nền navy, tiêu đề "Đá gắn răng Cubic Zirconia – lấp lánh như kim cương", mô tả ngắn, 2 nút (Nhắn Zalo; Xem các size), bên phải/dưới là **thẻ vỉ 5 viên dựng bằng CSS**. 3 badge: "Cắt tròn trắng trong", "Đế bằng, không cần khoan", "Thẻ niêm phong 5 viên".
3. **Vì sao chọn:** 4 thẻ icon SVG: cắt tròn nhiều mặt, đế bằng bám keo tốt, đóng thẻ niêm phong có mã, nhiều size từ 2.25 đến 3.00mm.
4. **Sản phẩm – các size:** 4 thẻ sản phẩm (2.25 / 2.50 / 2.70 / 3.00mm). Mỗi thẻ là thẻ vỉ CSS kèm thông số và nút "Hỏi mua size này" mở Zalo với tin nhắn soạn sẵn "Mình muốn hỏi đá gắn răng size X mm". Không cần bộ lọc (chỉ 1 kiểu).
5. **Chọn size (công cụ tương tác):** chọn loại răng (cửa, khểnh/nanh, răng nhỏ) và mong muốn (kín đáo / nổi bật) → gợi ý size, hiển thị **hình răng + viên đá vẽ theo tỷ lệ** và kích thước thực (thanh trượt xem 2.25→3.00). Ghi chú "Gợi ý tham khảo, hãy hỏi nha sĩ/thợ gắn". Mặc định dùng gợi ý phổ biến: 2.0–2.5mm là cỡ hay dùng, nên đây là gợi ý chung, để shop chỉnh lại.
6. **Đọc thẻ thông số:** hình thẻ có chú thích chỉ từng dòng (Measure, Weight, Clarity, Color, mã thẻ, QR) giúp khách hiểu, cùng giải thích "ct" và "5 pc".
7. **Cách gắn (thông tin tham khảo):** 5 bước timeline: làm sạch → xử lý bề mặt men → bôi keo/composite → đặt đá → chiếu đèn UV. Ghi rõ do **nha sĩ/thợ có chuyên môn thực hiện**, không khuyến khích tự làm bằng keo dán thông thường.
8. **Mua sỉ / đại lý:** dành cho nha khoa, spa, thẩm mỹ viện. Bảng giá theo số lượng (giá minh họa/TODO) và form đăng ký (tên, SĐT, đơn vị, số lượng dự kiến). Form demo, **chỉ kiểm tra hợp lệ và hiện thông báo cảm ơn**, chưa gửi đi đâu.
9. **Hỏi đáp:** accordion, nội dung lấy từ `RESEARCH.md` mục 4 (đau không, hại không, bao lâu, ăn uống, tháo, tự làm, ai không nên gắn).
10. **Liên hệ:** Zalo, Messenger, SĐT, địa chỉ, giờ làm việc (giá trị TODO trong `products.js`), khung bản đồ placeholder.
11. **Footer:** thông tin shop, link Facebook `https://www.facebook.com/daganrang.com.vn/`, dòng miễn trừ (mục 9).
12. **Thanh liên hệ cố định** dưới màn hình mobile (Zalo + Gọi); desktop: nút Zalo nổi góc phải dưới.

## 7. Yêu cầu kỹ thuật
- **Responsive:** kiểm 360 / 768 / 1280px. Không cuộn ngang.
- **Hiệu năng:** SVG/CSS nhẹ, không thư viện nặng. Font `display=swap`. Lighthouse Mobile ≥ 90.
- **Accessibility:** thẻ ngữ nghĩa, `alt`/`aria-label`, tương phản đủ, focus rõ, điều khiển bằng bàn phím (menu, accordion, thanh trượt).
- **SEO:** `lang="vi"`, `<title>`, meta description, một H1, Open Graph + Twitter card (dùng `og-cover.svg` tạm; ghi chú cần ảnh PNG/JPG 1200×630 khi chạy thật), JSON-LD `LocalBusiness` cơ bản.
- **Liên kết liên hệ:** `https://zalo.me/<SĐT>`, `tel:`, `https://m.me/daganrang.com.vn`.
- **Theo dõi:** chừa chỗ Facebook Pixel/GA4 (comment), gắn `data-track` cho nút liên hệ.
- **JS:** module nhỏ, không phụ thuộc, có try/catch cho phần không thiết yếu.

## 8. Nội dung mẫu (tiếng Việt)
- Hero: "Đá gắn răng Cubic Zirconia – lấp lánh như kim cương" · "Cắt tròn trắng trong, đế bằng, đóng thẻ niêm phong 5 viên. Nhắn shop để chọn đúng size."
- Tên sản phẩm: "Đá gắn răng Cubic Zirconia – thẻ 5 viên – size 2.50mm".
- Nhãn chất liệu luôn ghi **"Cubic Zirconia (kim cương nhân tạo)"**.

## 9. Lưu ý nội dung và pháp lý (Codex phải tuân thủ)
- **Không** dùng tên/logo **Swarovski** hay **GGJ**, và không ghi "Made in Austria" trên giao diện. Nếu shop sau này có chứng từ thì thêm bằng cấu hình.
- **Không** gọi là "kim cương thật". Ghi "kim cương nhân tạo / Cubic Zirconia".
- **Không** cam kết y tế tuyệt đối ("an toàn tuyệt đối", "không hại răng", "không đau"). Dùng cách nói trung tính.
- Có dòng ở footer và FAQ: "Nếu bạn có vấn đề về răng miệng, hãy tham khảo ý kiến nha sĩ trước khi sử dụng."
- Ghi rõ trên trang demo (banner nhỏ ở footer): "Bản demo – nội dung, giá và hình ảnh mang tính minh họa."

## 10. Dữ liệu chủ shop cần cung cấp (để `TODO` trong `products.js`)
- SĐT, Zalo, địa chỉ, giờ làm việc, link Facebook/TikTok
- Giá lẻ từng size, giá sỉ theo số lượng
- Có bán kèm keo/đèn UV hoặc dịch vụ gắn không
- Chính sách bảo hành/đổi trả, vận chuyển
- Logo, ảnh sản phẩm thật (để thay placeholder), quyền dùng tên/logo bên thứ ba trên thẻ (nếu muốn hiển thị)

## 11. Tiêu chí hoàn thành
- [ ] Mở `index.html` chạy được, không lỗi console.
- [ ] Đủ các section ở mục 6, hiển thị đúng trên 360/768/1280px.
- [ ] Đúng 4 size (2.25 / 2.50 / 2.70 / 3.00mm), thẻ 5 viên, thông số khớp bảng mục 1; **không có** trái tim/ngôi sao/màu/AB.
- [ ] Công cụ chọn size, accordion FAQ, menu mobile, form mua sỉ (demo) hoạt động.
- [ ] Sửa `data/products.js` là đổi được nội dung hiển thị.
- [ ] Nút Zalo/Gọi/Messenger mở đúng liên kết, tin nhắn Zalo soạn sẵn tên size.
- [ ] Không có ảnh chụp thật hay logo bên thứ ba; mọi hình là SVG/CSS.
- [ ] Không có claim y tế tuyệt đối; có banner "bản demo".
- [ ] Lighthouse Mobile: Performance, Accessibility, SEO đều ≥ 90.

## 12. Ngoài phạm vi (giai đoạn sau)
Giỏ hàng/thanh toán, blog SEO, trang quản trị, gửi form về Zalo/Google Sheet, tra cứu mã thẻ bằng QR.
