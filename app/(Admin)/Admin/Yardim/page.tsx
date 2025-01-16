import { Metadata } from "next";
import HelpContainer from "./Containers/HelpContainer";
import {
  GetHelpDescStatusService,
  GetHelpDescSubjectsService,
} from "@/Services/HelpDescService";
import { CustomOptionsType, PaginationType } from "@/Types/Common.Types";
import { HelpDescCommonType } from "@/Types/Help.Types";
import { getResultData } from "@/Utils";

export const metadata: Metadata = {
  title: "Yardım",
};
export default async function Page() {
  const [subjectResult, statusResult] = await Promise.all([
    GetHelpDescSubjectsService(),
    GetHelpDescStatusService(),
  ]);
  if (!subjectResult.IsSuccess || !statusResult.IsSuccess) {
    throw new Error(
      subjectResult.Message || statusResult.Message || "Err throws",
    );
  }
  const statusListData =
    (getResultData<HelpDescCommonType>(
      statusResult,
      "List",
    ) as HelpDescCommonType[]) || [];

  const statusList: CustomOptionsType[] = statusListData.map((item) => ({
    name: item.Result.Title,
    value: item.Result.Id,
  }));

  const subjectListData =
    (getResultData<HelpDescCommonType>(
      subjectResult,
      "List",
    ) as HelpDescCommonType[]) || [];

  const subjectList: CustomOptionsType[] = subjectListData.map((item) => ({
    name: item.Result.Title,
    value: item.Result.Id,
  }));

  return <HelpContainer statusList={statusList} subjectList={subjectList} />;
}
