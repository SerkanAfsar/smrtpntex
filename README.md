This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
123denmee
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

istasyonların arasında img logo kalktı station brands (markalar liste oluyor) den dropdown ı yükle

distlerde üyeler sayfası oluşturulacak ve üye ekle üye edit olucak (yusuf yapıcak endpointi)

distribütör seçiminde firmalar listelenicek sonra ona ait yukarıdaki menüler doldurulucak

finans=cari
finans a cari ekleme endpointi yapılıcak

firmalara yeni kullanıcı eklerken firma yetkilisi eklerken firma seçmesi lazım istasyon yetkilisi seçerken istasyon seçmesi lazım

helpdesc endpointi ekli onları da yap

log kısmı geldi. sistem logları ve user logları var

purchase genel şu anlık gerek yok

purchase request yap

[19:34, 02.01.2025] DK Yusuf, Backend: Financial son otorizasyon
[19:35, 02.01.2025] DK Yusuf, Backend: Aslında finans diye Türkçe isim verdiğiniz finans yönetimindeki cari

public int CreditCardId { get; set; }
public int OrderId { get; set; }
public string ActionName { get; set; }
public decimal Amount { get; set; }
public string Alias { get; set; }
public string RefNo { get; set; }
public string ReturnCode { get; set; }
public string ReturnMessage { get; set; }
public string StatusText { get; set; }
public string ResponseText { get; set; }
public DateTime CreatedDate { get; set; }
public string CardMask { get; set; }
public string OrderNumber { get; set; }
public string UserName { get; set; }
public string DisplayName { get; set; }
public string CompanyName { get; set; }

1. İstasyonlar kısmına harita eklenicek
2. Gösterge paneli dashboard olan yere "hoşgeldin kullanıcı adı"

Admin-Price ile ilgili düzenlemeler
Product-ile ilgili düzenlemeler
Üyeler-Adress kısmının eklenmesi

// "id": 0,
// "title": "string",
// "firstName": "string",
// "lastName": "string",
// "email": "string",
// "phoneNumber": "string",
// "company": "string",
// "countryId": 0,
// "provinceId": 0,
// "districtId": 0,
// "neighborhoodId": 0,
// "addressLine": "string",
// "zipPostalCode": "string",
// "addressHtml": "string"

41.019805476888

28.563646026834
