export const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function convertToStartOfDay(dateString: Date) {
  // Parse tanggal
  const date = new Date(dateString);

  // Tambahkan 7 jam untuk mengonversi dari UTC ke WIB
  date.setUTCHours(date.getUTCHours() + 7);

  // Set jam, menit, detik, dan milidetik ke 0 di timezone WIB
  date.setUTCHours(0, 0, 0, 0);

  // Ambil tahun, bulan, dan tanggal
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
