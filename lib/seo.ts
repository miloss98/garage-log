import type { Metadata } from "next";

export const LayoutMetadata: Metadata = {
  title: {
    default: "GarageLog",
    template: "%s | GarageLog",
  },
  description:
    "Track your car maintenance, oil changes, services, tire changes and registration deadlines — all in one place.",
  keywords: [
    "car maintenance",
    "vehicle tracker",
    "oil change tracker",
    "car service log",
    "registration reminder",
  ],
  authors: [{ name: "GarageLog" }],
  creator: "GarageLog",
  metadataBase: new URL("https://garage-log.vercel.app/"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://garage-log.vercel.app/",
    title: "GarageLog",
    description:
      "Never miss a car service again. Track oil changes, services, tire changes and registration deadlines.",
    siteName: "GarageLog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GarageLog — Never miss a car service again",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GarageLog",
    description: "Never miss a car service again.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const AppMetadata: Metadata = {
  title: "GarageLog — Never miss a car service again",
  description:
    "Track oil changes, services, tire changes and registration deadlines for all your vehicles in one place.",
};

export const LoginMetadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your GarageLog account.",
  robots: { index: false, follow: false },
};

export const RegisterMetadata: Metadata = {
  title: "Create Account",
  description:
    "Create a free GarageLog account and start tracking your vehicle maintenance today.",
  robots: { index: false, follow: false },
};

export const DashBoardMetadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export const CarsMetadata: Metadata = {
  title: "My Cars",
  robots: { index: false, follow: false },
};
