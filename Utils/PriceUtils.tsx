import Image from "next/image";
import { format } from "date-fns";
import { PriceType } from "@/Types/Price.Types";
import { Delete2, Delete3, Edit2, EditIcon } from "./IconList";

export const PriceHeaderColumns = (editCommand: any, deleteCommand: any) => [
  {
    name: "Başlangıç Tarihi",
    selector: (row: PriceType) => format(row.StartDate, "dd.MM.yyyy HH:ss"),
    sortable: true,
  },
  {
    name: "Bitiş Tarihi",
    selector: (row: PriceType) => format(row.FinishDate, "dd.MM.yyyy HH:ss"),
    sortable: true,
  },
  {
    name: "Firma Adı",
    selector: (row: PriceType) => row.CompanyName,
    sortable: true,
  },
  {
    name: "Üye Adı",
    selector: (row: PriceType) => row.MemberName,
    sortable: true,
  },
  {
    name: "Yeni Fiyat",
    selector: (row: PriceType) => row.NewAmount,
    sortable: true,
  },
  {
    name: "İndirim Oranı",
    selector: (row: PriceType) => row.DiscountRatio,
    sortable: true,
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: PriceType) => format(row.CreatedDate, "dd.MM.yyyy HH:ss"),
    sortable: true,
  },

  {
    width: "80px",
    name: "İşlemler",
    selector: (row: any) => (
      <div className="flex items-center justify-center gap-3">
        <Image
          src={EditIcon}
          width={20}
          height={20}
          alt="Edit"
          className="cursor-pointer"
          onClick={async () => editCommand({ id: row.Id })}
        />
        <Image
          src={Delete3}
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
