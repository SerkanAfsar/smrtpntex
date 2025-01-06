import { StationType } from "@/Types/Station.Types";
import { CheckIcon, Delete2, Edit2 } from "./IconList";

import Image from "next/image";
import { format } from "date-fns";

export const StationListHeaderColumns = (
  editCommand: any,
  deleteCommand: any,
) => [
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
    name: "Durum",
    selector: (row: StationType) =>
      row.IsActive ? (
        <Image src={CheckIcon} width={40} height={40} alt="Aktif" />
      ) : (
        <div className="flex h-[40px] w-[40px] items-center justify-center">
          ❌
        </div>
      ),
    sortable: true,
    width: "70px",
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: StationType) => format(row.CreatedDate, "dd.MM.yyyy HH:ss"),
    sortable: true,
  },
  // {
  //   name: "Düzenle",
  //   selector: (row: StationType) => (
  //     <CustomButton
  //       className={
  //         "w-full gap-1 rounded-md border border-black bg-gray-900 px-3 py-2 text-white"
  //       }
  //       onClick={async () => await editCommand({ id: row.Id })}
  //       title={"Düzenle"}
  //     />
  //   ),
  //   sortable: true,
  //   width: "150px",
  // },
  {
    width: "80px",
    name: "İşlemler",
    selector: (row: any) => (
      <div className="flex items-center justify-center gap-3">
        <Image
          src={Edit2}
          width={20}
          height={20}
          alt="Edit"
          className="cursor-pointer"
          onClick={async () => editCommand({ id: row.Id })}
        />
        <Image
          src={Delete2}
          width={20}
          height={20}
          alt="Delete"
          className="cursor-pointer"
          onClick={async () => deleteCommand({ id: row.Id })}
        />
      </div>
    ),
  },
];
