import { Metadata } from "next";
import UsersContainer from "./Containers/UsersContainer";
export const metadata: Metadata = {
  title: "Kullanıcılar",
};

export default function Page() {
  console.log("rendered");
  return <UsersContainer />;
}
