function toPercent(value) {
  if (value === undefined || value === null || value === "") return null;
  const number = Number(value);
  if (Number.isNaN(number)) return null;
  return Number((number <= 1 ? number * 100 : number).toFixed(2));
}

function formatPercent(value) {
  const percent = toPercent(value);
  return percent === null ? "-" : `${percent}%`;
}

function safe(value) {
  return value === undefined || value === null || value === "" ? "-" : value;
}

function safeFileName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeHtml(value) {
  return String(safe(value))
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function matchValue(item, metadataKey, itemKey = metadataKey) {
  return item?.metadata?.[metadataKey] || item?.[itemKey] || "-";
}

function matchTitle(item) {
  return (
    item?.metadata?.title ||
    item?.metadata?.["Judul KI"] ||
    item?.title ||
    item?.judul ||
    "Tanpa judul"
  );
}

function imageUrl(item) {
  return (
    item?.metadata?.image_url ||
    item?.metadata?.imageUrl ||
    item?.image_url ||
    item?.imageUrl ||
    ""
  );
}

function sourceUrl(item) {
  return item?.source_url || item?.sourceUrl || imageUrl(item) || "-";
}

function summarizeRegistration(value) {
  if (value === true) return "Ya";
  if (value === false) return "Tidak";
  return "-";
}

function renderInfoRows(rows) {
  return rows
    .map(
      ([label, value]) => `
        <div class="info-row">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `
    )
    .join("");
}

function renderMetric(label, value, tone = "") {
  return `
    <div class="metric ${tone}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function getRiskToneClass(riskLevel) {
  switch (String(riskLevel || "").toLowerCase()) {
    case "high":
      return "risk-high";
    case "medium":
      return "risk-medium";
    case "low":
      return "risk-low";
    case "very_low":
      return "risk-very-low";
    default:
      return "risk-unknown";
  }
}

function renderMatchRows(items) {
  if (!items?.length) {
    return `
      <tr>
        <td colspan="7" class="empty">Tidak ada hasil.</td>
      </tr>
    `;
  }

  return items
    .map((item, index) => {
      const thumb = imageUrl(item);
      return `
        <tr>
          <td>${index + 1}</td>
          <td>
            ${
              thumb
                ? `<img class="thumb" src="${escapeAttr(thumb)}" alt="Preview ${escapeAttr(
                    matchTitle(item)
                  )}" />`
                : "-"
            }
          </td>
          <td>
            <strong>${escapeHtml(matchTitle(item))}</strong>
            <small>${escapeHtml(matchValue(item, "description"))}</small>
          </td>
          <td>${escapeHtml(safe(item.source))}</td>
          <td>${formatPercent(item.final_score)}</td>
          <td>${formatPercent(item.clip_score)}</td>
          <td>${formatPercent(item.cnn_score)}</td>
        </tr>
        <tr class="url-row">
          <td></td>
          <td colspan="6">
            <span>Image:</span> ${escapeHtml(imageUrl(item) || "-")}<br />
            <span>Source:</span> ${escapeHtml(sourceUrl(item))}
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderMatchTable(title, items) {
  return `
    <section>
      <h2>${escapeHtml(title)}</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Preview</th>
            <th>Judul / Deskripsi</th>
            <th>Sumber</th>
            <th>Skor Akhir</th>
            <th>Konteks Visual</th>
            <th>Detail Visual</th>
          </tr>
        </thead>
        <tbody>${renderMatchRows(items)}</tbody>
      </table>
    </section>
  `;
}

function renderWebSearch(result) {
  const webSearch = result?.web_search_result || {};
  const matches = webSearch.matches || [];

  if (!matches.length) {
    return `
      <section>
        <h2>Hasil Pencarian Web</h2>
        <p class="empty-box">Tidak ada hasil pencarian web.</p>
      </section>
    `;
  }

  return `
    <section>
      <h2>Hasil Pencarian Web</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Image URL</th>
            <th>Source URL</th>
          </tr>
        </thead>
        <tbody>
          ${matches
            .map(
              (item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${escapeHtml(item.title)}</td>
                  <td>${escapeHtml(item.image_url)}</td>
                  <td>${escapeHtml(item.source_url)}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}

function buildReportHtml({
  result,
  resultPercent,
  threshold,
  fileName,
  imageUrl: uploadedImageUrl,
  metadata,
  mode,
  reportTitle,
}) {
  const similarity = result?.similarity_result || {};
  const summary = similarity.summary || {};
  const decision = result?.decision_result?.decision || {};
  const best = similarity.best_match || {};
  const groups = similarity.results || {};
  const riskToneClass = getRiskToneClass(decision.risk_level);
  const percent = resultPercent ?? toPercent(similarity.overall_score);
  const reportThreshold = threshold ?? result?.threshold ?? similarity.threshold;
  const previewUrl =
    uploadedImageUrl ||
    metadata?.image_url ||
    metadata?.imageUrl ||
    result?.image_url ||
    result?.uploaded_image_url ||
    imageUrl(best);
  const title =
    reportTitle ||
    (mode === "registered"
      ? "Laporan Pemeriksaan Kemiripan Gambar"
      : "Laporan Pemeriksaan Awal Kemiripan Gambar");
  const generatedAt = new Date().toLocaleString("id-ID");
  const suffix =
    safeFileName(fileName) ||
    safeFileName(metadata?.title) ||
    safeFileName(result?.check_id) ||
    new Date().toISOString().replaceAll(":", "-").slice(0, 19);

  const workRows = metadata
    ? [
        ["Judul", metadata.title || metadata["Judul KI"]],
        ["Deskripsi", metadata.description],
        ["Kategori", metadata.category],
        ["Sub Kategori", metadata.sub_category],
        ["Kategori Hak Cipta", metadata.copyright_category],
        ["Sub Kategori Hak Cipta", metadata.copyright_sub_category],
        ["Metadata ID", metadata.id],
      ]
    : [
        ["Check ID", result?.check_id],
        ["Status Proses", result?.status],
        ["Status Registrasi", result?.registration_status],
        ["Dapat Register", summarizeRegistration(result?.can_register)],
        ["Alasan", result?.registration_reason],
      ];

  return `<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>similarity-report-${escapeHtml(suffix)}</title>
    <style>
      @page {
        size: A4;
        margin: 14mm;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #eef2f7;
        color: #1f2937;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.5;
      }

      .toolbar {
        align-items: center;
        background: #111827;
        color: #fff;
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        padding: 12px 20px;
        position: sticky;
        top: 0;
        z-index: 5;
      }

      .toolbar button {
        background: #2563eb;
        border: 0;
        border-radius: 6px;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        font-weight: 700;
        padding: 9px 14px;
      }

      .page {
        background: #fff;
        box-shadow: 0 12px 35px rgba(15, 23, 42, 0.16);
        margin: 24px auto;
        max-width: 920px;
        padding: 32px;
      }

      header {
        border-bottom: 3px solid #ef4444;
        display: flex;
        gap: 24px;
        justify-content: space-between;
        padding-bottom: 18px;
      }

      h1 {
        font-size: 24px;
        margin: 0 0 8px;
      }

      h2 {
        color: #111827;
        font-size: 16px;
        margin: 26px 0 10px;
      }

      .eyebrow {
        color: #ef4444;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        margin-bottom: 4px;
        text-transform: uppercase;
      }

      .generated {
        color: #6b7280;
        font-size: 12px;
        text-align: right;
      }

      .notice {
        background: #fff7ed;
        border: 1px solid #fed7aa;
        border-radius: 8px;
        color: #9a3412;
        margin: 18px 0;
        padding: 12px 14px;
      }

      .top-grid {
        display: grid;
        gap: 20px;
        grid-template-columns: 290px 1fr;
      }

      .preview {
        align-items: center;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        display: flex;
        min-height: 220px;
        justify-content: center;
        overflow: hidden;
        padding: 10px;
      }

      .preview img {
        max-height: 270px;
        max-width: 100%;
        object-fit: contain;
      }

      .info-card {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        overflow: hidden;
      }

      .info-row {
        display: grid;
        gap: 12px;
        grid-template-columns: 170px 1fr;
        padding: 9px 12px;
      }

      .info-row:nth-child(odd) {
        background: #f9fafb;
      }

      .info-row span {
        color: #6b7280;
      }

      .metrics {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(4, 1fr);
        margin-top: 18px;
      }

      .metric {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 12px;
      }

      .metric span {
        color: #6b7280;
        display: block;
        font-size: 12px;
      }

      .metric strong {
        display: block;
        font-size: 18px;
        margin-top: 4px;
      }

      .metric.primary strong {
        font-size: 24px;
      }

      .metric.primary.risk-high strong {
        color: #dc2626;
      }

      .metric.primary.risk-medium strong {
        color: #f97316;
      }

      .metric.primary.risk-low strong {
        color: #ca8a04;
      }

      .metric.primary.risk-very-low strong {
        color: #16a34a;
      }

      .metric.primary.risk-unknown strong {
        color: #374151;
      }

      .decision {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        margin-top: 16px;
        padding: 14px;
      }

      .decision strong {
        display: inline-block;
        margin-right: 8px;
      }

      table {
        border-collapse: collapse;
        page-break-inside: auto;
        table-layout: fixed;
        width: 100%;
      }

      th,
      td {
        border: 1px solid #e5e7eb;
        font-size: 11px;
        padding: 8px;
        text-align: left;
        vertical-align: top;
        word-break: break-word;
      }

      th {
        background: #f3f4f6;
        color: #374151;
        font-size: 10px;
        text-transform: uppercase;
      }

      tr {
        page-break-inside: avoid;
      }

      small {
        color: #6b7280;
        display: block;
        margin-top: 3px;
      }

      .thumb {
        border-radius: 6px;
        display: block;
        height: 46px;
        object-fit: cover;
        width: 58px;
      }

      .url-row td {
        background: #fcfcfd;
        color: #6b7280;
      }

      .url-row span {
        color: #374151;
        font-weight: 700;
      }

      .empty,
      .empty-box {
        color: #6b7280;
        font-style: italic;
      }

      @media print {
        body {
          background: #fff;
        }

        .toolbar {
          display: none;
        }

        .page {
          box-shadow: none;
          margin: 0;
          max-width: none;
          padding: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="toolbar">
      <span>Gunakan dialog print browser untuk menyimpan report sebagai PDF.</span>
      <button type="button" onclick="window.print()">Simpan sebagai PDF</button>
    </div>

    <main class="page">
      <header>
        <div>
          <div class="eyebrow">Similarity Report</div>
          <h1>${escapeHtml(title)}</h1>
          <div>${escapeHtml(
            mode === "registered"
              ? "Laporan tersimpan pada metadata karya."
              : "Laporan pemeriksaan awal sebelum metadata diregistrasikan."
          )}</div>
        </div>
        <div class="generated">
          Dibuat<br />
          <strong>${escapeHtml(generatedAt)}</strong>
        </div>
      </header>

      <div class="notice">
        ${escapeHtml(
          result?.registration_reason ||
            "Gunakan laporan ini sebagai bukti pendukung hasil pemeriksaan kemiripan."
        )}
      </div>

      <section class="top-grid">
        <div>
          <h2>Preview Karya</h2>
          <div class="preview">
            ${
              previewUrl
                ? `<img src="${escapeAttr(previewUrl)}" alt="Preview karya yang diperiksa" />`
                : `<span class="empty">Preview gambar tidak tersedia.</span>`
            }
          </div>
        </div>
        <div>
          <h2>Informasi Karya</h2>
          <div class="info-card">${renderInfoRows(workRows)}</div>
        </div>
      </section>

      <section>
        <h2>Ringkasan Hasil</h2>
        <div class="metrics">
          ${renderMetric("Skor Kemiripan", percent === null ? "-" : `${percent}%`, `primary ${riskToneClass}`)}
          ${renderMetric("Threshold", reportThreshold === undefined ? "-" : formatPercent(reportThreshold))}
          ${renderMetric("Best Source", similarity.best_source || "-")}
          ${renderMetric("Risk Level", decision.risk_level || "-")}
          ${renderMetric("Best Internal", formatPercent(summary.best_internal_score))}
          ${renderMetric("Best External", formatPercent(summary.best_external_score))}
          ${renderMetric("Total Internal", summary.internal_total ?? "-")}
          ${renderMetric("Total External", summary.external_total ?? "-")}
        </div>
        <div class="decision">
          <strong>Keputusan Sistem:</strong>${escapeHtml(decision.status || "-")}<br />
          <strong>Review Manual:</strong>${decision.requires_review ? "Ya" : "Tidak"}<br />
          <strong>Alasan:</strong>${escapeHtml(decision.reason || "-")}
        </div>
      </section>

      ${renderMatchTable("Best Match", best ? [best] : [])}
      ${renderMatchTable("Top 3 Internal", groups.internal_top3 || [])}
      ${renderMatchTable("Top 3 External", groups.external_top3 || [])}
      ${renderMatchTable("Top 3 Gabungan", groups.combined_top3 || [])}
      ${renderWebSearch(result)}
    </main>

    <script>
      window.addEventListener("load", () => {
        setTimeout(() => window.print(), 350);
      });
    </script>
  </body>
</html>`;
}

export function downloadSimilarityReport(options) {
  if (!options?.result) return;

  const reportWindow = window.open("", "_blank", "width=920,height=1000");
  if (!reportWindow) {
    window.alert("Popup diblokir browser. Izinkan popup untuk membuka report PDF.");
    return;
  }

  reportWindow.document.open();
  reportWindow.document.write(buildReportHtml(options));
  reportWindow.document.close();
  reportWindow.focus();
}
