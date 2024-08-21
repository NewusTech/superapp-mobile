export const formatDate = (
  date?: number | Date | undefined,
  options: Intl.DateTimeFormatOptions | undefined = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }
): string => {
  return new Intl.DateTimeFormat("id-ID", options).format(date);
};

export function formatDateYMD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns month from 0-11
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
export function formatDateDMY(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns month from 0-11
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
}

export const formatTime = (date?: number | Date | undefined): string => {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export function formatTimeString(timeString: string) {
  // Memisahkan jam dan menit dari string waktu
  const [hours, minutes] = timeString.split(":");

  // Menggabungkan jam dan menit dengan format yang diinginkan
  return `${hours}.${minutes}`;
}

export const formatDatetime = (date?: number | Date | undefined): string => {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export function formatLocalDate(dateString: Date) {
  const date = new Date(dateString);

  // Konfigurasi lokal dan opsi format
  const options = {
    weekday: "long", // Menampilkan nama hari lengkap
    day: "2-digit", // Menampilkan tanggal dua digit
    month: "long", // Menampilkan nama bulan lengkap
    year: "numeric", // Menampilkan tahun empat digit
  };

  // Format tanggal dengan konfigurasi bahasa Indonesia (id-ID)
  return date.toLocaleDateString("id-ID", options as any);
}

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
