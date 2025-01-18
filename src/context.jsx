import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
	const prefersDarkMode = window.matchMedia(
		"(prefers-color-scheme:dark)"
	).matches;
	return localStorage.getItem("darkTheme") ?? prefersDarkMode.toString();
};

export const AppProvider = ({ children }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(
		JSON.parse(getInitialDarkMode())
	);
	const [searchTerm, setSearchTerm] = useState("office");

	const toggleDarkTheme = () => {
		const newTheme = !isDarkTheme;
		setIsDarkTheme(newTheme);
		localStorage.setItem("darkTheme", newTheme);
		// document.body.classList.toggle("dark-theme", newTheme);
	};

	useEffect(() => {
		document.body.classList.toggle("dark-theme", isDarkTheme);
	}, [isDarkTheme]);
	return (
		<AppContext.Provider
			value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => useContext(AppContext);
