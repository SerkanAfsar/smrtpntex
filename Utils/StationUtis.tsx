import { StationType } from "@/Types/Station.Types";
import { CheckIcon } from "./IconList";
import CustomButton from "@/Components/UI/CustomButton";
import Image from "next/image";
import { format } from "date-fns";

export const StationListHeaderColumns = (editCommand: any) => [
  {
    name: "İstasyon Adı",
    selector: (row: StationType) => row.Title,
    sortable: true,
    width: "400px",
  },
  {
    name: "Marka",
    selector: (row: StationType) => row.BrandName,
    sortable: true,
  },
  {
    name: "İstasyon Kodu",
    selector: (row: StationType) => row.AffiliateCode,
    sortable: true,
  },
  {
    name: "İstasyon Numarası",
    selector: (row: StationType) => row.StationNumber,
    sortable: true,
  },
  {
    name: "Aktif",
    selector: (row: StationType) =>
      row.IsActive ? (
        <Image src={CheckIcon} width={40} height={40} alt="Aktif" />
      ) : (
        "Pasif"
      ),
    sortable: true,
    width: "70px",
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: StationType) => format(row.CreatedDate, "dd.MM.yyyy HH:ss"),
    sortable: true,
  },
  {
    name: "Düzenle",
    selector: (row: StationType) => (
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
