import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
	variable: "--font-schibsted-grotesk",
	subsets: ["latin"],
});

const martianMono = Martian_Mono({
	variable: "--font-martian-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "DevEvent",
	description: "The Hub for Every Dev Event You Mustn't Miss",
	keywords: ["dev", "event", "next", "react", "typescript"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}
			>
				<div className="absolute inset-0 top-0 z-[-1] min-h-screen">
					<LightRays
						raysOrigin="top-center-offset"
						raysColor="#5dfeca"
						raysSpeed={0.5}
						rayLength={1.2}
						distortion={0.01}
						lightSpread={0.9}
						noiseAmount={0.0}
						mouseInfluence={0.02}
						followMouse={true}
					/>
				</div>

				<Navbar />
				<main>{children}</main>
			</body>
		</html>
	);
}
