import { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import {
  Appbar,
  Loader,
  Snackbar,
  TextInput,
  Typography,
  View,
} from "@/components";
import { IconCILogout } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetProfile } from "@/features/auth/api/useGetProfile";
import { useUpdateProfileMutation } from "@/features/auth/api/useUpdateProfile";
import { handleLogoutSession } from "@/features/auth/services/auth.service";
import {
  useAuthActions,
  useAuthProfile,
} from "@/features/auth/store/auth-store";
import useDebounce from "@/hooks/useDebounce";

export default function ProfileTabScreen() {
  const { Colors } = useAppTheme();

  // store
  const userProfile = useAuthProfile();
  const { setProfile } = useAuthActions();

  // query & mutations
  const userProfileQuery = useGetProfile();
  const updateUserProfileMutation = useUpdateProfileMutation();

  // state
  const [mobileNumber, setMobileNumber] = useState(userProfile?.no_telp || "");
  // const [address, setAddress] = useState(userProfile?.);
  const debouncedMobileNumber = useDebounce(mobileNumber, 1000);

  useEffect(() => {
    if (userProfileQuery.data) {
      setProfile(userProfileQuery.data.data);
    }
  }, [userProfileQuery.data, setProfile]);

  // methods
  const handleRefresh = () => {
    userProfileQuery.refetch();
  };

  const handleLogout = async () => {
    // TODO integrate with logout API

    handleLogoutSession();
    Snackbar.show({ message: "Logout berhasil!" });
  };

  useEffect(() => {
    if (debouncedMobileNumber === userProfile?.no_telp) return;

    updateUserProfileMutation.mutate(
      {
        no_hp: debouncedMobileNumber,
      },
      {
        onSuccess: (data) => {
          setProfile(data?.data);
          Snackbar.show({ message: "Berhasil update profile!" });
        },
        onError: (error) => {
          Snackbar.show({ message: "Gagal update profile", variant: "danger" });
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMobileNumber, setProfile]);

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
          <Image
            style={[style.avatarImg, { backgroundColor: Colors.outlineborder }]}
          />

          <Typography fontFamily="Poppins-SemiBold" fontSize={20}>
            {userProfile?.nama}
          </Typography>
        </View>

        <TextInput label="Email" value={userProfile?.email} editable={false} />

        {!!userProfile?.no_telp && (
          <TextInput
            label="Nomor Telepon"
            value={mobileNumber}
            trailingIcon={
              updateUserProfileMutation.isPending && <Loader size={16} />
            }
            onChangeText={setMobileNumber}
          />
        )}
        <TextInput label="Alamat" numberOfLines={5} value="" />
      </ScrollView>

      <TouchableWithoutFeedback onPress={handleLogout}>
        <View backgroundColor="outlineborder" style={style.logoutButton}>
          <IconCILogout color="main" />

          <Typography fontFamily="Poppins-Medium" fontSize={16}>
            Log Out
          </Typography>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    gap: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImg: {
    height: 80,
    width: 80,
    borderRadius: 99,
  },
  logoutButton: {
    height: 48,
    paddingHorizontal: 48,
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});
