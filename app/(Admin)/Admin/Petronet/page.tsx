import { Metadata } from "next";
import PetronetContainer from "./Containers/PetronetContainer";

export const metadata: Metadata = {
  title: "Petronet",
};

export default function Page() {
  return <PetronetContainer />;
}
