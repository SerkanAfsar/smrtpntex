import { HelpDescItemType } from "@/Types/Help.Types";
import { format } from "date-fns";

export const HelpHeaderColumns = [
  {
    name: "Üye Adı",
    selector: (row: HelpDescItemType) => row.MemberId,
    sortable: true,
  },
  {
    name: "Konu",
    selector: (row: HelpDescItemType) => row.SubjectId,
    sortable: true,
  },
  {
    name: "Yorum",
    selector: (row: HelpDescItemType) => row.Comment,
    sortable: true,
  },
  {
    name: "Durum",
    selector: (row: HelpDescItemType) => row.StatusId,
    sortable: true,
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: HelpDescItemType) =>
      format(row.CreatedDate, "dd.MM.yyyy hh:ss"),
    sortable: true,
  },
];
