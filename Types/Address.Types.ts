export type AddAddressType = {
  id?: number | null;
  title: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  company: string | null;
  countryId: number | null;
  provinceId: number | null;
  districtId: number | null;
  neighborhoodId: number | null;
  addressLine: string | null;
  zipPostalCode: string | null;
  addressHtml: string | null;
};

export type AddressType = {
  Id: number;
  Title: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Company: string;
  CountryId: number;
  ProvinceId: number;
  DistrictId: number;
  NeighborhoodId: number;
  AddressLine: string;
  ZipPostalCode: string | null;
  AddressHtml: string | null;
};

export type CountryType = {
  Name: string;
  Published: boolean;
  Id: number;
};

export type ProvicesType = CountryType & {
  DeliveryCountryId: number;
};

export type DistrictsType = CountryType & {
  DeliveryProvinceId: number;
};

export type NeighbourType = CountryType & {
  DeliveryDistrictId: number;
  ZipCode: string;
};
