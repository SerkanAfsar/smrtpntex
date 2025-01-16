import { tr } from "date-fns/locale";
import { MenuLinkGroupType } from "@/Types/Common.Types";
import Image from "next/image";
import {
  AnasayfaIcon,
  AraclarIcon,
  BpIcon,
  Delete2,
  DistribitorlerIcon,
  Edit2,
  FirmalarIcon,
  HelperIcon,
  IcerikYonetimiIcon,
  LogsIcon,
  PetronetIcon,
  ProductsIcon,
  UsersIcon,
} from "./IconList";
import {
  PetronetDealerSalesType,
  PetronetTankSimulesType,
  PetronetTankStatusType,
  PetronetTankTransactionsType,
} from "@/Types/Petronet.Types";
import { format, formatDate } from "date-fns";
import {
  CompanyCarType,
  CompanyInvoiceType,
  CompanySalesType,
  CompanyUserType,
  CreditCartType,
  CurrentAccountType,
  OtorizationType,
} from "@/Types/Company.Types";
import { MemberType, MemberTypeType } from "@/Types/Member.Types";
import { CarBrandType, CarType } from "@/Types/Car.Types";
import {
  DistributorCarType,
  DistributorCompanyType,
  DistributorCurrentAccountType,
  DistributorSaleType,
  DistributorUserType,
} from "@/Types/Distrubitor.Types";
import { SystemLogType, UserLogType } from "@/Types/Log.Types";

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
    sectionName: "Three",
    menus: [
      {
        title: "Ürünler",
        icon: ProductsIcon,
        url: "/Admin/Urunler",
      },
      {
        title: "Fiyatlar",
        icon: ProductsIcon,
        url: "/Admin/Fiyatlar",
        isOpenedForce: true,
      },
      // {
      //   title: "İçerik Yönetimi",
      //   icon: IcerikYonetimiIcon,
      //   url: "/Admin/IcerikYonetimi",
      //   isOpenedForce: true,
      // },
      {
        title: "İstasyonlar",
        icon: IcerikYonetimiIcon,
        url: "/Admin/Istasyonlar",
        isOpenedForce: true,
      },
      // {
      //   title: "Ayarlar",
      //   icon: SettingsIcon,
      //   url: "/Admin/Ayarlar",
      // },
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
        title: "Üyeler",
        icon: UsersIcon,
        url: "/Admin/Uyeler",
        isOpenedForce: true,
      },
      // {
      //   title: "Toplu İşlemler",
      //   icon: TopluIslemlerIcon,
      //   url: "/Admin/TopluIslemler",
      //   isOpenedForce: true,
      // },
      {
        title: "Yardım",
        icon: HelperIcon,
        url: "/Admin/Yardim",
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
  columns: [
    {
      name: "Plaka",
      selector: (row: CarType) => row.PlateNumber,
      sortable: true,
    },
    {
      name: "GSM",
      selector: (row: CarType) => row.UserName,
      sortable: true,
    },
    {
      name: "Üye Adı",
      selector: (row: CarType) => `${row.FirstName} ${row.LastName}`,
      sortable: true,
    },
    // {
    //   name: "Firma",
    //   selector: (row: CarType) => row.CompanyName,
    //   sortable: true,
    // },
    // {
    //   name: "Kayıt Tarihi",
    //   selector: (row: any) => format(row.CreatedDate, "dd/MM/yyyy HH:ss"),
    //   sortable: true,
    // },
  ],
};

export const BpDatatableProps = (editFunc: any, deleteFunc: any) => [
  {
    name: "Sipariş No",
    selector: (row: any) => row.OrderCode,
    sortable: true,
  },
  {
    name: "İstasyon",
    selector: (row: any) => row.StationName,
    sortable: true,
  },
  {
    name: "Litre",
    selector: (row: any) => row.Quantity,
    sortable: true,
  },
  {
    name: "Durum",
    selector: (row: any) => row.StateMessage,
    sortable: true,
  },
  {
    name: "Sipariş Tarihi",
    selector: (row: any) => format(row.OrderDate, "dd/MM/yyyy HH:ss"),
    sortable: true,
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: any) => format(row.CreatedDate, "dd/MM/yyyy HH:ss"),
    sortable: true,
  },
  {
    name: "İşlemler",
    width: "80px",
    selector: (row: any) => (
      <div className="flex items-center justify-center gap-3">
        <Image
          src={Edit2}
          width={20}
          height={20}
          alt="Edit"
          className="cursor-pointer"
          onClick={async () => editFunc({ id: row.Id })}
        />
        <Image
          src={Delete2}
          width={20}
          height={20}
          alt="Delete"
          className="cursor-pointer"
          onClick={async () => deleteFunc({ id: row.Id })}
        />
      </div>
    ),
    sortable: false,
  },
];

export const PetronetDealerColumns = [
  {
    name: "Bayi Id",
    selector: (row: any) => row.DealerId,
    sortable: true,
    width: "100px",
  },
  {
    name: "Lisans No",
    selector: (row: any) => row.LisenceNumber,
    sortable: true,
    width: "150px",
  },
  {
    name: "Bayi Ünvan",
    selector: (row: any) => row.Title,
    sortable: true,
  },
  {
    name: "Şehir",
    selector: (row: any) => row.CityName,
    sortable: true,
    width: "120px",
  },
  {
    name: "Online",
    selector: (row: any) => row.IsOnline,
    sortable: true,
    width: "100px",
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: any) => formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
];

export const PetronetDealerSalesColumns = [
  {
    name: "Bayi Id",
    selector: (row: any) => row.DealerId,
    sortable: true,
    width: "100px",
  },
  {
    name: "Lisans No",
    selector: (row: any) => row.LisansNo,
    sortable: true,
    width: "110px",
  },
  {
    name: "Bayi Ünvan",
    selector: (row: any) => row.Unvan,
    sortable: true,
    width: "240px",
  },
  {
    name: "Şehir",
    selector: (row: any) => row.Sehir,
    sortable: true,
  },
  {
    name: "Plaka",
    selector: (row: any) => row.Plaka,
    sortable: true,
  },
  {
    name: "Fiyat",
    selector: (row: any) => row.Tutar,
    sortable: true,
    width: "80px",
  },
  {
    name: "Litre",
    selector: (row: any) => row.Litre,
    sortable: true,
    width: "80px",
  },
  {
    name: "Kart Tip",
    selector: (row: any) => row.KartTip,
    sortable: true,
  },
  {
    name: "Satış Tarihi",
    selector: (row: PetronetDealerSalesType) =>
      format(row.TarihSaat, "dd.MM.yyy HH:mm:ss", { locale: tr }),
    sortable: true,
  },

  {
    name: "Kayıt Tarihi",
    selector: (row: PetronetDealerSalesType) =>
      format(row.CreatedDate, "dd.MM.yyy HH:mm:ss", { locale: tr }),
    sortable: true,
  },
];

export const PetronetTankStatusHeaders = [
  {
    name: "Bayi Adı",
    selector: (row: PetronetTankStatusType) => row.Ad,
    sortable: true,
  },
  {
    name: "Lisans No",
    selector: (row: PetronetTankStatusType) => row.LisansNo,
    sortable: true,
  },
  {
    name: "Tank Kapasitesi",
    selector: (row: PetronetTankStatusType) => row.KapasiteHacim,
    sortable: true,
  },
  {
    name: "Kalibrasyon",
    selector: (row: PetronetTankStatusType) => row.Kalibrasyon,
    sortable: true,
  },
  {
    name: "Sıcaklık",
    selector: (row: PetronetTankStatusType) => row.SpeedWire,
    sortable: true,
  },
];

export const PetronetTransactionsColumns = [
  {
    name: "Bayi Id",
    selector: (row: PetronetTankTransactionsType) => row.DealerId,
    sortable: true,
    width: "100px",
  },
  {
    name: "Lisans No",
    selector: (row: PetronetTankTransactionsType) => row.LisansNo,
    sortable: true,
  },
  {
    name: "Bayi Ünvan",
    selector: (row: PetronetTankTransactionsType) => row.BayiUnvan,
    sortable: true,
    width: "200px",
  },
  {
    name: "E.Yakıt",
    selector: (row: PetronetTankTransactionsType) => row.EpdkYakitAd,
    sortable: true,
    width: "100px",
  },
  {
    name: "Yakıt Seviye",
    selector: (row: PetronetTankTransactionsType) => row.YakitSeviye,
    sortable: true,
  },
  {
    name: "Yakıt Litre",
    selector: (row: PetronetTankTransactionsType) => row.YakitHacim,
    sortable: true,
  },
  {
    name: "Su Seviye",
    selector: (row: PetronetTankTransactionsType) => row.SuSeviye,
    sortable: true,
  },
  {
    name: "Su Litre",
    selector: (row: PetronetTankTransactionsType) => row.SuHacim,
    sortable: true,
  },
  {
    name: "Sıcaklık",
    selector: (row: PetronetTankTransactionsType) => row.YakitSicaklik,
    sortable: true,
    width: "80px",
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: PetronetTankTransactionsType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
];

export const PetronetTankSimulesColumns = [
  {
    name: "Bayi Adı",
    selector: (row: PetronetTankSimulesType) => row.Title,
    sortable: true,
    width: "250px",
  },
  {
    name: "Tank Adı",
    selector: (row: PetronetTankSimulesType) => row.TankAd,
    sortable: true,
  },
  {
    name: "Tank Kapasitesi",
    selector: (row: PetronetTankSimulesType) => row.KapasiteHacim,
    sortable: true,
  },
  {
    name: "Yakıt Hacmi",
    selector: (row: PetronetTankSimulesType) => row.YakitHacim,
    sortable: true,
    width: "120px",
  },
  {
    name: "Boş Hacim",
    selector: (row: PetronetTankSimulesType) => row.BosHacim,
    sortable: true,
  },
  {
    name: "Su Seviyesi",
    selector: (row: PetronetTankSimulesType) => row.SuSeviye,
    sortable: true,
  },
  {
    name: "Su Hacmi",
    selector: (row: PetronetTankSimulesType) => row.SuHacim,
    sortable: true,
  },
  {
    name: "Sıcaklık",
    selector: (row: PetronetTankSimulesType) => row.YakitSicaklik,
    sortable: true,
  },
];

export const CompanySalesColumns = [
  {
    name: "Üye Adı",
    selector: (row: CompanySalesType) => row.UserName,
    sortable: true,
  },
  {
    name: "Firma Adı",
    selector: (row: CompanySalesType) => row.CompanyName,
    sortable: true,
    width: "250px",
  },
  {
    name: "İstasyon",
    selector: (row: CompanySalesType) => row.StationName,
    sortable: true,
  },
  {
    name: "Tank Adı",
    selector: (row: CompanySalesType) => row.TankName,
    sortable: true,
  },
  {
    name: "Plaka",
    selector: (row: CompanySalesType) => row.PlateNumber,
    sortable: true,
  },
  {
    name: "Satış Miktarı (L)",
    selector: (row: CompanySalesType) => row.Liter,
    sortable: true,
  },
  {
    name: "Satış Tutarı",
    selector: (row: CompanySalesType) => row.Total,
    sortable: true,
  },
  {
    name: "Satış Tarihi",
    selector: (row: CompanySalesType) =>
      formatDate(row.SaleDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: CompanySalesType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
];

export const CompanyUserListColumns = [
  {
    name: "Üye Adı",
    selector: (row: CompanyUserType) => row.UserName,
    sortable: true,
  },
  {
    name: "Üye Tipi",
    selector: (row: CompanyUserType) => row.MemberTypeName,
    sortable: true,
  },
  {
    name: "Firma Adı",
    selector: (row: CompanyUserType) => row.CompanyName,
    sortable: true,
  },
  {
    name: "E-Mail",
    selector: (row: CompanyUserType) => row.Email,
    sortable: true,
  },
  {
    name: "Gsm",
    selector: (row: CompanyUserType) => row.Gsm,
    sortable: true,
  },
  {
    name: "Gösterim Adı",
    selector: (row: CompanyUserType) => row.DisplayName,
    sortable: true,
  },

  {
    name: "Kayıt Tarihi",
    selector: (row: CompanyUserType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
];

export const CompanyCurrentAccountListColumns = [
  {
    name: "Ödeme Tipi",
    selector: (row: CurrentAccountType) => row.PaymentMethodName,
    sortable: true,
  },
  {
    name: "Kullanıcı Adı",
    selector: (row: CurrentAccountType) => row.UserName,
    sortable: true,
  },
  {
    name: "Üye Adı",
    selector: (row: CurrentAccountType) => row.MemberName,
    sortable: true,
  },
  {
    name: "Firma Adı",
    selector: (row: CurrentAccountType) => row.CompanyName,
    sortable: true,
    width: "300px",
  },
  {
    name: "Kullanıcı Adı",
    selector: (row: CurrentAccountType) => row.UserName,
    sortable: true,
  },
  {
    name: "Açıklama",
    selector: (row: CurrentAccountType) => row.Description,
    sortable: true,
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: CurrentAccountType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
];

export const CompanyOtorizationsListColumns = [
  {
    name: "Takma Adı",
    selector: (row: OtorizationType) => row.Alias,
    sortable: true,
  },
  {
    name: "İşlem",
    selector: (row: OtorizationType) => row.ActionName,
    sortable: true,
  },
  {
    name: "Tutar",
    selector: (row: OtorizationType) => row.Amount,
    sortable: true,
  },
  {
    name: "Mesaj",
    selector: (row: OtorizationType) => row.ReturnMessage,
    sortable: true,
    width: "300px",
  },
  {
    name: "Statü",
    selector: (row: OtorizationType) => row.StatusText,
    sortable: true,
  },

  {
    name: "Kayıt Tarihi",
    selector: (row: OtorizationType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
];

export const MemberColumnHeaders = (editFunc: any, deleteFunc: any) => [
  {
    name: "Üye Tipi",
    selector: (row: MemberType) => row.MemberTypeName,
    sortable: true,
  },
  {
    name: "Kullanıcı Adı",
    selector: (row: MemberType) => row.UserName,
    sortable: true,
  },
  {
    name: "Görünür İsim",
    selector: (row: MemberType) => row.DisplayName,
    sortable: true,
  },
  {
    name: "Gsm",
    selector: (row: MemberType) => row.Gsm,
    sortable: true,
  },
  {
    name: "Aktif",
    selector: (row: MemberType) => row.IsActive,
    sortable: true,
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: MemberType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
  {
    name: "İşlemler",
    width: "80px",
    selector: (row: any) => (
      <div className="flex items-center justify-center gap-3">
        <Image
          src={Edit2}
          width={20}
          height={20}
          alt="Edit"
          className="cursor-pointer"
          onClick={async () => editFunc({ id: row.Id })}
        />
        <Image
          src={Delete2}
          width={20}
          height={20}
          alt="Delete"
          className="cursor-pointer"
          onClick={async () => deleteFunc({ id: row.Id })}
        />
      </div>
    ),
    sortable: false,
  },
];

export const MemberTypeColumnHeaders = [
  {
    name: "Id",
    selector: (row: MemberTypeType) => row.Id,
    sortable: true,
  },
  {
    name: "Üye Tipi",
    selector: (row: MemberTypeType) => row.Description,
    sortable: true,
  },
];

export const DistributorSatisColumnHeaders = [
  {
    name: "Firma Adı",
    selector: (row: DistributorSaleType) => row.CompanyName,
    sortable: true,
  },
  {
    name: "Üye Adı",
    selector: (row: DistributorSaleType) => row.MemberId,
    sortable: true,
  },
  {
    name: "İstasyon Adı",
    selector: (row: DistributorSaleType) => row.StationName,
    sortable: true,
  },
  {
    name: "Plaka",
    selector: (row: DistributorSaleType) => row.PlateNumber,
    sortable: true,
  },
  {
    name: "Ödeme",
    selector: (row: DistributorSaleType) => row.PaymentMethodId,
    sortable: true,
  },
  {
    name: "Birim Fiyatı",
    selector: (row: DistributorSaleType) => row.UnitPrice,
    sortable: true,
  },
  {
    name: "Miktar",
    selector: (row: DistributorSaleType) => row.Liter,
    sortable: true,
  },
  {
    name: "İskonto",
    selector: (row: DistributorSaleType) => row.DiscountRatio,
    sortable: true,
  },

  {
    name: "Toplam (TL)",
    selector: (row: DistributorSaleType) =>
      new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        currencyDisplay: "code",
      })
        .format(row.Total)
        .replace("TRY", "")
        .trim(),
    sortable: true,
  },
  {
    name: "Satış Tarihi",
    selector: (row: DistributorSaleType) =>
      row.SaleDate ? formatDate(row.SaleDate, "dd.MM.yyy hh:MM") : "",
    sortable: true,
  },
];

export const CompanyCarListTypeHeaders = (editFunc: any, deleteFunc: any) => [
  {
    name: "Plaka",
    selector: (row: CompanyCarType) => row.PlateNumber,
    sortable: true,
  },
  {
    name: "Marka",
    selector: (row: CompanyCarType) => row.BrandName,
    sortable: true,
  },
  {
    name: "Model",
    selector: (row: CompanyCarType) => row.ModelName,
    sortable: true,
  },
  // {
  //   name: "Firma",
  //   selector: (row: CompanyCarType) => row.CompanyName,
  //   sortable: true,
  //   width: "300px",
  // },
  {
    name: "Üye Ad Soyad",
    selector: (row: CompanyCarType) => `${row.FirstName} ${row.LastName}`,
    sortable: true,
  },
  // {
  //   name: "Firma",
  //   selector: (row: CompanyCarType) => row.CompanyName,
  //   sortable: true,
  // },

  {
    name: "Kayıt Tarihi",
    selector: (row: CompanyCarType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
  {
    name: "İşlemler",
    width: "80px",
    selector: (row: any) => (
      <div className="flex items-center justify-center gap-3">
        <Image
          src={Edit2}
          width={20}
          height={20}
          alt="Edit"
          className="cursor-pointer"
          onClick={async () => editFunc({ id: row.Id })}
        />
        <Image
          src={Delete2}
          width={20}
          height={20}
          alt="Delete"
          className="cursor-pointer"
          onClick={async () => deleteFunc({ id: row.Id })}
        />
      </div>
    ),
    sortable: false,
  },
];

export const DistributorCompaniesTypeHeaders = [
  {
    name: "Başlık",
    selector: (row: DistributorCompanyType) => row.Title,
    sortable: true,
  },

  {
    name: "Vergi Dairesi",
    selector: (row: DistributorCompanyType) => row.TaxOffice,
    sortable: true,
  },
  {
    name: "Vergi Numarası",
    selector: (row: DistributorCompanyType) => row.TaxNumber,
    sortable: true,
  },

  {
    name: "Uyarı Limiti",
    selector: (row: DistributorCompanyType) =>
      new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        currencyDisplay: "code",
      })
        .format(row.AlertLimit)
        .replace("TRY", "")
        .trim(),
    sortable: true,
  },
  {
    name: "Risk Limiti",
    selector: (row: DistributorCompanyType) =>
      new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        currencyDisplay: "code",
      })
        .format(row.RiskLimit)
        .replace("TRY", "")
        .trim(),
    sortable: true,
  },

  {
    name: "Kayıt Tarihi",
    selector: (row: DistributorCompanyType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
];

export const DistributorCarsTypeHeaders = [
  {
    name: "Başlık",
    selector: (row: DistributorCarType) => row.Title,
    sortable: true,
  },

  {
    name: "Ad Soyad",
    selector: (row: DistributorCarType) => `${row.FirstName} ${row.LastName}`,
    sortable: true,
  },
  {
    name: "Firma Adı",
    selector: (row: DistributorCarType) => row.CompanyName,
    sortable: true,
  },
  {
    name: "Marka Adı",
    selector: (row: DistributorCarType) => row.BrandName,
    sortable: true,
  },
  {
    name: "Model Adı",
    selector: (row: DistributorCarType) => row.ModelName,
    sortable: true,
  },
  {
    name: "Klas",
    selector: (row: DistributorCarType) => row.ClassName,
    sortable: true,
  },
  {
    name: "Plaka No",
    selector: (row: DistributorCarType) => row.PlateNumber,
    sortable: true,
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: DistributorCarType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
];

export const DistributorUserTypeHeaders = [
  {
    name: "Gösterim Adı",
    selector: (row: DistributorUserType) => row.DisplayName,
    sortable: true,
  },
  {
    name: "Üye Tipi",
    selector: (row: DistributorUserType) => row.MemberTypeName,
    sortable: true,
  },
  {
    name: "E-Mail",
    selector: (row: DistributorUserType) => row.Email,
    sortable: true,
  },
  {
    name: "GSM",
    selector: (row: DistributorUserType) => row.UserName,
    sortable: true,
  },

  {
    name: "Kayıt Tarihi",
    selector: (row: DistributorUserType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
];

export const DistributorCurrentAccountsTypeHeaders = [
  {
    name: "Firma Adı",
    selector: (row: DistributorCurrentAccountType) => row.CompanyName,
    sortable: true,
  },
  {
    name: "Ödeme Tipi",
    selector: (row: DistributorCurrentAccountType) => row.PaymentMethodName,
    sortable: true,
  },
  {
    name: "Açıklama",
    selector: (row: DistributorCurrentAccountType) => row.Description,
    sortable: true,
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: DistributorCurrentAccountType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
];

export const CarBrandHeaderColumns = (editFunc: any, deleteFunc: any) => [
  {
    name: "Marka Adı",
    selector: (row: CarBrandType) => row.Title,
    sortable: true,
  },
  {
    name: "Aktif mi?",
    selector: (row: CarBrandType) => (row.IsActive ? "Aktif" : "Pasif"),
    sortable: true,
  },
  {
    name: "Kayıt Tarihi",
    selector: (row: CarBrandType) =>
      formatDate(row.CreatedDate, "dd.MM.yyy hh:MM"),
    sortable: true,
  },
  {
    width: "80px",
    name: "İşlemler",
    selector: (row: any) => (
      <div className="flex items-center justify-center gap-3">
        <Image
          src={Edit2}
          width={20}
          height={20}
          alt="Edit"
          className="cursor-pointer"
          onClick={async () => editFunc({ id: row.Id })}
        />
        <Image
          src={Delete2}
          width={20}
          height={20}
          alt="Delete"
          className="cursor-pointer"
          onClick={async () => deleteFunc({ id: row.Id })}
        />
      </div>
    ),
  },
];

export const CreditCardHeaderColumns = [
  {
    name: "Ad Soyad",
    selector: (row: CreditCartType) => `${row.FirstName} ${row.LastName}`,
    sortable: true,
  },
  {
    name: "Firma Adı",
    selector: (row: CreditCartType) => row.CompanyName,
    sortable: true,
  },
  {
    name: "GSMı",
    selector: (row: CreditCartType) => row.UserName,
    sortable: true,
  },
  {
    name: "Card Numarası",
    selector: (row: CreditCartType) => row.CardMask,
    sortable: true,
  },
  {
    name: "Banka",
    selector: (row: CreditCartType) => row.BankIssuer,
    sortable: true,
  },
  {
    name: "Kart Tipi",
    selector: (row: CreditCartType) => row.BrandName,
    sortable: true,
  },
];

export const CompanyInvoiceHeaderColumns = [
  {
    name: "Title",
    selector: (row: CompanyInvoiceType) => row.Title,
    sortable: true,
  },
  {
    name: "LineName",
    selector: (row: CompanyInvoiceType) => row.LineName,
    sortable: true,
  },
  {
    name: "Total",
    selector: (row: CompanyInvoiceType) =>
      new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        currencyDisplay: "code",
      })
        .format(row.Total)
        .replace("TRY", "")
        .trim(),
    sortable: true,
  },
  {
    name: "TrackingNumber",
    selector: (row: CompanyInvoiceType) => row.TrackingNumber,
    sortable: true,
  },
  {
    name: "ResultMessage",
    selector: (row: CompanyInvoiceType) => row.ResultMessage,
    sortable: true,
  },
  {
    name: "CreatedDate",
    selector: (row: CompanyInvoiceType) =>
      format(row.CreatedDate, "dd/MM/yyyy HH:ss"),
    sortable: true,
  },
];

export const SystemLogsHeaderColumns = [
  {
    name: "Günlük Seviyesi",
    selector: (row: SystemLogType) => `${row.LogLevelId}`,
    sortable: true,
    width: "140px",
  },
  {
    name: "Kısa Mesaj",
    selector: (row: SystemLogType) => row.ShortMessage,
    sortable: true,
  },
  {
    name: "Düzenlenme Tarihi",
    selector: (row: SystemLogType) =>
      format(row.CreatedDate, "dd/MM/yyyy HH:ss"),
    sortable: true,
    width: "150px",
  },
];

export const ActivityLogsHeaderColumns = [
  {
    name: "Admin Kullanıcı",
    selector: (row: UserLogType) => row.AdminUserActivityLogTypeId,
    sortable: true,
  },
  {
    name: "Etkinlik Günlüğü Türü",
    selector: (row: UserLogType) => row.Comment,
    sortable: true,
  },
  {
    name: "IP Adresi",
    selector: (row: UserLogType) => row.IpAddress,
    sortable: true,
  },
  {
    name: "Oluşturulma Tarihi",
    selector: (row: UserLogType) => format(row.CreatedDate, "dd/MM/yyyy HH:ss"),
    sortable: true,
  },
];
