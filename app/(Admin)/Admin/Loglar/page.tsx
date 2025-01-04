import { Metadata } from "next";
import LogsContainer from "./Containers/LogsContainer";

export const metadata: Metadata = {
  title: "Loglar",
};
export default function Page() {
  return <LogsContainer />;
}
