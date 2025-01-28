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
    <ul className="flex flex-col gap-1 border-b py-2 last:border-none">
      {menuList.map((menu, indexNo) => (
        <li
          key={indexNo}
          className="flex w-full items-center justify-start gap-3"
        >
          <Link
            className={cn(
              "relative flex w-full items-center gap-3 whitespace-nowrap rounded-md px-2 py-2.5 transition-all hover:bg-adminBgColor",
              pathName == menu.url && "bg-adminBgColor",
            )}
            onClick={async (e) => {
              if (menu.clickFunc) {
                e.preventDefault();
                await menu.clickFunc();
              }
            }}
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
                "block text-sm font-normal transition-all",
                isHovered
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-3 opacity-0",
              )}
            >
              {menu.title}
            </span>
          </Link>
        </li>
      ))}
      {/* <li className="flex w-full items-center justify-start gap-3">
        Güvenli Çıkış
      </li> */}
    </ul>
  );
}
