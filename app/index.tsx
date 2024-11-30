import { FlatList, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";

/**
 * This is a workaround for a bug with expo-image to work with tailwindcss
 *
 * @see https://github.com/nativewind/nativewind/issues/1020
 */
cssInterop(Image, { className: "style" });

const data = [
  {
    id: 1,
    title: "Dandadan",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1584/143719l.jpg",
    score: 9.5,
    scored_by: 1000,
  },
  {
    id: 2,
    title: "Blue Lock vs. U-20 Japan",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1584/144860l.jpg",
    score: 8.5,
    scored_by: 2000,
  },
  {
    id: 3,
    title: "Chi. Chikyuu no Undou ni Tsuite",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1749/145922l.jpg",
    score: 9,
    scored_by: 1200,
  },
];

export default function Index() {
  return (
    <View className="flex-1 bg-[#EDEDED]">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <Text className="p-2 text-2xl text-[#222C32]">Now: Fall 2024</Text>
        )}
        renderItem={({ item }) => (
          <View className="h-[150px] w-full flex-row bg-[#222C32]">
            <Image
              source={item.imageUrl}
              className="w-3/4"
              contentFit="cover"
              transition={1000}
            />

            <LinearGradient
              start={{ x: 0.85, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={["rgba(0, 0, 0, 1)", "transparent"]}
              className="absolute inset-0"
            />
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0.5 }}
              colors={["rgba(0, 0, 0, 1)", "transparent"]}
              className="absolute inset-0"
            />

            <View className="absolute inset-0 flex flex-row">
              <View className="flex w-2/3 justify-end">
                <Text className="line-clamp-2 p-2.5 font-bold uppercase text-[#EDEDED]">
                  {item.title}
                </Text>
              </View>
              <View className="flex w-1/3 items-center justify-center">
                <Text className="bg-[#225CB3] px-2 py-0.5 font-bold uppercase text-[#EDEDED]">
                  Score
                </Text>

                <View className="flex flex-row items-end">
                  <Text className="text-3xl text-[#EDEDED]">{item.score}</Text>
                  <Text className="text-sm text-[#EDEDED] opacity-75">/10</Text>
                </View>

                <Text className="text-xs text-[#EDEDED] opacity-75">
                  {item.scored_by} users
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="p-2">
            <Text className="text-2xl">No data found</Text>
          </View>
        )}
      />
    </View>
  );
}
