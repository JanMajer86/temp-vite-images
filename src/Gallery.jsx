import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";

const apiKey = import.meta.env.VITE_API_KEY;

const Gallery = () => {
	const { searchTerm } = useGlobalContext();

	// custom fetch setup
	const unsplashFetch = axios.create({
		baseURL: "https://api.unsplash.com",
		headers: {
			Authorization: `Client-ID ${apiKey}`,
		},
	});

	const response = useQuery({
		queryKey: ["images", searchTerm],
		queryFn: async () => {
			const result = await unsplashFetch.get(
				`/search/photos?query=${searchTerm}`
			);
			return result.data;
		},
	});
	if (response.isLoading) {
		return (
			<section className="image-container">
				<h4>Loading...</h4>
			</section>
		);
	}
	if (response.isError) {
		return (
			<section className="image-container">
				<h4>There was an error...</h4>
			</section>
		);
	}
	const results = response.data.results;
	if (results.length < 1) {
		return (
			<section className="image-container">
				<h4>No results found...</h4>
			</section>
		);
	}

	return (
		<section className="image-container">
			{results.map((item) => {
				const url = item?.urls?.regular;
				return (
					<img
						src={url}
						key={item.id}
						alt={item.alt_description}
						className="img"
					/>
				);
			})}
		</section>
	);
};
export default Gallery;
