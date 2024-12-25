import { Metadata } from "next";
import AraclarContainer from "./Containers/AraclarContainer";

export const metadata: Metadata = {
  title: "Araçlar",
};
export default async function Page() {
  return <AraclarContainer />;
}
