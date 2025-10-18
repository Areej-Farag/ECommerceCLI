export type User = {
  fullname: string;
  email: string;
  password: string;
  id: string;
  profilePic?: string;
  shopData?: ShopData[];
};
export type ShopData = {
  id: string;
  email: string;
  apiToken: string;
  name: string;
  phone: string;
  latitude: number;
  longitude: number;
  address: { marker: string; address: string };
  category: string;
  timeOpen: string;
  timeClose: string;
  shopImage: string;
  shopKeeperImage: string;
  ownerId: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  discount: number;
  image: string;
  isFavorite: boolean;
  description: string;
};
export type cartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  discount: number;
  image: string;
  isFavorite: boolean;
  description: string;
  orderDetails: { quantity: number; size: string }[];
};

export type historyItem = {
  cart: cartItem[];
  date: string;
  sum: number;
};

export type Notifications = {
  date: string;
  notifications: Notification[];
};
export type Notification = {
  icon: React.ReactNode;
  title: string;
  text: string;
};
