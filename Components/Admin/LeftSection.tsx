"use client";

import { cn } from "@/Utils";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import LeftSectionList from "./LeftSectionList";
import { Logo, SmartPoint3Logo } from "@/Utils/IconList";
import { usePathname } from "next/navigation";
import { MenuLinkItemType } from "@/Types/Common.Types";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { AdminMenuList } from "@/Utils/Variables";
import { SmartPoint2Logo } from "@/Utils/IconList";

export default function LeftSection() {
  const pathName = usePathname();

  const allMenuList = AdminMenuList.reduce<MenuLinkItemType[]>(
    (acc: any, next) => {
      if (next.menus.length) {
        next.menus.map((item) => {
          acc.push(item);
        });
      }
      return acc;
    },
    [],
  );
  const isConstant =
    allMenuList.find((a) => a.url == pathName)?.isOpenedForce || false;

  const { isOpened, toggleOpened } = useLeftMenuStore();

  useEffect(() => {
    toggleOpened(isConstant);
  }, [isConstant, toggleOpened]);

  return (
    <aside
      onMouseOver={() => !isConstant && toggleOpened(true)}
      onMouseLeave={() => !isConstant && toggleOpened(false)}
      className={cn(
        "fixed bottom-0 left-0 top-0 z-[100] overscroll-auto overscroll-contain border bg-white px-3 py-1 transition-all",
        isOpened ? "w-[244px]" : "w-[62px]",
      )}
    >
      <ul>
        <li className="flex w-full items-center justify-start gap-3">
          <Link
            href={"/"}
            className="relative flex w-full items-center justify-start gap-3 whitespace-nowrap px-2 py-3"
          >
            <Image
              src={SmartPoint3Logo}
              width={20}
              height={24}
              alt="Smartpoint"
            />
            <Image
              src={SmartPoint2Logo}
              width={70}
              height={24}
              alt="Smartpoint"
              className={cn(
                "sticky inset-0 transition-all",
                isOpened ? "visible opacity-100" : "hidden opacity-0",
              )}
            />
          </Link>
        </li>
      </ul>
      {AdminMenuList.map((menuList, index) => (
        <LeftSectionList
          menuList={menuList.menus}
          isHovered={isOpened}
          key={index}
        />
      ))}
    </aside>
  );
}
