import { FlatList, Text, View } from "react-native";
import { Image } from "expo-image";
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
  },
  {
    id: 2,
    title: "Blue Lock vs. U-20 Japan",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1584/144860l.jpg",
  },
  {
    id: 3,
    title: "Chi. Chikyuu no Undou ni Tsuite",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1749/145922l.jpg",
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
          <View className="h-[150px] w-full flex-row bg-[#225CB3]">
            <Image
              source={item.imageUrl}
              className="size-full"
              contentFit="cover"
              transition={1000}
            />
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
