import { Metadata } from "next";
import MembersContainer from "./Containers/MembersContainer";
export const metadata: Metadata = {
  title: "Üyeler",
};

export default function Page() {
  return <MembersContainer />;
}
