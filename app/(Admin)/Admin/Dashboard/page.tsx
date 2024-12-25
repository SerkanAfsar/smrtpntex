import DashboardContainer from "./Containers/DashboardContainer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smartpoint",
};
export default function Dashboard() {
  return <DashboardContainer />;
}
