import { UserInfoResult } from "@/Utils/Auth";
import DashboardContainer from "./Containers/DashboardContainer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smartpoint",
};
export default async function Dashboard() {
  let title: string | undefined = "";
  const result = await UserInfoResult();
  if (result) {
    title = result.name as string;
  } else {
    title = undefined;
  }
  return <DashboardContainer title={title} />;
}
