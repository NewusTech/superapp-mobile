import { useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Appbar,
  Button,
  Loader,
  Snackbar,
  TextInput,
  Typography,
  View,
} from "@/components";
import { IconCILogout, IconEdit } from "@/components/icons";
import InputFileImage from "@/components/input-file/InputFileImage";
import Modals from "@/components/modal/Modals";
import { useAppTheme } from "@/context/theme-context";
import { useGetProfile } from "@/features/auth/api/useGetProfile";
import { useUpdateFotoProfile } from "@/features/auth/api/useUpdateFotoProfile";
import { useUpdateProfileMutation } from "@/features/auth/api/useUpdateProfile";
import { handleLogoutSession } from "@/features/auth/services/auth.service";
import {
  useAuthActions,
  useAuthProfile,
} from "@/features/auth/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";

export const profileSchema = z.object({
  nama: z.string(),
  nik: z.string(),
  no_telp: z.string(),
  alamat: z.string(),
  kota: z.string(),
});
export type profileType = z.infer<typeof profileSchema>;

export default function ProfileTabScreen() {
  const { Colors } = useAppTheme();
  // state
  const [isEdit, setIsEdit] = useState(false);
  const [openModalEditProfile, setOpenModalEditProfile] = useState(false);
  const [newFotoProfile, setNewFotoProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // store
  const userProfile = useAuthProfile();
  const { setProfile } = useAuthActions();

  // query & mutations
  const userProfileQuery = useGetProfile();
  const updateUserProfileMutation = useUpdateProfileMutation();
  const updateFotoProfileMutation = useUpdateFotoProfile();

  const { control, formState, handleSubmit, setValue } = useForm<profileType>({
    resolver: zodResolver(profileSchema),
    mode: "all",
    defaultValues: {
      alamat: userProfile?.alamat || "",
      nama: userProfile?.nama || "",
      nik: userProfile?.nik || "",
      no_telp: userProfile?.no_telp || "",
      kota: userProfile?.kota || "",
    },
  });

  const onSaveProfile = handleSubmit((data) => {
    updateUserProfileMutation.mutate(data, {
      onSuccess: (data) => {
        setProfile(data?.data);
        Snackbar.show({ message: "Berhasil update profile!" });
      },
      onError: (error) => {
        Snackbar.show({ message: "Gagal update profile", variant: "danger" });
      },
    });
  });

  const handleOnSimpanFotoProfile = () => {
    setIsLoading(true);
    // Prepare the FormData
    const formData = new FormData();
    // Menambahkan gambar
    const imageProfile: any = {
      name: "image_profile",
      type: "image/jpeg", // Pastikan MIME type sesuai
      uri: newFotoProfile,
    };

    formData.append("image_url", imageProfile);

    updateFotoProfileMutation.mutate(formData, {
      onSuccess: (res) => {
        console.log(res, "res");
        Snackbar.show({ message: "Update Foto Profile berhasil" });
        setIsLoading(false);
        setNewFotoProfile("");
        setOpenModalEditProfile(false);
        userProfileQuery.refetch();
      },
      onError: (res) => {
        Snackbar.show({
          message: "Update Foto Profile gagal, coba setelah beberapa saat",
          variant: "danger",
        });
        console.error(res);
        setIsLoading(false);
        setNewFotoProfile("");
        setOpenModalEditProfile(false);
        userProfileQuery.refetch();
      },
    });
  };

  const onHandleButtonSave = () => {
    onSaveProfile();
    setIsEdit(false);
  };

  const onHandleButtonReset = () => {
    if (!isEdit) return setIsEdit(true);
    setIsEdit(false);
    setValue("nama", userProfile?.nama || "");
    setValue("nik", userProfile?.nik || "");
    setValue("no_telp", userProfile?.no_telp || "");
    setValue("alamat", userProfile?.alamat || "");
  };

  // methods
  const handleRefresh = () => {
    userProfileQuery.refetch();
    setIsEdit(false);
  };

  const handleLogout = async () => {
    // TODO integrate with logout API
    handleLogoutSession();
    Snackbar.show({ message: "Logout berhasil!" });
  };

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title="Akun" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, gap: 27, padding: 27 }}
        refreshControl={
          <RefreshControl
            refreshing={userProfileQuery.isRefetching}
            onRefresh={handleRefresh}
            progressViewOffset={20}
          />
        }
      >
        <View style={style.avatarContainer}>
          <Pressable
            style={[style.avatarImg, { backgroundColor: Colors.outlineborder }]}
            onPress={() => setOpenModalEditProfile(true)}
          >
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                alignItems: "flex-end",
                zIndex: 2,
                padding: 12,
              }}
            >
              <View
                style={{
                  width: 14,
                  height: 14,
                  padding: 2,
                  borderRadius: 100,
                  backgroundColor: Colors.paper,
                }}
              >
                <IconEdit color="main" width={10} height={10} />
              </View>
            </View>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: userProfileQuery.data?.data?.image_url }}
            />
          </Pressable>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Button onPress={onHandleButtonReset} variant="secondary">
              {isEdit ? "Batal" : "Ubah"}
            </Button>
            {isEdit && (
              <Button
                onPress={onHandleButtonSave}
                disabled={!formState.isValid}
              >
                Simpan
              </Button>
            )}
          </View>
        </View>

        <Controller
          control={control}
          name="nama"
          render={({ field }) => (
            <TextInput
              label="Nama *"
              maxLength={150}
              placeholder="Nama"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              editable={isEdit}
            />
          )}
        />
        <Controller
          control={control}
          name="nik"
          render={({ field }) => (
            <TextInput
              label="NIK *"
              inputMode="numeric"
              maxLength={16}
              placeholder="NIK"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              editable={isEdit}
            />
          )}
        />
        <TextInput label="Email" value={userProfile?.email} editable={false} />
        <Controller
          control={control}
          name="no_telp"
          render={({ field }) => (
            <TextInput
              inputMode="numeric"
              maxLength={13}
              label="Nomor Telepon *"
              placeholder="Nomor Telepon"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              editable={isEdit}
            />
          )}
        />
        <Controller
          control={control}
          name="kota"
          render={({ field }) => (
            <TextInput
              label="Kota *"
              maxLength={150}
              placeholder="Kota"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              editable={isEdit}
            />
          )}
        />
        <Controller
          control={control}
          name="alamat"
          render={({ field }) => (
            <TextInput
              label="Alamat Lengkap *"
              placeholder="Jl.alamat"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              borderRadius={20}
              numberOfLines={5}
              textAlignVertical="top"
              multiline={true}
              editable={isEdit}
            />
          )}
        />
      </ScrollView>

      <TouchableWithoutFeedback onPress={handleLogout}>
        <View backgroundColor="main" style={style.logoutButton}>
          <IconCILogout color="paper" />

          <Typography fontFamily="Poppins-Medium" fontSize={16} color="paper">
            Log Out
          </Typography>
        </View>
      </TouchableWithoutFeedback>
      <Modals
        modalVisible={openModalEditProfile}
        setModalVisible={setOpenModalEditProfile}
      >
        <View style={{ flexDirection: "column", gap: 10 }}>
          <InputFileImage
            label="Masukan Foto Profile"
            image={newFotoProfile}
            setImage={setNewFotoProfile}
            aspect={[1, 1]}
          />
          <Button
            disabled={newFotoProfile === "" || isLoading}
            onPress={handleOnSimpanFotoProfile}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <Typography color="white">Simpan Foto Profile</Typography>
            )}
          </Button>
        </View>
      </Modals>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    gap: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: {
    height: 80,
    width: 80,
    borderRadius: 99,
    overflow: "hidden",
  },
  logoutButton: {
    height: 48,
    paddingHorizontal: 48,
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});
