import { Metadata } from "next";
import BpContainer from "./Containers/BpContainer";
export const metadata: Metadata = {
  title: "Bp Siparişleri",
};

export default function Dashboard() {
  return <BpContainer />;
}
