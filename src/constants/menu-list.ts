import { LayoutGrid, PackageSearchIcon, Settings2Icon } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
};

type MenuOption = {
  href: string;
  label: string;
  icon: any;
  subOptions?: Submenu[];
};

type Group = {
  label?: string;
  options: MenuOption[];
};

export const menuOptions: Group[] = [
  {
    options: [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutGrid,
      },
    ],
  },
  {
    label: "Páginas",
    options: [
      {
        href: "/initial",
        label: "Página Inicial",
        icon: PackageSearchIcon,
      },
      {
        href: "/products",
        label: "Produtos",
        icon: PackageSearchIcon,
        subOptions: [
          {
            href: "/products/categories",
            label: "Categorias",
          },
        ],
      },
    ],
  },
  {
    label: "Configurações",
    options: [
      {
        href: "/settings/account",
        label: "Configurações",
        icon: Settings2Icon,
      },
    ],
  },
];
