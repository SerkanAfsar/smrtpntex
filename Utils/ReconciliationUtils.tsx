import { ReconciliationType, StatusType } from "@/Types/Reconciliation.Types";
import { formatDate } from "date-fns";

export const ReconciliationColumns = (approveFunc: any, denyFunc: any) => [
  {
    name: "Distribütör",
    selector: (row: ReconciliationType) => row.DistributorName,
    sortable: true,
    width: "200px",
  },
  {
    name: "Marka Adı",
    selector: (row: ReconciliationType) => row.BrandName,
    sortable: true,
  },
  {
    name: "İstasyon Adı",
    selector: (row: ReconciliationType) => row.StationName,
    sortable: true,
  },

  {
    name: "Toplam Litre",
    selector: (row: ReconciliationType) => row.TotalLiter,
    sortable: true,
  },
  {
    name: "Toplam TL",
    selector: (row: ReconciliationType) => `${row.TotalWithTax} TL`,
    sortable: true,
  },
  {
    name: "Başlangıç Tarihi",
    selector: (row: ReconciliationType) =>
      formatDate(row.StartDate, "dd-MM-yyyy hh:mm"),
    sortable: true,
  },
  {
    name: "Bitiş Tarihi",
    selector: (row: ReconciliationType) =>
      formatDate(row.EndDate, "dd-MM-yyyy hh:mm"),
    sortable: true,
  },
  {
    name: "Statü",
    selector: (row: ReconciliationType) =>
      StatuConverter(row.StatusText, row.Id, approveFunc, denyFunc),
    sortable: true,
    width: "180px",
  },
];

const StatuConverter = (
  status: StatusType,
  id: number,
  approveFunc: any,
  denyFunc: any,
) => {
  switch (status) {
    case "Confirmed": {
      return "Onaylanmış";
    }
    case "Rejected": {
      return "Reddedilmiş";
    }

    case "Waiting": {
      return (
        // <div className="flex w-full items-center justify-center gap-3 p-1">
        //   <button
        //     type="button"
        //     className="rounded bg-blue-800 px-3 py-1 text-white"
        //     onClick={async () => await approveFunc(id)}
        //   >
        //     Onayla
        //   </button>
        //   <button
        //     type="button"
        //     className="rounded bg-red-800 px-3 py-1 text-white"
        //     onClick={async () => await denyFunc(id)}
        //   >
        //     Reddet
        //   </button>
        // </div>
        "Bekleme Durumunda"
      );
    }
    default: {
      return "Not Described";
    }
  }
};
