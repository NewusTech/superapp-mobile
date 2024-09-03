import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { API_URL } from "@/constants/Constant";
import { handleLogoutSession } from "@/features/auth/services/auth.service";
import { getAccessToken } from "@/features/auth/store/auth-store";

import {
  AvaliableSheats,
  AvaliableSheatsResponseSuccess,
  GetArticleDetailResponseSuccess,
  GetArticleQuery,
  GetArticleResponseSuccess,
  GetDoorToDoorApiResponseSuccess,
  GetDoorToDoorParams,
  GetPariwisataApiResponseSuccess,
  GetPariwisataBySlugApiResponseSuccess,
  GetPaymentMethodResponseSuccess,
  GetPaymentStatusResponseSuccess,
  GetRentalBookeDatesApiResponseSuccess,
  GetTravelBranchResponseSuccess,
  GetTravelRutesResponseSuccess,
  OrderDetailResponseSuccess,
  OrderListRentalResponseSuccess,
  OrderListTravelResponseSuccess,
  OrderRentalDetailResponseSuccess,
  PostLoginPayload,
  PostLoginResponseSuccess,
  PostProcessPaymentPayload,
  PostProcessPaymentRentalPayload,
  PostRegisterPayload,
  PostUpdateProfileData as PutUpdateProfileData,
  RentalCarListResponseSuccess,
  TravelPointToPointApiParams,
  TravelScheduleQuery,
  TravelScheduleResponseSuccess,
  TravePointToPointApiResponseSuccess,
} from "./internal.api.type";

const apiClient = axios.create({
  baseURL: API_URL,
});

const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  const accessToken = getAccessToken();

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

const responseInterceptorSuccess = (response: AxiosResponse) => {
  console.log(response.config.url, {
    type: "api success",
    data: response.data,
  });
  return response;
};

const responseInterceptorError = (error: AxiosError) => {
  const accessToken = getAccessToken();
  console.error(error.config?.url, error);

  // force logout user if got status 401 Unauthorized
  if (error.response?.status === 401 && accessToken) {
    handleLogoutSession();
  }

  return Promise.reject(error);
};

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(
  responseInterceptorSuccess,
  responseInterceptorError
);

export const apiClientMock = axios.create({
  baseURL: API_URL,
});
apiClientMock.interceptors.request.use(requestInterceptor);
apiClientMock.interceptors.response.use(
  responseInterceptorSuccess,
  responseInterceptorError
);

export const postLogin = async (payload: PostLoginPayload) => {
  const response = await apiClient<PostLoginResponseSuccess>({
    method: "POST",
    url: "/api/auth/login",
    data: payload,
  });

  return response.data;
};

export const postRegister = async (payload: PostRegisterPayload) => {
  const response = await apiClient({
    method: "POST",
    url: "/api/auth/register",
    data: payload,
  });

  return response.data;
};

export const getUserProfile = async () => {
  const response = await apiClient<PostLoginResponseSuccess>({
    method: "GET",
    url: "/api/auth/user-profile",
  });

  return response.data;
};

export const putUpdateUserProfile = async (data: PutUpdateProfileData) => {
  const response = await apiClient({
    method: "PUT",
    url: "/api/auth/update-profile",
    data: data,
  });

  return response.data;
};

export const getArticles = async (query?: GetArticleQuery) => {
  const response = await apiClient<GetArticleResponseSuccess>({
    method: "GET",
    url: `/api/artikel/artikel`,
  });

  return response.data;
};

export const getArticleById = async (id: string) => {
  const response = await apiClient<GetArticleDetailResponseSuccess>({
    method: "GET",
    url: "/api/artikel/artikel/" + id,
  });

  return response.data;
};

export const getTravelSchedule = async (params: TravelScheduleQuery) => {
  const response = await apiClientMock<TravelScheduleResponseSuccess>({
    method: "GET",
    url: "/api/jadwal/jadwal_by_rute",
    params: {
      ...params,
      // transform Date, into yyyy-mm-dd
      date: new Date(params.date).toISOString().slice(0, 10),
    },
  });

  // console.log(response.data);

  return response.data;
};

export const getTravelRute = async () => {
  const response = await apiClientMock<GetTravelRutesResponseSuccess>({
    method: "GET",
    url: "/api/rute/master_rute",
  });

  return response.data;
};
export const getTravelBranch = async () => {
  const response = await apiClientMock<GetTravelBranchResponseSuccess>({
    method: "GET",
    url: "/api/cabang/master_cabang",
  });

  return response.data;
};

export const getPointToPointApi = async (
  params: TravelPointToPointApiParams
) => {
  const response = await apiClientMock<TravePointToPointApiResponseSuccess>({
    method: "GET",
    url: "/api/titik_jemput/master_titik_jemput",
    params,
  });

  return response.data;
};
export const getAvaliableSheatApi = async (params: AvaliableSheats) => {
  const response = await apiClientMock<AvaliableSheatsResponseSuccess>({
    method: "GET",
    url: "/api/kursi/kursi_by_mobil/" + params.mobil_id,
  });

  return response.data;
};

export const getPaymentMethod = async () => {
  const response = await apiClientMock<GetPaymentMethodResponseSuccess>({
    method: "GET",
    url: "/api/pembayaran/metode-pembayaran",
  });

  return response.data;
};

export const postProcessPayment = async (data: PostProcessPaymentPayload) => {
  const response = await apiClientMock({
    method: "POST",
    url: "/api/pembayaran/proses_pembayaran",
    data,
  });

  return response.data;
};

export const postProcessPaymentRental = async (
  data: PostProcessPaymentRentalPayload
) => {
  const accessToken = getAccessToken();
  try {
    const response = await fetch(`${API_URL}/api/rental/process-payment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      body: data,
    });

    // Periksa apakah respons sukses (status 2xx)
    if (!response.ok) {
      // Jika tidak sukses, ambil pesan error
      const errorData = await response.json();
      // Buat error baru dengan pesan dari respons
      throw new Error(errorData.message || "Gagal memproses pembayaran.");
    }
    // Respons sukses, kembalikan data JSON
    const result = await response.json();
    return result;
  } catch (error: any) {
    // Tangani error di sini
    console.error(
      `Error saat memproses pembayaran: ${error.message} - ${error.data}`
    );
    // Kamu bisa mengembalikan error atau menampilkannya ke UI
    throw error;
  }
};
export const postUpdateFotoProfile = async (data: any) => {
  const accessToken = getAccessToken();
  try {
    const response = await fetch(`${API_URL}/api/auth/profile-photo/update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      body: data,
    });

    // Periksa apakah respons sukses (status 2xx)
    if (!response.ok) {
      // Jika tidak sukses, ambil pesan error
      const errorData = await response.json();
      // Buat error baru dengan pesan dari respons
      throw new Error(errorData.message || "Gagal memproses pembayaran.");
    }
    // Respons sukses, kembalikan data JSON
    const result = await response.json();
    return result;
  } catch (error: any) {
    // Tangani error di sini
    console.error(
      `Error saat memproses pembayaran: ${error.message} - ${error.data}`
    );
    // Kamu bisa mengembalikan error atau menampilkannya ke UI
    throw error;
  }
};

export const getOrderListTravel = async (status: string) => {
  const response = await apiClientMock<OrderListTravelResponseSuccess>({
    method: "GET",
    url: "/api/pesanan/riwayat",
    params: {
      status,
    },
  });

  return response.data;
};
export const getOrderListRental = async (status: string) => {
  const response = await apiClientMock<OrderListRentalResponseSuccess>({
    method: "GET",
    url: "/api/rental/riwayat",
    params: {
      status,
    },
  });

  return response.data;
};
export const getRentalCarLIst = async () => {
  const response = await apiClientMock<RentalCarListResponseSuccess>({
    method: "GET",
    url: "/api/rental/mobil",
  });

  return response.data;
};
export const getOrderTravelDetail = async (kode_pesanan: string) => {
  const response = await apiClientMock<OrderDetailResponseSuccess>({
    method: "GET",
    url: "/api/pesanan/riwayat/" + kode_pesanan,
  });

  return response.data;
};
export const getOrderRentalDetail = async (kode_pesanan: string) => {
  const response = await apiClientMock<OrderRentalDetailResponseSuccess>({
    method: "GET",
    url: "/api/rental/riwayat/" + kode_pesanan,
  });

  return response.data;
};

export const getPaymentStatusDetail = async (kode_pesanan: string) => {
  const response = await apiClientMock<GetPaymentStatusResponseSuccess>({
    method: "GET",
    url: "/api/pesanan/" + kode_pesanan,
  });

  return response.data;
};

export const getDoorToDoorApi = async (params: GetDoorToDoorParams) => {
  const response = await apiClientMock<GetDoorToDoorApiResponseSuccess>({
    method: "GET",
    url: "/api/door-to-door",
    params,
  });

  return response.data;
};

export const getRentalBookDatesApi = async (params: { mobil_id: string }) => {
  const response = await apiClientMock<GetRentalBookeDatesApiResponseSuccess>({
    method: "GET",
    url: "/api/rental/booked-dates",
    params,
  });

  return response.data;
};

export const getPariwisataApi = async () => {
  const response = await apiClientMock<GetPariwisataApiResponseSuccess>({
    method: "GET",
    url: "/api/pariwisata",
  });

  return response.data;
};

export const getPariwisataBySlugApi = async (slug: string) => {
  const response = await apiClientMock<GetPariwisataBySlugApiResponseSuccess>({
    method: "GET",
    url: "/api/pariwisata/" + slug,
  });

  return response.data;
};
