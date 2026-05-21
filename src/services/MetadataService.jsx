const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getErrorMessage(error, fallback) {
  if (!error) return fallback;

  if (typeof error.detail === "string") return error.detail;

  if (error.detail?.message) return error.detail.message;

  if (error.message) return error.message;

  return fallback;
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

function normalizeMetadata(item, index) {
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
  };
}

export async function getMetadataList() {
  const response = await fetch(`${API_BASE_URL}/metadata`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(getErrorMessage(error, "Gagal mengambil data metadata"));
  }

  const result = await response.json();

  const metadataList = getMetadataArray(result);

  console.log("RESPONSE ASLI METADATA:", result);
  console.log("DATA METADATA YANG DIPAKAI:", metadataList);
  console.log("JUMLAH DATA METADATA:", metadataList.length);

  const normalizedData = metadataList.map((item, index) =>
    normalizeMetadata(item, index)
  );

  console.log("DATA METADATA SETELAH NORMALIZE:", normalizedData);
  console.log("JUMLAH DATA SETELAH NORMALIZE:", normalizedData.length);

  return normalizedData;
}

export async function updateMetadata(metadataId, payload) {
  const response = await fetch(`${API_BASE_URL}/metadata/${metadataId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(getErrorMessage(error, "Gagal memperbarui metadata"));
  }

  return response.json();
}

export async function deleteMetadata(metadataId) {
  const response = await fetch(`${API_BASE_URL}/metadata/${metadataId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(getErrorMessage(error, "Gagal menghapus metadata"));
  }

  return response.json();
}