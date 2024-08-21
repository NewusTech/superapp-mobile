import { useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ModalSwipe from "../modal/ModalSwipe";
import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export default function PartialsTentang() {
  const insets = useSafeAreaInsets();
  const [modalTentang, setModalTentang] = useState(false);

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 20,
          gap: 10,
          marginBottom: insets.bottom + 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            fontFamily="OpenSans-Bold"
            fontSize={16}
            numberOfLines={1}
          >
            Tentang
          </Typography>
          <TouchableOpacity style={{}} onPress={() => setModalTentang(true)}>
            <Typography
              fontFamily="Poppins-Medium"
              fontSize={12}
              color="main"
              style={{ textAlignVertical: "bottom" }}
            >
              Lihat Semua
            </Typography>
          </TouchableOpacity>
        </View>
        <Typography
          fontFamily="OpenSans-Regular"
          fontSize={16}
          numberOfLines={2}
        >
          Lorem ipsum dolor sit amet consectetur. Ridiculus mattis ultricies
          ornare turpis suspendisse. Euismod tempor cras libero et pellentesque
          quisque at pellentesque.
        </Typography>
      </View>
      <ModalSwipe modalVisible={modalTentang} setModalVisible={setModalTentang}>
        <ScrollView
          style={{
            flexDirection: "column",
            gap: 10,
            height: Dimensions.get("window").height - 150,
          }}
        >
          <Typography
            fontFamily="OpenSans-Bold"
            fontSize={16}
            numberOfLines={1}
          >
            Tentang
          </Typography>
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={16}
            style={{ textAlign: "justify", marginTop: 15 }}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            dicta quod cupiditate sapiente praesentium facilis voluptatum nemo
            perspiciatis suscipit numquam dolores dolorum incidunt distinctio
            laboriosam repellat modi ea voluptatem animi explicabo rerum
            reiciendis, eaque in ullam culpa. Nulla officiis recusandae a
            provident officia? Quod, recusandae iusto. Qui numquam, quae odio
            exercitationem quam ipsam aliquam minus dolorem perferendis
            inventore dignissimos id veniam fugiat provident rerum autem nemo
            doloribus nobis voluptas itaque? Corporis excepturi quia doloremque
            dolorem nesciunt pariatur impedit recusandae officiis cumque fugiat,
            explicabo, autem molestiae aspernatur! Quis delectus voluptatum
            explicabo, sunt, libero ratione, error iure laborum facere officiis
            modi reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Repellat non quis quasi impedit! Quisquam repellendus ullam
            sunt magni temporibus blanditiis dignissimos reprehenderit fugit
            deserunt ipsum voluptatum, nobis, ea molestias, earum sequi dolor
            nemo porro perspiciatis non eligendi hic minima? Corporis non et
            tempore quo modi iste eligendi atque repudiandae tempora doloremque
            veniam explicabo incidunt voluptates quisquam dignissimos, sit
            officiis consectetur ipsam amet ipsa laudantium aliquam quis laborum
            sequi! A quod nihil molestiae excepturi? Omnis minima similique
            dolorem ipsa earum architecto tempora numquam provident reiciendis?
            Temporibus dolorum placeat eos perspiciatis, maxime labore impedit
            totam dolor, laboriosam possimus a est perferendis ipsa vitae sint
            enim debitis qui recusandae? Incidunt, animi delectus facilis
            expedita repudiandae quas. Suscipit veritatis a dicta magni ipsum
            delectus tempora fugit nisi, quidem ratione similique, earum odio
            obcaecati. Tenetur non excepturi repudiandae delectus animi ipsa ab
            esse facilis? Placeat maxime dolorum veniam eligendi voluptates
            atque necessitatibus commodi harum ipsa quibusdam? Sit at harum,
            quibusdam dignissimos deserunt voluptatibus fugit itaque vero porro
            quod consequatur architecto corporis dolorum vitae illo obcaecati
            maiores. Quibusdam magnam esse reprehenderit et ab, officia quidem
            velit suscipit vero dicta. Dolorum quam veritatis quo quisquam ea
            pariatur nulla perferendis, fugit dolor, et ad. Rerum, totam quo
            ipsa reiciendis quam explicabo quod vero ab quasi fugit odit, minus
            autem itaque laboriosam similique nam quis distinctio, labore
            placeat at. Unde placeat explicabo in voluptate aut tenetur impedit
            itaque incidunt. Sunt quia in obcaecati itaque, sint reprehenderit
            aliquam error nostrum delectus tenetur quam voluptatem amet
            inventore magnam eos, mollitia aperiam neque laborum ducimus
            quisquam cum officiis debitis ab. Incidunt nobis ullam, quisquam
            fugiat, necessitatibus animi mollitia a soluta inventore, id modi
            sint dicta aut ipsa voluptates. Omnis optio quidem nulla esse
            nesciunt, recusandae sit id eos delectus dolorum laudantium,
            praesentium magni sunt maiores similique. Necessitatibus ea beatae
            deleniti nesciunt ipsam!
          </Typography>
        </ScrollView>
      </ModalSwipe>
    </View>
  );
}
