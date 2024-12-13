import CustomButton from "@/Components/UI/CustomButton";
import CustomGrid from "@/Components/UI/CustomGrid";
import { PlusSmall } from "@/Utils/IconList";
import { DashboardDataTableProps } from "@/Utils/Variables";

export default function DashboardSectionThree() {
  return (
    <CustomGrid
      columns={DashboardDataTableProps.columns}
      data={DashboardDataTableProps.data}
      pagination={true}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold">Müşteriler</h4>
        <CustomButton
          title="Müşteri Ekle"
          className="bg-adminDarkBlueBg text-adminDarkBlue"
          icon={PlusSmall}
        />
      </div>
    </CustomGrid>
  );
}
