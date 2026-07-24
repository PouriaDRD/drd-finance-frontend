import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
	output: "standalone",

	typedRoutes: true,

	reactCompiler: true,

	reactStrictMode: process.env.NODE_ENV === "development",

	turbopack: {
		root: path.join(__dirname, ".."),
	},
};

export default nextConfig;
