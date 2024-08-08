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
    no_telp?: string;
    role_id: number;
    token: string;
    type: "bearer";
    updated_at: string;
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
  nama: z.string().optional(),
  email: z.string().optional(),
  no_hp: z.string(),
  alamat: z.string().optional(),
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
    departureDate: string;
    destinationCity: string;
    destinationDepartureDate: string;
    originCity: string;
    originDepartureDate: string;
    price: number;
    fasilitas: string;
    syarat_dan_ketentuan: string;
    seatTaken: string[];
  }[];
  message: string;
  success: boolean;
};
export type TravelPointToPointApiParams = {
  point: string;
  id: string;
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
    id: number;
    metode: string;
    img: string;
  }[];
};

// export const postProcessPaymentSchema = z.object({});
// export type PostProcessPaymentPayload = z.infer<
//   typeof postProcessPaymentSchema
// >;
export type PostProcessPaymentPayload = {
  orderCode: string;
};

export type OrderListResponseSuccess = {
  data: {
    id: number;
    status: "success" | "waiting" | "failed";
    departureDate: string;
    destinationCity: string;
    destinationDepartureDate: string;
    originCity: string;
    originDepartureDate: string;
    orderType: "travel" | "paket";
  }[];
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
