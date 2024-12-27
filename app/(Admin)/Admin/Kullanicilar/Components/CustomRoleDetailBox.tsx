"use client";

import CustomCheckbox from "@/Components/UI/CustomCheckbox";
import {
  AddPropertyToRoleService,
  DeletePropertFromRoleService,
} from "@/Services/RoleService";
import { PermissionPageType } from "@/Types/Permission.Types";
import { RoleType } from "@/Types/Role.Types";
import { cn } from "@/Utils";
import { ArrowRight } from "@/Utils/IconList";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CustomRoleDetailBox({
  item,
  rolePermissionList,
  roleItem,
  setIsUpdated,
}: {
  item: PermissionPageType;
  rolePermissionList: PermissionPageType[];
  roleItem: RoleType | null;
  setIsUpdated: any;
}) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleCheckProperty = useCallback(
    async ({ pageId }: { pageId: number }) => {
      if (pageId != 0) {
        const result = await AddPropertyToRoleService({
          pageId,
          roleId: roleItem?.Id as number,
        });
        if (result.IsSuccess) {
          toast.success(`'${roleItem?.Name}' Rolüne Özellik Atandı `, {
            position: "top-right",
          });
          setIsUpdated((prev: boolean) => !prev);
        } else {
          toast.error(result.Message || "Hata", { position: "top-right" });
        }
      }
    },
    [roleItem?.Name, roleItem?.Id, setIsUpdated],
  );

  const handleRemoveProperty = useCallback(
    async ({ id }: { id: number }) => {
      if (id) {
        const result = await DeletePropertFromRoleService({ id });
        if (result.IsSuccess) {
          toast.success("Özellik Kaldırıldı", { position: "top-right" });
          setIsUpdated((prev: boolean) => !prev);
        } else {
          toast.error(result.Message || "Hata", { position: "top-right" });
        }
      }
    },
    [setIsUpdated],
  );

  useEffect(() => {
    return () => {
      setIsOpened(false);
    };
  }, [roleItem]);

  const returnRecursive = (mainItem: PermissionPageType | null) => {
    if (!mainItem?.Childrens || !mainItem.Childrens.length) {
      return (
        <CustomCheckbox
          checked={!!rolePermissionList.find((a) => a.PageId === item.PageId)}
          title={mainItem?.PageName}
          onChange={async (e) => {
            if (e.target.checked) {
              await handleCheckProperty({
                pageId: mainItem?.PageId as number,
              });
            } else {
              await handleRemoveProperty({
                id: rolePermissionList.find((a) => a.PageId == mainItem?.PageId)
                  ?.Id as number,
              });
            }
          }}
        />
      );
    }
    return (
      <ul className="flex w-full flex-col gap-3 text-sm">
        {item?.Childrens?.map((innerItem, index) => (
          <li key={index}>
            <CustomCheckbox
              title={innerItem.PageName}
              checked={
                !!rolePermissionList.find((a) => a.PageId == innerItem.PageId)
              }
              onChange={async (e) => {
                setIsUpdated((prev: boolean) => !prev);
                if (e.target.checked) {
                  await handleCheckProperty({
                    pageId: innerItem?.PageId as number,
                  });
                  e.target.checked = true;
                } else {
                  await handleRemoveProperty({
                    id: rolePermissionList.find(
                      (a) => a.PageId == innerItem?.PageId,
                    )?.Id as number,
                  });
                }
              }}
            />
            {innerItem.Childrens && returnRecursive(innerItem)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col rounded-md border">
      <div
        className="flex cursor-pointer items-center justify-between p-3 py-4 text-sm"
        onClick={() => setIsOpened(!isOpened)}
      >
        <span>{item.PageName}</span>
        <Image
          className={cn("transition-all", isOpened ? "rotate-90" : "rotate-0")}
          src={ArrowRight}
          width={10}
          height={10}
          alt="SmartPoint"
        />
      </div>
      <div
        className={cn(
          "w-full border-t p-3 py-4",
          isOpened ? "block" : "hidden",
        )}
      >
        {returnRecursive(item)}
      </div>
    </div>
  );
}
