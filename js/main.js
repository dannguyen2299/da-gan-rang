(function () {
  "use strict";

  const data = window.shopData;
  if (!data) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const text = (value) => String(value ?? "");
  // Giá trị đánh dấu "TODO:" là dữ liệu chờ shop xác nhận, không hiện chữ TODO ra giao diện
  const clean = (value) => text(value).replace(/^TODO:\s*/i, "");

  const contactLinks = {
    zalo: `https://zalo.me/${data.shop.zalo}`,
    phone: `tel:${data.shop.phone}`,
    messenger: `https://m.me/${data.shop.messenger}`,
  };

  function zaloForSize(size) {
    const message = encodeURIComponent(`Mình muốn hỏi đá gắn răng size ${size} mm`);
    return `${contactLinks.zalo}?text=${message}`;
  }

  const poly = (pts, fill) =>
    `<polygon points="${pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ")}" fill="${fill}" stroke="#8fa2c2" stroke-width=".7" stroke-linejoin="round"/>`;

  // Viên đá cắt brilliant nhìn từ trên xuống, dựng từ các mặt cắt tam giác
  function facetGem() {
    const pt = (r, deg) => {
      const a = (deg * Math.PI) / 180;
      return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
    };
    const fills = ["#ffffff", "#dfe8f5", "#f4f8ff", "#c3d0e6", "#eef3fb", "#e9dff0", "#d4e4f2", "#b9c9e0"];
    let out = '<circle cx="50" cy="50" r="49" fill="#cfdaec"/>';
    for (let k = 0; k < 8; k++) {
      const t0 = pt(24, 22.5 + 45 * k);
      const t1 = pt(24, 22.5 + 45 * (k + 1));
      const m = pt(37, 45 + 45 * k);
      const mPrev = pt(37, 45 * k);
      const g0 = pt(49, 45 * k + 22.5 - 11.25);
      const g1 = pt(49, 45 * k + 22.5 + 11.25);
      const g2 = pt(49, 45 * k + 22.5 + 33.75);
      const gm = pt(49, 45 * k + 22.5);
      out += poly([t0, t1, m], fills[k % 8]);
      out += poly([t0, m, mPrev], fills[(k + 3) % 8]);
      out += poly([mPrev, m, gm], fills[(k + 5) % 8]);
      out += poly([m, g1, g2], fills[(k + 1) % 8]);
      out += poly([mPrev, g0, gm], fills[(k + 6) % 8]);
    }
    out += poly(Array.from({ length: 8 }, (_, k) => pt(24, 22.5 + 45 * k)), "url(#gem-table)");
    out += '<ellipse cx="41" cy="38" rx="9" ry="5" fill="#fff" opacity=".85" transform="rotate(-35 41 38)"/>';
    return out;
  }

  function svgDefs() {
    return `
      <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
        <defs>
          <symbol id="gem" viewBox="0 0 100 100">${facetGem()}</symbol>
          <linearGradient id="gem-table" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cad8ee"/></linearGradient>
          <linearGradient id="foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef1f6"/><stop offset=".5" stop-color="#c9d0dc"/><stop offset="1" stop-color="#e3e7ee"/></linearGradient>
          <radialGradient id="dome" cx=".35" cy=".28" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".35" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#9fb0cc" stop-opacity=".35"/></radialGradient>
        </defs>
      </svg>`;
  }

  function blisterSvg(size) {
    const d = Number(size) * 12;
    const centers = [[52, 41], [128, 41], [90, 75], [52, 109], [128, 109]];
    const domes = centers
      .map(([x, y]) => {
        const r = d / 2 + 5;
        return `
          <ellipse cx="${x + 2}" cy="${y + r * 0.85}" rx="${r * 0.8}" ry="${r * 0.22}" fill="#4d5f80" opacity=".28"/>
          <use href="#gem" x="${x - d / 2}" y="${y - d / 2}" width="${d}" height="${d}"/>
          <circle cx="${x}" cy="${y}" r="${r}" fill="url(#dome)" stroke="#7f92b3" stroke-width="1.2"/>
          <ellipse cx="${x - r * 0.35}" cy="${y - r * 0.5}" rx="${r * 0.32}" ry="${r * 0.16}" fill="#fff" opacity=".9" transform="rotate(-35 ${x - r * 0.35} ${y - r * 0.5})"/>`;
      })
      .join("");
    return `<svg viewBox="0 0 180 150" role="img" aria-hidden="true"><rect x="1" y="1" width="178" height="148" rx="16" fill="url(#foil)" stroke="#aab6c9"/>${domes}</svg>`;
  }

  function qr() {
    return Array.from({ length: 25 }, (_, index) => `<i class="${index % 3 === 0 || index === 6 ? "on" : ""}"></i>`).join("");
  }

  function specCard(spec, variant = "") {
    return `
      <article class="seal-card ${variant}" data-placeholder="css-pack-card" aria-label="Thẻ vỉ niêm phong 5 viên size ${spec.size}mm">
        <div class="seal-top">
          <strong>CZ ROUND WHITE</strong>
          <span>Niêm phong</span>
        </div>
        ${spec.photo ? `<figure class="pack-photo"><img src="${text(spec.photo)}" alt="Ảnh minh họa đá tròn trắng trong size ${spec.size}mm" loading="lazy" /></figure>` : `<div class="blister" aria-hidden="true">${blisterSvg(spec.size)}</div>`}
        <div class="spec-table">
          <div><span>Measure (mm)</span><b>${spec.size}</b></div>
          <div><span>Weight (ct) (5 pc)</span><b>${spec.weight}</b></div>
          <div><span>Clarity</span><b>${spec.clarity}</b></div>
          <div><span>Color</span><b>${spec.color}</b></div>
          <div><span>Comment</span><b>Flat Back / 5 pc</b></div>
        </div>
        <div class="seal-bottom">
          <span>C5${spec.size.replace(".", "")}8</span>
          <span>2026-09-29</span>
          <span class="qr" aria-label="QR placeholder">${qr()}</span>
        </div>
      </article>
    `;
  }

  function smileSvg() {
    const teeth = [
      [92, 96, 30, 44], [126, 88, 34, 54], [164, 82, 38, 62],
      [206, 82, 38, 62], [248, 88, 34, 54], [286, 96, 30, 44],
    ]
      .map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="url(#tooth)" stroke="#e2e8f2"/>`)
      .join("");
    return `
      <svg viewBox="0 0 400 240" role="img" aria-label="Minh họa nụ cười với một viên đá tròn trắng gắn trên răng cửa">
        <defs>
          <linearGradient id="tooth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#eaf0f8"/></linearGradient>
          <linearGradient id="lip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e58a93"/><stop offset="1" stop-color="#c9606f"/></linearGradient>
          <radialGradient id="gemfill" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#eef3fb"/><stop offset="1" stop-color="#b9c8e0"/></radialGradient>
        </defs>
        <path d="M20 118C70 40 330 40 380 118C330 205 70 205 20 118Z" fill="url(#lip)"/>
        <path d="M70 118C110 84 290 84 330 118C290 160 110 160 70 118Z" fill="#7a2432"/>
        <g>${teeth}</g>
        <g class="smile-gem">
          <circle cx="183" cy="116" r="11" fill="url(#gemfill)" stroke="#8496b4" stroke-width="1.5"/>
          <path d="M183 88v56M155 116h56M163 96l40 40M203 96l-40 40" stroke="#fff" stroke-width="1.4" opacity=".85"/>
        </g>
      </svg>`;
  }

  function gemSvg() {
    return `
      <svg viewBox="0 0 200 200" role="img" aria-label="Minh họa viên đá Cubic Zirconia cắt tròn nhiều mặt">
        <defs>
          <radialGradient id="gbig" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#e3ebf7"/><stop offset="1" stop-color="#aebdd6"/></radialGradient>
        </defs>
        <polygon points="100,8 156,26 192,72 192,128 156,174 100,192 44,174 8,128 8,72 44,26" fill="url(#gbig)" stroke="#9fb0cc" stroke-width="2"/>
        <polygon points="100,44 138,58 158,92 158,108 138,142 100,156 62,142 42,108 42,92 62,58" fill="#f8fbff" stroke="#b7c5dc"/>
        <g stroke="#b7c5dc" stroke-width="1.5" fill="none">
          <path d="M100 8v36M156 26l-18 32M192 72l-34 20M192 128l-34-20M156 174l-18-32M100 192v-36M44 174l18-32M8 128l34-20M8 72l34 20M44 26l18 32"/>
          <path d="M62 58l38 42 38-42M42 92l58 8 58-8M42 108l58-8 58 8M62 142l38-42 38 42"/>
        </g>
        <circle cx="100" cy="100" r="6" fill="#fff"/>
      </svg>`;
  }

  function galleryFigure(item) {
    const media = item.src
      ? `<img src="${text(item.src)}" alt="${text(item.alt)}" loading="lazy" />`
      : item.fallback === "smile" ? smileSvg() : gemSvg();
    return `<figure class="showcase-card">${media}<figcaption>${text(item.caption)}</figcaption></figure>`;
  }

  function icon(name) {
    const paths = {
      cut: "M12 2 3 8l9 14 9-14-9-6Zm0 3 3 3-3 10L9 8l3-3Z",
      base: "M4 15h16v3H4v-3Zm3-9h10l3 7H4l3-7Zm2 2-1.2 3h8.4L15 8H9Z",
      card: "M4 4h16v16H4V4Zm2 2v12h12V6H6Zm2 2h8v2H8V8Zm0 4h5v2H8v-2Z",
      size: "M5 18h14v2H5v-2Zm1-3 9-9 3 3-9 9H6v-3Zm10.4-7.6L8 15.8V16h.2l8.4-8.4-.2-.2Z",
      clean: "M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Zm0 4.2C13.6 8.6 17 12.4 17 15a5 5 0 0 1-10 0c0-2.6 3.4-6.4 5-8.8Z",
      etch: "M3 7c3-3 6 3 9 0s6 3 9 0v3c-3 3-6-3-9 0S6 13 3 10V7Zm0 7c3-3 6 3 9 0s6 3 9 0v3c-3 3-6-3-9 0S6 20 3 17v-3Z",
      glue: "M9 2h6v3l2 3v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8l2-3V2Zm2 2v1h2V4h-2ZM9 10v9h6v-9H9Z",
      place: "M12 2 3 8l9 14 9-14-9-6Z",
      light: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-1-5h2v3h-2V2Zm0 17h2v3h-2v-3ZM2 11h3v2H2v-2Zm17 0h3v2h-3v-2Z",
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name] || paths.cut}"/></svg>`;
  }

  function render() {
    document.body.insertAdjacentHTML("afterbegin", svgDefs());
    $$('[data-render="shop-name"], [data-render="footer-name"]').forEach((el) => {
      el.textContent = data.shop.name;
    });
    $('[data-render="hero-title"]').textContent = data.shop.tagline;
    $('[data-render="hero-description"]').textContent = data.shop.description;
    $('[data-render="badges"]').innerHTML = data.badges.map((badge) => `<span>${text(badge)}</span>`).join("");
    $('[data-render="hero-card"]').innerHTML = specCard(data.specs[1], "hero-pack");

    $('[data-render="benefits"]').innerHTML = data.benefits
      .map(
        (item) => `
          <article class="benefit-card">
            <div class="icon-bubble">${icon(item.icon)}</div>
            <h3>${text(item.title)}</h3>
            <p>${text(item.text)}</p>
          </article>`
      )
      .join("");

    $('[data-render="showcase-eyebrow"]').textContent = data.showcase.eyebrow;
    $('[data-render="showcase-title"]').textContent = data.showcase.title;
    $('[data-render="showcase-text"]').textContent = data.showcase.text;
    $('[data-render="showcase"]').innerHTML = data.gallery.map(galleryFigure).join("");
    const pp = data.processPhoto;
    $('[data-render="process-photo"]').innerHTML = pp
      ? `<img src="${text(pp.src)}" alt="${text(pp.alt)}" loading="lazy" />`
      : "";

    $('[data-render="shape-icons"]').innerHTML = data.shapes
      .map(
        (shape, index) => `
          <button type="button" class="shape-icon" role="radio" aria-checked="${index === 0}" data-shape="${shape.id}" aria-label="${text(shape.label)}" title="${text(shape.label)}">
            <img src="${text(shape.photo)}" alt="" loading="lazy" />
          </button>`
      )
      .join("");
    $('[data-render="shapes-note"]').textContent = data.shapesNote;
    $('[data-shape-size]').innerHTML = data.specs
      .map((spec) => `<option value="${text(spec.size)}">${text(spec.size)} mm (${text(spec.weight)} ct / 5 viên)</option>`)
      .join("");

    $('[data-render="products"]').innerHTML = data.specs
      .map(
        (spec) => `
          <article class="product-card">
            ${specCard(spec)}
            <div class="product-info">
              <p class="material">Cubic Zirconia (kim cương nhân tạo)</p>
              <h3>Đá gắn răng Cubic Zirconia - thẻ 5 viên - size ${spec.size}mm</h3>
              <p class="price">${spec.price ? `${clean(spec.price)} <small>(giá minh họa)</small>` : "Liên hệ báo giá"}</p>
              <a class="btn btn-secondary" href="${zaloForSize(spec.size)}" data-track="product_zalo_${spec.size}">Hỏi mua size này</a>
            </div>
          </article>`
      )
      .join("");

    $('[data-render="tooth-options"]').innerHTML = data.sizeAdvisor.teeth
      .map(
        (item, index) => `
          <label>
            <input type="radio" name="tooth" value="${item.value}" ${index === 0 ? "checked" : ""} />
            <span>${text(item.label)}</span>
          </label>`
      )
      .join("");

    $('[data-render="style-options"]').innerHTML = data.sizeAdvisor.styles
      .map(
        (item, index) => `
          <label>
            <input type="radio" name="style" value="${item.value}" ${index === 1 ? "checked" : ""} />
            <span>${text(item.label)}</span>
          </label>`
      )
      .join("");
    $('[data-render="ticks"]').innerHTML = data.specs
      .map((spec, index) => `<button type="button" data-tick="${index}" aria-label="Xem size ${text(spec.size)} mm">${text(spec.size)}</button>`)
      .join("");
    $('[data-render="size-note"]').textContent = data.sizeAdvisor.note;
    $('[data-render="scale-note"]').textContent = data.sizeAdvisor.scaleNote;
    $('[data-render="privacy-note"]').textContent = data.sizeAdvisor.privacyNote;

    $('[data-render="spec-card"]').innerHTML = specCard(data.specs[2], "large-card");
    $('[data-render="read-card"]').innerHTML = data.howToRead
      .map((item) => `<article><h3>${text(item.label)}</h3><p>${text(item.text)}</p></article>`)
      .join("");

    $('[data-render="process-time"]').textContent = data.processTime;
    $('[data-render="process-warning"]').textContent = data.processWarning;
    $('[data-render="process"]').innerHTML = data.process
      .map(
        (step, index) => `
          <li class="step-item">
            <span class="step-num">${String(index + 1).padStart(2, "0")}</span>
            <div class="step-icon">${icon(step.icon)}</div>
            <div>
              <h3>${text(step.title)}</h3>
              <p>${text(step.text)}</p>
            </div>
          </li>`
      )
      .join("");
    $('[data-render="aftercare-title"]').textContent = data.aftercare.title;
    $('[data-render="aftercare"]').innerHTML = data.aftercare.items.map((item) => `<li>${text(item)}</li>`).join("");

    $('[data-render="tiers"]').innerHTML = data.wholesale.tiers
      .map((tier) => `<article class="tier-card"><h3>${text(tier.qty)}</h3><p>${clean(tier.price)}</p></article>`)
      .join("");

    $('[data-render="faq"]').innerHTML = data.faq
      .map(
        (item) => `
          <details>
            <summary>${text(item.q)}</summary>
            <p>${text(item.a)}</p>
          </details>`
      )
      .join("");

    $('[data-render="contact"]').innerHTML = `
      <div><dt>Số điện thoại</dt><dd><a href="${contactLinks.phone}">${text(data.shop.phone)}</a></dd></div>
      <div><dt>Zalo</dt><dd><a href="${contactLinks.zalo}">${text(data.shop.zalo)}</a></dd></div>
      <div><dt>Messenger</dt><dd><a href="${contactLinks.messenger}">m.me/${text(data.shop.messenger)}</a></dd></div>
      <div><dt>Địa chỉ</dt><dd>${clean(data.shop.address)}</dd></div>
      <div><dt>Giờ làm việc</dt><dd>${clean(data.shop.hours)}</dd></div>`;

    $('[data-render="disclaimer"]').textContent = data.disclaimer;
    $('[data-render="demo-notice"]').textContent = data.demoNotice;

    $$("[data-contact]").forEach((link) => {
      link.href = contactLinks[link.dataset.contact] || "#";
    });
    $$("[data-social]").forEach((link) => {
      link.href = data.shop[link.dataset.social] || "#";
    });

    $("#schema-json").textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: data.shop.name,
      description: data.shop.description,
      telephone: data.shop.phone,
      address: data.shop.address,
      makesOffer: data.specs.map((spec) => ({
        "@type": "Offer",
        name: `Đá gắn răng Cubic Zirconia thẻ 5 viên size ${spec.size}mm`,
        description: `${spec.weight}ct / 5 pc, ${spec.clarity}, ${spec.color}`,
      })),
    });
  }

  function bindMenu() {
    const toggle = $(".menu-toggle");
    const nav = $(".site-nav");
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      document.body.classList.toggle("nav-open", !isOpen);
    });
    nav.addEventListener("click", (event) => {
      if (!event.target.matches("a")) return;
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  }

  let currentShape = "round";

  function bindShapes() {
    const icons = $$(".shape-icon");
    const stage = $("[data-shape-stage]");
    const title = $("[data-shape-title]");
    const badge = $("[data-shape-badge]");
    const desc = $("[data-shape-desc]");
    const sizeSelect = $("[data-shape-size]");
    const cta = $("[data-shape-cta]");
    let current = data.shapes[0];

    function update() {
      stage.src = current.photo;
      stage.alt = `Ảnh thật viên đá kiểu ${current.label}`;
      title.textContent = `Đá ${current.label}`;
      badge.textContent = current.available ? "Đang có" : "Tham khảo, hỏi shop";
      badge.classList.toggle("is-ref", !current.available);
      desc.textContent = current.desc;
      const message = encodeURIComponent(
        `Mình muốn hỏi đá gắn răng kiểu ${current.label} size ${sizeSelect.value} mm`
      );
      cta.href = `${contactLinks.zalo}?text=${message}`;
      icons.forEach((btn) => btn.setAttribute("aria-checked", String(btn.dataset.shape === current.id)));
      currentShape = current.id;
      document.dispatchEvent(new CustomEvent("shapechange"));
    }

    icons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        current = data.shapes.find((shape) => shape.id === btn.dataset.shape) || current;
        update();
      });
      btn.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        const next = icons[(index + (event.key === "ArrowRight" ? 1 : icons.length - 1)) % icons.length];
        next.focus();
        next.click();
      });
    });
    sizeSelect.addEventListener("change", update);
    update();
  }

  function bindSizeTool() {
    const adv = data.sizeAdvisor;
    const form = $("[data-size-tool]");
    const slider = $("[data-size-slider]");
    const current = $("[data-size-current]");
    const result = $("[data-size-result]");
    const reason = $("[data-size-reason]");
    const stage = $("[data-smile-stage]");
    const photo = $("[data-smile-photo]");
    const gem = $("[data-size-gem]");
    const cta = $("[data-size-cta]");
    const compare = $('[data-render="compare"]');
    const ticks = $$("[data-tick]");
    const upload = $("[data-upload]");
    const resetBtn = $("[data-upload-reset]");
    const scaleBox = $("[data-scale-box]");
    const scaleInput = $("[data-scale]");
    const state = { x: 50, y: 55, scale: 1, custom: false, objectUrl: null };
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const gemSrc = (id) => `assets/img/shapes/${id}.png`;

    const toothConfig = () => adv.teeth.find((item) => item.value === form.elements.tooth.value) || adv.teeth[0];
    const styleConfig = () => adv.styles.find((item) => item.value === form.elements.style.value) || adv.styles[0];

    function renderCompare() {
      const items = data.specs
        .map(
          (spec, index) => `
            <button type="button" class="compare-item" data-compare="${index}" aria-label="Xem size ${text(spec.size)} mm">
              <img src="${gemSrc(currentShape)}" alt="" style="width:${(Number(spec.size) * adv.pxPerMm).toFixed(1)}px" />
              <span>${text(spec.size)} mm</span>
            </button>`
        )
        .join("");
      compare.innerHTML = `<div class="compare-tooth" style="width:${(adv.incisorMm * adv.pxPerMm).toFixed(0)}px">Răng cửa ≈ ${adv.incisorMm} mm</div>${items}`;
    }

    function update() {
      const index = Number(slider.value);
      const spec = data.specs[index] || data.specs[0];
      const tooth = toothConfig();
      const style = styleConfig();
      const recommended = tooth[style.value];
      const shape = data.shapes.find((item) => item.id === currentShape) || data.shapes[0];

      current.textContent = spec.size;
      result.textContent = `${spec.size} mm`;
      reason.textContent =
        spec.size === recommended
          ? `${tooth.label}, ${style.label.toLowerCase()}: nên chọn ${recommended} mm. ${tooth.note}`
          : `Đang xem size ${spec.size} mm. Gợi ý cho ${tooth.label.toLowerCase()}, ${style.label.toLowerCase()} là ${recommended} mm.`;

      gem.style.left = `${state.x}%`;
      gem.style.top = `${state.y}%`;
      gem.style.width = `${(Number(spec.size) * adv.pctPerMm * state.scale).toFixed(2)}%`;

      ticks.forEach((tick) => tick.setAttribute("aria-pressed", String(Number(tick.dataset.tick) === index)));
      $$("[data-compare]").forEach((item) => item.classList.toggle("is-active", Number(item.dataset.compare) === index));

      const message = encodeURIComponent(
        `Mình muốn hỏi đá gắn răng kiểu ${shape.label} size ${spec.size} mm (gắn ${tooth.label.toLowerCase()})`
      );
      cta.href = `${contactLinks.zalo}?text=${message}`;
    }

    function applyChoice() {
      const tooth = toothConfig();
      const recommended = tooth[styleConfig().value];
      slider.value = Math.max(0, data.specs.findIndex((spec) => spec.size === recommended));
      if (!state.custom) {
        state.x = tooth.x;
        state.y = tooth.y;
      }
      update();
    }

    function pick(index) {
      slider.value = index;
      update();
    }

    form.addEventListener("change", (event) => {
      if (event.target.matches('input[type="radio"]')) applyChoice();
    });
    slider.addEventListener("input", update);
    document.addEventListener("click", (event) => {
      const target = event.target.closest("[data-tick], [data-compare]");
      if (target) pick(Number(target.dataset.tick ?? target.dataset.compare));
    });
    document.addEventListener("shapechange", () => {
      gem.src = gemSrc(currentShape);
      renderCompare();
      update();
    });

    // Kéo viên đá bằng chuột/cảm ứng, hoặc dùng phím mũi tên
    let dragId = null;
    gem.addEventListener("pointerdown", (event) => {
      dragId = event.pointerId;
      gem.setPointerCapture(dragId);
      gem.classList.add("is-drag");
      event.preventDefault();
    });
    gem.addEventListener("pointermove", (event) => {
      if (dragId !== event.pointerId) return;
      const rect = stage.getBoundingClientRect();
      state.x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
      state.y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
      update();
    });
    const endDrag = () => {
      dragId = null;
      gem.classList.remove("is-drag");
    };
    gem.addEventListener("pointerup", endDrag);
    gem.addEventListener("pointercancel", endDrag);
    gem.addEventListener("keydown", (event) => {
      const step = event.shiftKey ? 2 : 0.5;
      const move = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
      if (!move) return;
      event.preventDefault();
      state.x = clamp(state.x + move[0], 0, 100);
      state.y = clamp(state.y + move[1], 0, 100);
      update();
    });

    // Thử trên ảnh của khách: chỉ xử lý trong trình duyệt
    function useSamplePhoto() {
      if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
      state.objectUrl = null;
      state.custom = false;
      state.scale = 1;
      scaleInput.value = "1";
      photo.src = adv.photo;
      photo.alt = "Ảnh mẫu hàng răng cười";
      stage.classList.remove("is-custom");
      scaleBox.hidden = true;
      resetBtn.hidden = true;
      upload.value = "";
      applyChoice();
    }

    upload.addEventListener("change", () => {
      const file = upload.files && upload.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/") || file.size > 15 * 1024 * 1024) {
        reason.textContent = "Vui lòng chọn file ảnh (JPG, PNG) dưới 15MB.";
        upload.value = "";
        return;
      }
      if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
      state.objectUrl = URL.createObjectURL(file);
      state.custom = true;
      state.x = 50;
      state.y = 50;
      state.scale = 1;
      scaleInput.value = "1";
      photo.src = state.objectUrl;
      photo.alt = "Ảnh của bạn";
      stage.classList.add("is-custom");
      scaleBox.hidden = false;
      resetBtn.hidden = false;
      update();
      reason.textContent = "Kéo viên đá đến răng bạn muốn gắn, chỉnh tỷ lệ cho khớp với ảnh.";
    });
    resetBtn.addEventListener("click", useSamplePhoto);
    scaleInput.addEventListener("input", () => {
      state.scale = Number(scaleInput.value);
      update();
    });

    renderCompare();
    applyChoice();
  }

  function bindDealerForm() {
    const form = $("[data-dealer-form]");
    const message = $("[data-form-message]");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      message.textContent = "Cảm ơn bạn. Đây là form demo, thông tin chưa được gửi đi đâu.";
      form.reset();
    });
  }

  try {
    render();
    bindMenu();
    bindShapes();
    bindSizeTool();
    bindDealerForm();
  } catch (error) {
    console.error("Không thể khởi tạo trang demo:", error);
  }
})();
