import { ChartsData } from "@/Utils/Variables";
import GraphicChartComponent from "./GraphicChartComponent";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import { MemberType } from "@/Types/Member.Types";
import { formatDate } from "date-fns";

export const MainPageMemberTypes = [
  // {
  //   name: "Üye Tipi",
  //   selector: (row: MemberType) => row.MemberTypeName,
  //   sortable: true,
  // },
  // {
  //   name: "Kullanıcı Adı",
  //   selector: (row: MemberType) => row.UserName,
  //   sortable: true,
  // },
  {
    name: "Üye Adı Soyadı",
    selector: (row: MemberType) => row.DisplayName,
    sortable: true,
  },
  {
    name: "Gsm",
    selector: (row: MemberType) => row.Gsm,
    sortable: true,
  },
  // {
  //   name: "Aktif",
  //   selector: (row: MemberType) => row.IsActive,
  //   sortable: true,
  // },
  {
    name: "Kayıt Tarihi",
    selector: (row: MemberType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
];

export default function DashboardSectionTwo() {
  return (
    <div className="relative grid h-auto w-full grid-cols-2 gap-6">
      <GraphicChartComponent elem={ChartsData.chartTwo} />
      {/* <GraphicChartComponent elem={{ title: "Üyeler" }} /> */}
      <div className="flex w-full flex-col gap-6 rounded-md bg-white p-4 shadow-md">
        <h4 className="w-full border-b pb-4 text-left">Üyeler</h4>
        <div className="relative h-60 overflow-auto">
          <CustomDatatable
            apiUrl={"/api/member/members"}
            columns={MainPageMemberTypes}
          />
        </div>
      </div>
    </div>
  );
}
