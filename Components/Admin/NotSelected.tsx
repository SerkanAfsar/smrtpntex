import { NotSelectedIcon } from "@/Utils/IconList";
import Image from "next/image";

export type NotSelectedType = {
  title: string;
  action: () => void;
  buttonTitle: string;
};
export default function NotSelected({
  title,
  action,
  buttonTitle,
}: NotSelectedType) {
  return (
    <div className="flex w-[500px] flex-col items-center justify-center gap-3 rounded-lg border-dotted bg-white p-8 text-center">
      <Image src={NotSelectedIcon} width={90} height={90} alt="Smartpoint" />
      <h3 className="text-lg font-medium">Henüz {title} Seçmediniz.</h3>
      <p className="text-[14px]">
        {title} ait verilere erişmek için sol panelden bir {title} seçin,
        seçiniz sonrası bu alan güncellenecektir.
      </p>
      <p className="text-xs leading-6">
        {title} bilgisi güncellemek için sol paneldeki {title}
        listesindeyken çıkan kalem işaretine basınız.
      </p>
      <button
        type="button"
        onClick={() => action()}
        className="text-md flex items-center justify-center rounded-md bg-[#2970FF] px-5 py-3 text-sm text-white"
      >
        {buttonTitle}
      </button>
    </div>
  );
}
