import CustomDatatable from "@/Components/UI/CustomDataTable";
import { DashboardKullanicilarDataTableColumns } from "@/Utils/KullanicilarUtils";

export default function DashboardSectionThree() {
  return (
    <div className="flex w-full flex-col gap-2">
      <h4 className="text-lg font-bold">Kayıtlı Kullanıcılar</h4>
      <CustomDatatable
        extraClass="border border-b-0"
        columns={DashboardKullanicilarDataTableColumns}
        apiUrl={"/api/users/userlist"}
      />
    </div>
  );
}
