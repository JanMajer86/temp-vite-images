import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./context";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<AppProvider>
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	</AppProvider>
);
