import React from "react";
import { useRouter } from "expo-router";

import { Appbar, Typography, View } from "@/components";

export default function Tnc() {
  const router = useRouter();

  return (
    <View>
      <Appbar backIconPress={() => router.back()} title="Term and Conditions" />

      <Typography
        fontFamily="Poppins-Regular"
        color="textsecondary"
        fontSize={12}
        style={{ margin: 20, marginTop: 20, textAlign: "justify" }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
        quaerat, nemo asperiores exercitationem at vel non sapiente ab magni,
        modi maxime corporis. Atque esse ab voluptate neque velit aliquam
        facilis minima ratione beatae eligendi delectus corporis quam optio
        quae, earum voluptas ullam aperiam? Aspernatur nihil ex dignissimos
        inventore repellendus dicta, a incidunt modi illo, consequuntur mollitia
        commodi, enim quam voluptatem. Dolorum, recusandae dolores fuga est modi
        consectetur ipsam autem nihil tempora aliquid sit. Voluptas perferendis
        magnam saepe eveniet nulla hic labore corporis temporibus aliquid
        obcaecati. Ducimus quidem perspiciatis maxime modi expedita eius
        doloribus cupiditate, quae quibusdam quia neque. Velit eligendi ab
        deserunt optio natus necessitatibus, facilis placeat molestias. Porro ad
        obcaecati similique doloremque. Adipisci blanditiis sunt quos recusandae
        quidem aspernatur iure deserunt praesentium esse, in quasi officiis ex
        unde, minus numquam odit, sequi suscipit similique corrupti vel tempora
        eum. Non alias ratione sequi nostrum culpa, eligendi eos molestiae
        molestias temporibus eaque maxime vero est, corporis consequatur placeat
        perspiciatis quis? Itaque a dicta, adipisci id eaque, odit dolores
        doloribus, necessitatibus ratione impedit illo ipsam minus. Rem placeat
        quaerat praesentium commodi, ducimus optio facere dolore quos aliquam
        exercitationem saepe iste quod, autem eveniet, possimus modi odit velit?
        Totam eius cumque nam temporibus!
      </Typography>
    </View>
  );
}
