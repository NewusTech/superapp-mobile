export const formatCurrency = (amount: number) => {
  // Check if the number is valid
  if (isNaN(amount)) {
    amount = 0;
  }

  // Create Intl.NumberFormat object for Indonesian Rupiah
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Format the number into IDR currency
  return formatter.format(amount);
};

export function calculateDaysBetween(startDate: Date, endDate: Date) {
  // Ubah string menjadi Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Hitung perbedaan waktu dalam milidetik
  const timeDifference = end.getTime() - start.getTime();

  // Ubah perbedaan waktu menjadi jumlah hari
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysDifference;
}

export const plusDay = (date: Date, day: number) => {
  const dateBefore = new Date(date); // Ubah string tanggalMulai menjadi objek Date
  dateBefore.setDate(dateBefore.getDate() + day); // Tambah 1 hari
  return dateBefore;
};

export const checkExpired = (expirationTime: string, status: string) => {
  if (status !== "Menunggu Pembayaran") {
    return false;
  }
  const currentTime = new Date().getTime();
  const expirationDate = new Date(expirationTime).getTime();

  console.log("Current Time:", new Date(currentTime).toISOString());
  console.log("Expiration Time:", new Date(expirationDate).toISOString());
  console.log("Time Difference:", expirationDate - currentTime);

  return expirationDate - currentTime > 0;
};
