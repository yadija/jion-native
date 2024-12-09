import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import { useQuery } from "@tanstack/react-query";
import { getSeasonNow } from "@/lib/api";
import { getCurrentSeason } from "@/lib/utils";

/**
 * This is a workaround for a bug with expo-image to work with tailwindcss
 *
 * @see https://github.com/nativewind/nativewind/issues/1020
 */
cssInterop(Image, { className: "style" });

export default function Index() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["now"],
    queryFn: getSeasonNow,
  });

  if (!data || isLoading) {
    return (
      <View className="m-auto grid">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#EDEDED]">
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        data={data.data}
        keyExtractor={(item) => item.mal_id.toString()}
        ListHeaderComponent={() => (
          <Text className="p-2 font-space-mono text-xl text-[#222C32]">
            Season: {getCurrentSeason()}
          </Text>
        )}
        renderItem={({ item }) => (
          <View className="h-[150px] w-full flex-row bg-black">
            <Image
              source={item.images.jpg.large_image_url}
              className="w-3/4"
              contentFit="cover"
              transition={1000}
            />

            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={["rgba(0, 0, 0, 1)", "transparent"]}
              className="absolute inset-y-0 w-3/4"
            />
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0.5 }}
              colors={["rgba(0, 0, 0, 1)", "transparent"]}
              className="absolute inset-0"
            />

            <View className="absolute inset-0 flex flex-row">
              <View className="flex w-2/3 justify-end">
                <Text className="line-clamp-2 p-2.5 font-space-mono uppercase text-[#EDEDED]">
                  {item.title}
                </Text>
              </View>
              <View className="flex w-1/3 items-center justify-center">
                <Text className="bg-[#225CB3] px-2 py-0.5 font-quicksand-semibold uppercase text-[#EDEDED]">
                  Score
                </Text>

                <View className="flex flex-row items-end">
                  <Text className="font-quicksand-medium text-3xl text-[#EDEDED]">
                    {item.score}
                  </Text>
                  <Text className="font-quicksand-regular text-sm text-[#EDEDED] opacity-75">
                    /10
                  </Text>
                </View>

                <Text className="font-quicksand-regular text-xs text-[#EDEDED] opacity-75">
                  {item.scored_by.toLocaleString()} users
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
