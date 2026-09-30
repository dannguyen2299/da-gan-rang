window.shopData = {
  shop: {
    name: "Đá Gắn Răng",
    tagline: "Đá gắn răng Cubic Zirconia - lấp lánh như kim cương",
    description:
      "Cắt tròn trắng trong, đế bằng, đóng thẻ niêm phong 5 viên. Nhắn shop để chọn đúng size.",
    phone: "0901234567",
    zalo: "0901234567",
    messenger: "daganrang.com.vn",
    address: "TODO: Địa chỉ shop",
    hours: "TODO: 09:00 - 20:00 hằng ngày",
    facebook: "https://www.facebook.com/daganrang.com.vn/",
    tiktok: "#",
  },
  // Ảnh demo: nguồn ghi ở "credit" (không hiển thị trên trang). Ảnh smile.jpg là ảnh tham khảo bên thứ ba, cần thay trước khi chạy thật.
  // Thay bằng ảnh thật của shop: đổi "src". Để src trống thì hiện hình vẽ dự phòng (fallback: "smile" | "gem").
  gallery: [
    { src: "assets/img/smile.jpg", alt: "Viên đá nhỏ gắn trên răng cửa", caption: "Gắn ở răng cửa: kín đáo mà vẫn bắt sáng", credit: "Ảnh tham khảo demo: Intech Lạc Việt", fallback: "smile" },
    { src: "assets/img/smile-natural.jpg", alt: "Nụ cười với hàm răng trắng đều", caption: "Nụ cười tự tin, hàm răng sạch trước khi gắn đá", credit: "Ảnh: Pexels (miễn phí bản quyền)" },
    { src: "assets/img/gem.jpg", alt: "Đá tròn trắng trong cắt nhiều mặt", caption: "Đá tròn trắng trong, cắt nhiều mặt", credit: "Ảnh: Pexels (miễn phí bản quyền)", fallback: "gem" },
    { src: "assets/img/gem-dark.jpg", alt: "Đá tròn trắng trong lấp lánh trên nền tối", caption: "Bắt sáng rõ dưới mọi nền ánh sáng", credit: "Ảnh: Pexels (miễn phí bản quyền)" },
  ],
  processPhoto: {
    src: "assets/img/dentist.jpg",
    alt: "Nha sĩ trao đổi với khách tại phòng khám",
    credit: "Ảnh: Pexels (miễn phí bản quyền)",
  },
  showcase: {
    eyebrow: "Nụ cười lấp lánh",
    title: "Một viên nhỏ, điểm nhấn rõ ràng trên nụ cười",
    text: "Đá tròn trắng trong gắn ở răng cửa hoặc răng khểnh là kiểu được chọn nhiều nhất. Ảnh trong bản demo dùng để tham khảo, chưa phải ảnh của shop.",
  },
  badges: ["Cắt tròn trắng trong", "Đế bằng, không cần khoan", "Thẻ niêm phong 5 viên"],
  specs: [
    { photo: "assets/img/product-5.jpg", size: "2.25", weight: "0.45", clarity: "Trong", color: "Không màu", price: "" },
    { photo: "assets/img/product-2.jpg", size: "2.50", weight: "0.60", clarity: "Trong", color: "Không màu", price: "TODO: 199.000đ" },
    { photo: "assets/img/product-6.jpg", size: "2.70", weight: "0.80", clarity: "Trong", color: "Không màu", price: "TODO: 229.000đ" },
    { photo: "assets/img/product-3.jpg", size: "3.00", weight: "1.00", clarity: "Trong", color: "Không màu", price: "" },
  ],
  benefits: [
    {
      title: "Cắt tròn nhiều mặt",
      text: "Viên Cubic Zirconia cắt brilliant, tạo hiệu ứng bắt sáng như trang sức.",
      icon: "cut",
    },
    {
      title: "Đế bằng dễ thao tác",
      text: "Thiết kế đế bằng để bám keo/composite khi được gắn đúng kỹ thuật.",
      icon: "base",
    },
    {
      title: "Thẻ niêm phong có mã",
      text: "Mỗi thẻ 5 viên có mã thẻ, ngày, bảng thông số và QR placeholder.",
      icon: "card",
    },
    {
      title: "4 size phổ biến",
      text: "Dải size từ 2.25 đến 3.00mm để tư vấn cho khách lẻ và đơn vị mua sỉ.",
      icon: "size",
    },
  ],
  // Gợi ý size: số liệu tham khảo tự đặt, TODO: shop/nha sĩ xác nhận lại.
  // x, y: vị trí viên đá (% theo ảnh mẫu assets/img/teeth-model.jpg). pctPerMm: % bề ngang ảnh cho mỗi mm
  // (răng cửa ~8.5mm). pxPerMm: tỷ lệ dải so sánh.
  sizeAdvisor: {
    photo: "assets/img/teeth-model.jpg",
    pctPerMm: 1.93,
    pxPerMm: 14,
    incisorMm: 8.5,
    teeth: [
      { value: "front", label: "Răng cửa", discreet: "2.50", bold: "2.70", x: 47, y: 55.2, note: "Răng cửa rộng nên viên 2.50-2.70 mm nhìn cân đối." },
      { value: "canine", label: "Răng khểnh/nanh", discreet: "2.25", bold: "2.50", x: 21.6, y: 53.5, note: "Răng khểnh/nanh hẹp và cong nên ưu tiên viên nhỏ." },
      { value: "small", label: "Răng nhỏ", discreet: "2.25", bold: "2.50", x: 33, y: 54.4, note: "Răng nhỏ nên chọn viên nhỏ để không lấn diện tích răng." },
    ],
    styles: [
      { value: "discreet", label: "Kín đáo" },
      { value: "bold", label: "Nổi bật" },
    ],
    note: "Gợi ý mang tính tham khảo, nên hỏi nha sĩ hoặc thợ gắn trước khi chọn.",
    scaleNote: "Kích thước trên màn hình chỉ mang tính tham khảo, khác nhau tùy thiết bị và ảnh.",
    privacyNote: "Ảnh của bạn chỉ xử lý trên trình duyệt, không được gửi đi đâu.",
  },
  // Kiểu đá: chỉ "round" là hàng đang có trên thẻ vỉ 5 viên (PLAN.md). Kiểu khác là minh họa, cần shop xác nhận.
  shapesNote:
    "Kiểu tròn trắng là dòng đang có trên thẻ vỉ 5 viên. Các kiểu khác chỉ để tham khảo, vui lòng nhắn shop để xác nhận có hàng.",
  shapes: [
    { id: "round", label: "Tròn", available: true, photo: "assets/img/shapes/round.png", desc: "Cắt brilliant tròn nhiều mặt, bắt sáng mạnh và dễ phối hợp. Đây là kiểu đang có trên thẻ vỉ 5 viên của shop." },
    { id: "oval", label: "Bầu dục", available: false, photo: "assets/img/shapes/oval.png", desc: "Dáng bầu dục kéo dài, nhìn viên đá có cảm giác lớn hơn so với cùng kích thước." },
    { id: "pear", label: "Giọt nước", available: false, photo: "assets/img/shapes/pear.png", desc: "Dáng giọt nước với một đầu nhọn, tạo nét riêng cho nụ cười." },
    { id: "marquise", label: "Marquise", available: false, photo: "assets/img/shapes/marquise.png", desc: "Dáng thuyền thon dài, hai đầu nhọn, kéo dài viên đá theo chiều dọc." },
    { id: "emerald", label: "Emerald", available: false, photo: "assets/img/shapes/emerald.png", desc: "Cắt bậc thang hình chữ nhật, các mặt song song tạo hiệu ứng sáng tối rõ nét." },
    { id: "asscher", label: "Asscher", available: false, photo: "assets/img/shapes/asscher.png", desc: "Cắt bậc thang vuông bo góc, phong cách Art Deco từ đầu thế kỷ 20." },
    { id: "princess", label: "Princess", available: false, photo: "assets/img/shapes/princess.png", desc: "Cắt vuông nhiều mặt với các góc vuông vức, mang nét hiện đại." },
    { id: "cushion", label: "Cushion", available: false, photo: "assets/img/shapes/cushion.png", desc: "Dáng gối bo tròn các góc, nhiều mặt cắt tạo độ lấp lánh mềm mại." },
    { id: "square-cushion", label: "Cushion vuông", available: false, photo: "assets/img/shapes/square-cushion.png", desc: "Cushion dáng vuông, góc bo mềm, cân đối và dễ đặt trên răng cửa." },
    { id: "radiant", label: "Radiant", available: false, photo: "assets/img/shapes/radiant.png", desc: "Cắt radiant chữ nhật cắt góc, nhiều mặt cho độ lấp lánh mạnh." },
    { id: "square-radiant", label: "Radiant vuông", available: false, photo: "assets/img/shapes/square-radiant.png", desc: "Radiant dáng vuông cắt góc, kết hợp nét vuông vức và độ lấp lánh cao." },
  ],
  howToRead: [
    { label: "Measure (mm)", text: "Đường kính viên đá theo milimet." },
    { label: "Weight (ct) (5 pc)", text: "Tổng trọng lượng 5 viên trên cùng thẻ." },
    { label: "Clarity / Color", text: "Độ trong và màu: trong, không màu." },
    { label: "Mã thẻ C5xxxx", text: "Mã quản lý nội bộ của thẻ demo." },
    { label: "QR placeholder", text: "Vị trí QR giả, chưa có mã truy xuất thật." },
  ],
  // Quy trình tham khảo (RESEARCH.md mục 3). TODO: shop xác nhận thời gian, có bán dịch vụ gắn hay không.
  processTime: "Toàn bộ quy trình thường khoảng 10-20 phút (thông tin tham khảo, tùy từng trường hợp).",
  processWarning:
    "Quy trình nên do nha sĩ hoặc thợ có chuyên môn thực hiện. Không khuyến khích tự làm bằng keo dán thông thường vì có thể gây kích ứng nướu, hại men răng hoặc nhiễm trùng.",
  process: [
    { icon: "clean", title: "Làm sạch bề mặt răng", text: "Vệ sinh sạch mảng bám và làm khô răng tại vị trí muốn gắn." },
    { icon: "etch", title: "Xử lý bề mặt men", text: "Làm nhám nhẹ men răng theo kỹ thuật nha khoa để keo bám tốt hơn." },
    { icon: "glue", title: "Bôi keo/composite", text: "Bôi lớp keo hoặc composite nha khoa phù hợp lên vị trí gắn." },
    { icon: "place", title: "Đặt đá đúng vị trí", text: "Đặt viên đá lên vị trí đã chọn, chỉnh cho cân đối với răng." },
    { icon: "light", title: "Chiếu đèn UV", text: "Chiếu đèn UV khoảng 40 giây để keo đông cứng (thông tin tham khảo)." },
  ],
  aftercare: {
    title: "Chăm sóc sau khi gắn",
    items: [
      "Vệ sinh kỹ quanh viên đá mỗi ngày để tránh tích tụ mảng bám.",
      "Tránh cắn đồ quá cứng hoặc dai gần vị trí gắn.",
      "Nhờ nha sĩ hoặc thợ có chuyên môn tháo, không tự cậy bằng vật sắc nhọn.",
      "Nếu thấy đau, sưng nướu hoặc đá bong, nên đi khám nha sĩ.",
    ],
  },
  wholesale: {
    tiers: [
      { qty: "10-29 thẻ", price: "TODO: Liên hệ" },
      { qty: "30-99 thẻ", price: "TODO: Giá sỉ" },
      { qty: "100+ thẻ", price: "TODO: Đại lý" },
    ],
  },
  faq: [
    {
      q: "Có đau không?",
      a: "Thông tin tham khảo: khi do người có chuyên môn thực hiện đúng kỹ thuật, quy trình thường ít xâm lấn và không cần khoan hay gây tê.",
    },
    {
      q: "Có hại răng không?",
      a: "Rủi ro thấp hơn khi gắn và tháo đúng kỹ thuật. Vệ sinh kém, đá bong hoặc tháo sai cách có thể gây mảng bám, viêm nướu hoặc ảnh hưởng men răng.",
    },
    {
      q: "Giữ được bao lâu?",
      a: "Không vĩnh viễn. Thời gian giữ có thể từ vài tháng đến vài năm tùy keo, tay nghề, vị trí gắn và thói quen vệ sinh.",
    },
    {
      q: "Ăn uống được không?",
      a: "Thường vẫn sinh hoạt bình thường, nhưng nên tránh cắn đồ quá cứng hoặc dai gần vị trí gắn.",
    },
    {
      q: "Tháo thế nào?",
      a: "Nên nhờ nha sĩ hoặc thợ có chuyên môn tháo, không tự cậy bằng vật sắc nhọn.",
    },
    {
      q: "Có tự làm ở nhà được không?",
      a: "Không khuyến khích tự dùng keo dán móng hoặc keo thủ công vì có thể gây kích ứng nướu, hại men hoặc nhiễm trùng.",
    },
    {
      q: "Ai không nên gắn?",
      a: "Người có răng sâu, men yếu, viêm nướu hoặc vấn đề răng miệng nên khám và hỏi ý kiến nha sĩ trước.",
    },
  ],
  disclaimer:
    "Nếu bạn có vấn đề về răng miệng, hãy tham khảo ý kiến nha sĩ trước khi sử dụng.",
  demoNotice: "Bản demo - nội dung, giá và hình ảnh mang tính minh họa.",
};
