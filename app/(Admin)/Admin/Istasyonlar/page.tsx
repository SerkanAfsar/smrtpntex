import { Metadata } from "next";
import StationListContainer from "./Containers/StationListContainer";
export const metadata: Metadata = {
  title: "İstasyonlar",
};

export default function Page() {
  return <StationListContainer />;
}
