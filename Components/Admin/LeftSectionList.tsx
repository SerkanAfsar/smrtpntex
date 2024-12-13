import { MenuLinkItemType } from "@/Types/Common.Types";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/Utils";
import { usePathname } from "next/navigation";

export default function LeftSectionList({
  menuList,
  isHovered,
}: {
  menuList: MenuLinkItemType[];
  isHovered: boolean;
}) {
  const pathName = usePathname();
  return (
    <ul className="border-b flex flex-col gap-1 py-2">
      {menuList.map((menu, indexNo) => (
        <li
          key={indexNo}
          className="w-full flex gap-3 items-center justify-start"
        >
          <Link
            className={cn(
              "flex hover:bg-adminBgColor rounded-md w-full transition-all whitespace-nowrap relative gap-3 px-2 py-3 items-center",
              pathName == menu.url && "bg-adminBgColor"
            )}
            href={menu.url}
            title={menu.title}
          >
            <Image
              src={menu.icon as any}
              width={20}
              height={20}
              alt={menu.title}
            />
            <span
              className={cn(
                "block transition-all text-sm font-normal",
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-3"
              )}
            >
              {menu.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
