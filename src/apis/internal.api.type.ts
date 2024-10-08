import { z } from "zod";

export const postLoginPayloadSchema = z.object({
  email: z.string({ message: "Harus diisi" }).email("Email tidak valid"),
  password: z.string({ message: "Harus diisi" }),
});
export type PostLoginPayload = z.infer<typeof postLoginPayloadSchema>;
export type PostLoginResponseSuccess = {
  data: {
    created_at: string;
    deleted_at?: string;
    email: string;
    nik: string;
    id: number;
    master_cabang_id: number;
    nama: string;
    alamat?: string;
    no_telp?: string;
    role_id: number;
    token: string;
    type: "bearer";
    updated_at: string;
    image_url: string;
    kota: string;
  };
};
export type PostLoginResponseError = {
  message: string;
  status: string;
};

export const postRegisterPayloadSchema = z
  .object({
    email: z.string({ message: "Harus diisi" }).email("Email tidak valid"),
    nama: z.string({ message: "Harus diisi" }),
    no_telp: z.string({ message: "Harus diisi" }),
    password: z.string({ message: "Harus diisi" }),
    confirm_password: z.string({ message: "Harus diisi" }),
    role_id: z.number().optional(),
  })
  .refine((value) => value.password === value.confirm_password, {
    message: "Password tidak sama",
    path: ["confirm_password"],
  });

export type PostRegisterPayload = z.infer<typeof postRegisterPayloadSchema>;
export type PostRegisterResponseError = {
  error: string;
};

export const postUpdateProfileSchema = z.object({
  nama: z.string(),
  nik: z.string(),
  no_telp: z.string(),
  alamat: z.string(),
  kota: z.string(),
});
export type PostUpdateProfileData = z.infer<typeof postUpdateProfileSchema>;

export const getArticlesQuerySchema = z.object({
  type: z.enum(["rekomendasi"]).optional(),
});
export type GetArticleQuery = z.infer<typeof getArticlesQuerySchema>;
export type GetArticleResponseSuccess = {
  data: {
    id: string;
    judul: string;
    image_url: string;
    konten: string;
    harga: number;
  }[];
};
export type GetArticleDetailResponseSuccess = {
  data: {
    id: string;
    judul: string;
    image_url: string;
    konten: string;
    harga: number;
  };
};

export type GetTravelBranchResponseSuccess = {
  data: {
    created_at: string;
    deleted_at: any;
    id: number;
    nama: string;
    updated_at: string;
  }[];
  message: string;
  success: boolean;
};
export type GetTravelRutesResponseSuccess = {
  data: {
    id: string;
    kota_asal: string;
    kota_tujuan: string;
    harga: number;
    created_at: string;
    updated_at: string;
    waktu_keberangkatan: string;
    image_url: string;
    deskripsi: string | null;
  }[];
  message: string;
  success: boolean;
};

export const travelScheduleQuerySchema = z.object({
  from: z.string(),
  to: z.string(),
  date: z.date(),
  seats: z.number(),
});
export type TravelScheduleQuery = z.infer<typeof travelScheduleQuerySchema>;
export type TravelScheduleResponseSuccess = {
  data: {
    id: number;
    img_url: string;
    availableSeat: number;
    carModel: string;
    carSeat: number;
    departureTime: string;
    departureDate: string;
    destinationCity: string;
    destinationDepartureDate: string;
    originCity: string;
    originDepartureDate: string;
    price: number;
    facility: string;
    transitionCity: string;
    syarat_dan_ketentuan: string;
    seatTaken: string[];
  }[];
  message: string;
  success: boolean;
};
export const rentalCarQuerySchema = z.object({
  durasi_sewa: z.number(),
  area: z.string(),
  tanggal_mulai: z.date(),
  tanggal_selesai: z.date(),
  time: z.date(),
  alamat_keberangkatan: z.string(),
  all_in: z.number(),
  catatan_sopir: z.string(),
});
export type RentalCarQuery = z.infer<typeof rentalCarQuerySchema>;
export type TravelPointToPointApiParams = {
  point: string;
  id: string;
  cabang: string;
};
export type AvaliableSheats = { mobil_id: string };
export type AvaliableSheatsResponseSuccess = {
  data: {
    id: number;
    status: string;
    nomor_kursi: string;
  }[];
  message: string;
  success: boolean;
};
export type TravePointToPointApiResponseSuccess = {
  data: {
    id: string;
    nama: string;
  }[];
  message: string;
  success: boolean;
};

export type GetPaymentMethodResponseSuccess = {
  data: {
    payment_gateway: {
      id: number;
      nama: string;
      keterangan: string;
      kode: string;
      img: string;
    }[];
    bank_transfer: {
      id: number;
      nama: string;
      keterangan: string;
      kode: string;
      img: string;
    }[];
  };
};

// export const postProcessPaymentSchema = z.object({});
// export type PostProcessPaymentPayload = z.infer<
//   typeof postProcessPaymentSchema
// >;
export type PostProcessPaymentPayload = {
  orderCode: string;
  metode_id: string;
};

export type ResponseSucsessPostRental = {
  success: true;
  data: {
    jadwal_id: number;
    master_titik_jemput_id: number;
    titik_antar_id: number;
    nama: string;
    no_telp: string;
    email: string;
    nik: string;
    user_id: number;
    status: string;
    kode_pesanan: string;
    updated_at: string;
    created_at: string;
    id: number;
    expired_at: string;
  };
  message: string;
};
export type ResponseSucsessPostRentalPayment = {
  success: true;
  data: {
    order_id: string;
    payment_url: string;
    kode: number;
    nomor_rekening: string;
    bank: string;
    kode_pembayaran: string;
    harga: number;
    metode: string;
  };
  message: string;
};

export type PostProcessPaymentRentalPayload = any;
export type ResponseSucsessPostTravellPayment = {
  success: true;
  data: {
    order_id: string;
    payment_url: string;
    kode: number;
    bank: string;
    nomor_rekening: string;
  };
  message: "Berhasil post data";
};

export type OrderListTravelResponseSuccess = {
  data: {
    created_at: string;
    jam: string;
    kode_pesanan: string;
    kota_asal: string;
    kota_tujuan: string;
    status: string;
    tanggal: string;
    expired_at: string;
  }[];
  message: string;
  success: boolean;
};
export type OrderListRentalResponseSuccess = {
  data: {
    created_at: string;
    kode_pembayaran: string;
    mobil_type: string;
    area: string;
    tanggal_awal_sewa: string;
    tanggal_akhir_sewa: string;
    status: string;
    expired_at: string;
  }[];
  message: string;
  success: boolean;
};
export type RentalCarData = {
  id: number;
  nopol: string;
  type: string;
  jumlah_kursi: string;
  fasilitas: string;
  image_url: string;
  mesin: string;
  transmisi: string;
  kapasitas_bagasi: string;
  deskripsi: string;
  bahan_bakar: string;
  biaya_sewa: string;
  created_at: string;
  updated_at: string;
  biaya_all_in: string;
  bagasi: string;
  images: { image_url: string }[];
};
export type RentalCarListResponseSuccess = {
  data: RentalCarData[];
  message: string;
  success: boolean;
};
export type OrderDetailResponseSuccess = {
  data: {
    pembayaran: {
      status: string;
      metode: string;
      kode_pembayaran: string;
      payment_link: string | null;
      created_at: string;
      expired_at: string;
      nominal: string;
      link_tiket: string;
      link_invoice: string;
      no_rek: string;
      bukti_url: null | string;
    };
    penumpang: [
      {
        nama: string;
        nik: string;
        no_telp: string;
        kursi: number;
      },
    ];
    pesanan: {
      mobil: string;
      kode_pesanan: string;
      jam_berangkat: string;
      jam_tiba: string;
      estimasi: string;
      tanggal: string;
      kota_asal: string;
      kota_tujuan: string;
      titik_jemput: string;
      titik_antar: string;
      kursi: number[];
    };
  };
  message: string;
  success: boolean;
};
export type OrderRentalDetailResponseSuccess = {
  data: {
    created_at: string;
    kode_pembayaran: string;
    mobil_type: string;
    metode: string;
    link_tiket: string;
    link_invoice: string;
    nominal: string;
    payment_link: string | null;
    expired_at: string;
    no_rek: string;
    area: string;
    tanggal_awal_sewa: string;
    tanggal_akhir_sewa: string;
    status: string;
    durasi_sewa: number;
    alamat_keberangkatan: string;
    jam_keberangkatan: string;
    nama: string;
    nik: string;
    alamat: string;
    no_telp: string;
    email: string;
    all_in: number;
    bukti_url: null | string;
  };
  message: string;
  success: boolean;
};

export type GetPaymentStatusResponseSuccess = {
  data: {
    status: "waiting" | "success" | "failed";
    type?: "va";
  };
};

export const getDoorToDoorParamsSchema = z.object({
  query: z.string(),
});
export type GetDoorToDoorParams = z.infer<typeof getDoorToDoorParamsSchema>;
export type GetDoorToDoorApiResponseSuccess = {
  data: {
    nama: string;
    location: string;
  }[];
  message: string;
  success: boolean;
};

export type GetRentalBookeDatesApiResponseSuccess = {
  data: string[];
  message: string;
  success: boolean;
};

export type GetPariwisataApiResponseSuccess = {
  data: {
    id: number;
    judul: string;
    slug: string;
    lokasi: string;
    rating: number;
    konten: string;
    image_url: string;
    created_at: string;
    updated_at: string;
    sub_judul: string;
  }[];
  message: string;
  success: boolean;
};
export type GetPariwisataBySlugApiResponseSuccess = {
  data: {
    id: number;
    judul: string;
    slug: string;
    lokasi: string;
    rating: number;
    konten: string;
    image_url: string;
    created_at: string;
    updated_at: string;
    sub_judul: string;
  };
  message: string;
  success: boolean;
};
