import CustomButton from "@/Components/UI/CustomButton";
import { UserType } from "@/Types/User.Types";
import { format } from "date-fns";
import { CheckIcon } from "./IconList";
import Image from "next/image";
import { RoleType } from "@/Types/Role.Types";

export const KullanicilarDataTableColumns = (
  unBanCommand: any,
  editCommand: any,
) => [
  {
    name: "E-Posta",
    selector: (row: UserType) => row.Email,
    sortable: true,
    width: "250px",
  },
  {
    name: "Kullanıcı Adı",
    selector: (row: UserType) => row.UserName,
    sortable: true,
  },
  {
    name: "Ad",
    selector: (row: UserType) => row.FullName,
    sortable: true,
  },
  {
    name: "Rol İsmi",
    selector: (row: UserType) => row.RoleName,
    sortable: true,
  },
  {
    name: "Ceza Süresi",
    selector: (row: UserType) =>
      row.CannotLoginUntilDate
        ? format(row.CannotLoginUntilDate, "dd.MM.yyyy HH:ss")
        : "",
    sortable: true,
  },
  {
    name: "Banı Kaldır",
    selector: (row: UserType) => (
      <CustomButton
        className="btn w-full bg-red-500 px-3 py-2 text-white"
        title="Ceza Kaldır"
        onClick={async () => await unBanCommand({ id: row.Id })}
      />
    ),
    sortable: true,
  },
  {
    name: "Aktif",
    selector: (row: UserType) =>
      row.IsActive ? (
        <Image src={CheckIcon} width={40} height={40} alt="Aktif" />
      ) : (
        "Pasif"
      ),
    sortable: true,
    width: "80px",
  },
  {
    name: "Düzenle",
    selector: (row: UserType) => (
      <CustomButton
        className={
          "w-full gap-1 rounded-md border border-black bg-gray-900 px-3 py-2 text-white"
        }
        onClick={async () => await editCommand({ id: row.Id })}
        title={"Düzenle"}
      />
    ),
    sortable: true,
  },
];

export const DashboardKullanicilarDataTableColumns = [
  {
    name: "E-Posta",
    selector: (row: UserType) => row.Email,
    sortable: true,
    width: "250px",
  },
  {
    name: "Kullanıcı Adı",
    selector: (row: UserType) => row.UserName,
    sortable: true,
  },
  {
    name: "Ad",
    selector: (row: UserType) => row.FullName,
    sortable: true,
  },
  {
    name: "Rol İsmi",
    selector: (row: UserType) => row.RoleName,
    sortable: true,
  },

  {
    name: "Aktif",
    selector: (row: UserType) =>
      row.IsActive ? (
        <Image src={CheckIcon} width={40} height={40} alt="Aktif" />
      ) : (
        "Pasif"
      ),
    sortable: true,
    width: "80px",
  },
];

export const RollerDataTableColumns = (editCommand: any) => [
  {
    name: "Ad",
    selector: (row: RoleType) => row.Name,
    sortable: true,
    width: "250px",
  },
  {
    name: "Açıklama",
    selector: (row: RoleType) => row.Description,
    sortable: true,
  },
  {
    name: "Aktif",
    selector: (row: UserType) =>
      row.IsActive ? (
        <Image src={CheckIcon} width={40} height={40} alt="Aktif" />
      ) : (
        "Pasif"
      ),
    sortable: true,
    width: "80px",
  },

  {
    name: "Düzenle",
    selector: (row: UserType) => (
      <CustomButton
        className={
          "w-full gap-1 rounded-md border border-black bg-gray-900 px-3 py-2 text-white"
        }
        onClick={async () => await editCommand({ id: row.Id })}
        title={"Düzenle"}
      />
    ),
    sortable: true,
    width: "150px",
  },
];
