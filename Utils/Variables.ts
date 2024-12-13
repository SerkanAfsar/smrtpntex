import { MenuLinkGroupType } from "@/Types/Common.Types";
import {
  AnasayfaIcon,
  AraclarIcon,
  BpIcon,
  DistribitorlerIcon,
  FirmalarIcon,
  HelperIcon,
  IcerikYonetimiIcon,
  LogsIcon,
  PetronetIcon,
  ProductsIcon,
  SettingsIcon,
  TopluIslemlerIcon,
  UsersIcon,
} from "./IconList";

export const AdminMenuList: MenuLinkGroupType[] = [
  {
    sectionName: "One",
    menus: [
      {
        title: "Ana Sayfa",
        icon: AnasayfaIcon,
        url: "/Admin/Dashboard",
        isOpenedForce: true,
      },
      {
        title: "Distribütörler",
        icon: DistribitorlerIcon,
        url: "/Admin/Distrubutorler",
      },
      {
        title: "Firmalar",
        icon: FirmalarIcon,
        url: "/Admin/Firmalar",
      },
      {
        title: "Araçlar",
        icon: AraclarIcon,
        url: "/Admin/Araclar",
        isOpenedForce: true,
      },
    ],
  },
  {
    sectionName: "Two",
    menus: [
      {
        title: "BP Siparişleri",
        icon: BpIcon,
        url: "/Admin/BpOrders",
        isOpenedForce: true,
      },
      {
        title: "Petronet",
        icon: PetronetIcon,
        url: "/Admin/Petronet",
        isOpenedForce: true,
      },
    ],
  },
  {
    sectionName: "Three",
    menus: [
      {
        title: "Ürünler",
        icon: ProductsIcon,
        url: "/Admin/Urunler",
      },
      {
        title: "İçerik Yönetimi",
        icon: IcerikYonetimiIcon,
        url: "/Admin/IcerikYonetimi",
        isOpenedForce: true,
      },
      {
        title: "Ayarlar",
        icon: SettingsIcon,
        url: "/Admin/Ayarlar",
      },
      {
        title: "Loglar",
        icon: LogsIcon,
        url: "/Admin/Loglar",
        isOpenedForce: true,
      },
      {
        title: "Kullanıcılar",
        icon: UsersIcon,
        url: "/Admin/Kullanicilar",
        isOpenedForce: true,
      },
      {
        title: "Toplu İşlemler",
        icon: TopluIslemlerIcon,
        url: "/Admin/TopluIslemler",
        isOpenedForce: true,
      },
      {
        title: "Yardım",
        icon: HelperIcon,
        url: "/Admin/Yardim",
        isOpenedForce: true,
      },
    ],
  },
];

export const ChartsData = {
  chartOne: (color: any, title: string, todayCount: number, svg: any) => {
    return {
      type: "bar",
      data: {
        labels: [
          "1 Ekim",
          "2 Ekim",
          "3 Ekim",
          "4 Ekim",
          "5 Ekim",
          "6 Ekim",
          "7 Ekim",
          "8 Ekim",
        ],
        datasets: [
          {
            data: [100, 45, 65, 30, 80, 40, 55, 35],
            backgroundColor: color,
            borderRadius: 0,
            barThickness: 16,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { display: false },
            ticks: { display: false },
            border: { display: false },
          },
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              callback: function (value: any, index: number) {
                // this kullanımını kaldırdık, direkt fonksiyonu çağırıyoruz
                return index === 0 || index === 7 ? String(value) : "";
              },
              font: {
                family: "Inter",
                size: 12,
                weight: "400",
              },
              maxRotation: 0,
              minRotation: 0,
              autoSkip: false,
            },
          },
        },
      },
      title,
      todayCount,
      svg,
    };
  },
  chartTwo: {
    type: "line",
    data: {
      labels: Array.from({ length: 19 }, (_, i) => (i + 1).toString()),
      datasets: [
        {
          data: [
            1200, 700, 800, 2200, 2500, 1400, 1100, 1800, 2200, 1300, 1200,
            2300, 1500, 1200, 2100, 1800, 1500, 2400, 2200,
          ],
          fill: true,
          backgroundColor: "rgba(203, 213, 255, 0.7)",
          borderColor: "rgba(203, 213, 255, 1)",
          borderWidth: 1,
          pointRadius: 0,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
        },
        y: {
          beginAtZero: true,
          border: { display: false },
          grid: { color: "rgba(0, 0, 0, 0.05)" },
          ticks: {
            stepSize: 500,
            padding: 8,
          },
        },
      },
    },
    title: "Satışlar",
  },
};
export const ChartDataColors = {
  reportChart1: "#2970FF",
  reportChart2: "#EF6820",
  reportChart3: "#16B364",
  reportChart4: "#E31B54",
};

export const DashboardDataTableProps = {
  columns: ["Kullanıcı Adı", "Adı Soyadı", "Üye Tipi", "Kayıt Tarihi"],
  data: [
    ["johndoe", "John Doe	", "Premium", "01.01.2024"],
    ["johndoe", "John Doe	", "Premium", "01.01.2024"],
    ["johndoe", "John Doe	", "Premium", "01.01.2024"],
    ["johndoe", "John Doe	", "Premium", "01.01.2024"],
  ],
};

export const AraclarDatatableProps = {
  columns: ["Plaka", "Üye Adı", "Tutar", "Kayıt Tarihi"],
  data: [
    ["35 XYZ 456", "Ayşe Demir", "750.00", "02.11.2024 14:50:10"],
    ["35 XYZ 123", "Ayşe Demir2", "750.00", "02.11.2024 14:50:10"],
    ["35 XYZ 222", "Ayşe Demir3", "750.00", "02.11.2024 14:50:10"],
    ["35 XYZ 333", "Ayşe Demir4", "750.00", "02.11.2024 14:50:10"],
    ["35 XYZ 444", "Ayşe Demir5", "750.00", "02.11.2024 14:50:10"],
    ["35 XYZ 555", "Ayşe Demir6", "750.00", "02.11.2024 14:50:10"],
    ["35 XYZ 666", "Ayşe Demir7", "750.00", "02.11.2024 14:50:10"],
    ["35 XYZ 777", "Ayşe Demir8", "750.00", "02.11.2024 14:50:10"],
  ],
};

export const BpDatatableProps = {
  columns: [
    "Sipariş No",
    "İstasyon",
    "Litre",
    "Durum",
    "Sipariş Tarihi",
    "Kayıt Tarihi",
  ],
  data: [
    [
      "SIP12345",
      "İstanbul İstasyon	",
      "500",
      "Aktif",
      "01.11.2024 10:20:30",
      "01.11.2024 10:20:30",
    ],
  ],
};
