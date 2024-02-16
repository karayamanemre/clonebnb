import {
	View,
	Text,
	FlatList,
	ListRenderItem,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Listing } from "@/interfaces/listing";
import { Ionicons } from "@expo/vector-icons";

interface Props {
	listings: any[];
	category: string;
}

const Listings = ({ listings: items, category }: Props) => {
	const [loading, setLoading] = useState(false);
	const listRef = useRef<FlatList>(null);

	useEffect(() => {
		console.log("reload listings: ", items.length);
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [category]);

	const renderRow: ListRenderItem<Listing> = ({ item }) => (
		<Link
			href={`/listing/${item.id}`}
			asChild>
			<TouchableOpacity>
				<View style={styles.listing}>
					<Image
						source={{ uri: item.medium_url }}
						style={styles.image}
					/>
					<TouchableOpacity
						style={{ position: "absolute", top: 30, right: 30 }}>
						<Ionicons
							name='heart-outline'
							size={24}
							color='white'
						/>
					</TouchableOpacity>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}>
						<Text style={{ fontFamily: "opens-sb", fontSize: 16 }}>
							{item.name}
						</Text>
						<View
							style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
							<Ionicons
								name='star'
								size={16}
								color='black'
							/>
							<Text style={{ fontFamily: "opens-sb" }}>
								{item.review_scores_rating / 20}
							</Text>
						</View>
					</View>
					<Text style={{ fontFamily: "opens" }}>{item.room_type}</Text>
					<View style={{ flexDirection: "row", gap: 2 }}>
						<Text style={{ fontFamily: "opens-sb" }}>${item.price}</Text>
						<Text style={{ fontFamily: "opens" }}>/ night</Text>
					</View>
				</View>
			</TouchableOpacity>
		</Link>
	);

	return (
		<View style={defaultStyles.container}>
			<FlatList
				data={loading ? [] : items}
				ref={listRef}
				renderItem={renderRow}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	listing: {
		padding: 16,
		gap: 6,
		marginVertical: 16,
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 8,
	},
});

export default Listings;
