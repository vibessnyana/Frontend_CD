const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getErrorMessage(error, fallback, status) {
  if (status >= 500) {
    return "Layanan sedang bermasalah. Silakan coba beberapa saat lagi.";
  }

  if (!error) return fallback;

  if (typeof error.detail === "string") return error.detail;

  if (Array.isArray(error.detail)) {
    return error.detail
      .map((item) => item.msg)
      .filter(Boolean)
      .join(", ");
  }

  if (error.detail?.message) return error.detail.message;

  if (error.message) return error.message;

  return fallback;
}

async function throwRequestError(response, fallback) {
  const error = await response.json().catch(() => null);
  throw new Error(getErrorMessage(error, fallback, response.status));
}

function getMetadataArray(result) {
  if (Array.isArray(result)) {
    if (result.length === 1 && typeof result[0] === "object") {
      const firstItem = result[0];

      if (Array.isArray(firstItem.data)) return firstItem.data;
      if (Array.isArray(firstItem.items)) return firstItem.items;
      if (Array.isArray(firstItem.metadata)) return firstItem.metadata;
      if (Array.isArray(firstItem.results)) return firstItem.results;
      if (Array.isArray(firstItem.records)) return firstItem.records;
      if (Array.isArray(firstItem.payload)) return firstItem.payload;

      if (Array.isArray(firstItem.payload?.data)) return firstItem.payload.data;
      if (Array.isArray(firstItem.payload?.items)) return firstItem.payload.items;
      if (Array.isArray(firstItem.payload?.metadata)) return firstItem.payload.metadata;
      if (Array.isArray(firstItem.payload?.results)) return firstItem.payload.results;
      if (Array.isArray(firstItem.payload?.records)) return firstItem.payload.records;
    }

    return result;
    
  }
  const candidates = [
    result?.data,
    result?.items,
    result?.metadata,
    result?.results,
    result?.records,
    result?.payload,

    result?.data?.data,
    result?.data?.items,
    result?.data?.metadata,
    result?.data?.results,
    result?.data?.records,

    result?.payload?.data,
    result?.payload?.items,
    result?.payload?.metadata,
    result?.payload?.results,
    result?.payload?.records,
  ];

  const found = candidates.find((item) => Array.isArray(item));

  return found || [];
}

function getMetadataObject(result) {
  if (!result) return null;

  if (Array.isArray(result)) {
    return result[0] || null;
  }

  if (result.data && !Array.isArray(result.data)) return result.data;
  if (result.metadata && !Array.isArray(result.metadata)) return result.metadata;
  if (result.item && !Array.isArray(result.item)) return result.item;
  if (result.result && !Array.isArray(result.result)) return result.result;
  if (result.payload && !Array.isArray(result.payload)) return result.payload;

  return result;
}

function normalizeMetadata(item, index = 0) {
  return {
    ...item,

    _id: String(
      item._id ??
        item.id ??
        item.metadata_id ??
        item.metadataId ??
        item.ki_id ??
        item.ki_uuid ??
        index
    ),

    No: item.No ?? item.no ?? index + 1,

    check_id: item.check_id ?? "",

    ki_id:
      item.ki_id ??
      item.kiId ??
      item.id_ki ??
      item.idKI ??
      "",

    ki_uuid:
      item.ki_uuid ??
      item.kiUuid ??
      item.uuid ??
      "",

    "Judul KI":
      item["Judul KI"] ??
      item.judul_ki ??
      item.judulKI ??
      item.judul ??
      item.title ??
      item.nama_karya ??
      item.namaKarya ??
      item.nama ??
      "",

    Deskripsi:
      item.Deskripsi ??
      item.deskripsi ??
      item.description ??
      item.keterangan ??
      "",

    Kategori:
      item.Kategori ??
      item.kategori ??
      item.category ??
      item.jenis_karya ??
      item.jenisKarya ??
      item.jenis ??
      "",

    "Sub Kategori":
      item["Sub Kategori"] ??
      item.sub_kategori ??
      item.subKategori ??
      item.sub_category ??
      item.subcategory ??
      item.kategori_karya ??
      item.kategoriKarya ??
      "",

    "Kategori HC":
      item["Kategori HC"] ??
      item.kategori_hc ??
      item.kategoriHC ??
      item.hc_category ??
      item.copyright_category ??
      "",

    "Sub Kategori HC":
      item["Sub Kategori HC"] ??
      item.sub_kategori_hc ??
      item.subKategoriHC ??
      item.sub_hc_category ??
      item.copyright_sub_category ??
      "",

    image_url:
      item.image_url ??
      item.imageUrl ??
      item.image ??
      item.gambar ??
      "",

    cloudinary_public_id:
      item.cloudinary_public_id ??
      item.cloudinaryPublicId ??
      "",

    report: item.report ?? null,
    report_saved_at: item.report_saved_at ?? null,
  };
}

function normalizeReportResponse(result, fallbackMetadata = null) {
  const reportObject = getMetadataObject(result);

  if (!reportObject) return fallbackMetadata;

  return {
    ...(fallbackMetadata || {}),
    ...reportObject,
    _id: String(
      reportObject._id ??
        reportObject.id ??
        reportObject.metadata_id ??
        fallbackMetadata?._id ??
        ""
    ),
    check_id: reportObject.check_id ?? fallbackMetadata?.check_id ?? "",
    title:
      reportObject.title ??
      reportObject["Judul KI"] ??
      fallbackMetadata?.["Judul KI"] ??
      "",
    image_url:
      reportObject.image_url ??
      fallbackMetadata?.image_url ??
      "",
    report: reportObject.report ?? null,
    report_saved_at:
      reportObject.report_saved_at ??
      fallbackMetadata?.report_saved_at ??
      null,
  };
}

function toBackendPayload(data) {
  return {
    title:
      data["Judul KI"] ??
      data.title ??
      "",

    description:
      data.Deskripsi ??
      data.description ??
      "",

    category:
      data.Kategori ??
      data.category ??
      "",

    sub_category:
      data["Sub Kategori"] ??
      data.sub_category ??
      "",

    copyright_category:
      data["Kategori HC"] ??
      data.copyright_category ??
      "",

    copyright_sub_category:
      data["Sub Kategori HC"] ??
      data.copyright_sub_category ??
      "",

    image_url:
      data.image_url ??
      "",

    cloudinary_public_id:
      data.cloudinary_public_id ??
      "",
  };
}

export async function getMetadataList() {
  const response = await fetch(`${API_BASE_URL}/metadata`, {
    method: "GET",
  });

  if (!response.ok) {
    await throwRequestError(response, "Gagal mengambil data metadata");
  }

  const result = await response.json();

  const metadataList = getMetadataArray(result);

  const normalizedData = metadataList.map((item, index) =>
    normalizeMetadata(item, index)
  );
  return normalizedData;
}

export async function getMetadataReport(metadataId) {
  const response = await fetch(`${API_BASE_URL}/metadata/${metadataId}/report`, {
    method: "GET",
  });

  if (!response.ok) {
    if ([404, 405].includes(response.status)) return null;

    await throwRequestError(response, "Gagal mengambil report metadata");
  }

  const result = await response.json().catch(() => null);
  return normalizeReportResponse(result);
}

export async function saveMetadataReport(metadataId, payload) {
  const response = await fetch(`${API_BASE_URL}/metadata/${metadataId}/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await throwRequestError(response, "Gagal menyimpan report metadata");
  }

  const result = await response.json().catch(() => null);

  return (
    normalizeReportResponse(result) || {
      saved: true,
      message: "Report berhasil disimpan!",
    }
  );
}

export async function updateMetadata(metadataId, payload) {
  const backendPayload = toBackendPayload(payload);

  const response = await fetch(`${API_BASE_URL}/metadata/${metadataId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(backendPayload),
  });

  if (!response.ok) {
    await throwRequestError(response, "Gagal memperbarui metadata");
  }

  const result = await response.json().catch(() => null);
  const updatedItem = getMetadataObject(result);

  if (!updatedItem) {
    return normalizeMetadata({
      ...payload,
      ...backendPayload,
      id: metadataId,
    });
  }

  return normalizeMetadata(updatedItem);
}

export async function deleteMetadata(metadataId) {
  const response = await fetch(`${API_BASE_URL}/metadata/${metadataId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await throwRequestError(response, "Gagal menghapus metadata");
  }

  return response.json().catch(() => null);
}
