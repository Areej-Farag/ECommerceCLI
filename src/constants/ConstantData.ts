import { Notifications } from "../models/Models";

export const Categories =[
    "All",
    "Clothing",
    "Shoes",
    "Accessories",
    "Electronics",
    "Home",
    "Beauty",
    "Health",
]

export const notificationsData: Notifications[] = [
  {
    date: "Tue Oct 14 2025",
    notifications: [
      {
        icon: "🛒", // Placeholder for ReactNode (e.g., <Icon name="cart" />)
        title: "Order Confirmed",
        text: "Your purchase of the Cotton T-Shirt has been confirmed. Expected delivery by October 16."
      },
      {
        icon: "⭐", // Placeholder
        title: "New Review",
        text: "Great feedback on the Blue Jeans! 'Comfortable and stylish' - Thanks for sharing!"
      },
      {
        icon: "💰", // Placeholder
        title: "Discount Applied",
        text: "You saved 10% on your recent order. Check out more deals in Clothing."
      }
    ]
  },
  {
    date: "Mon Oct 13 2025",
    notifications: [
      {
        icon: "📦", // Placeholder
        title: "Shipment Out for Delivery",
        text: "Your Leather Jacket is on its way. Track your package here."
      },
      {
        icon: "❤️", // Placeholder
        title: "Added to Favorites",
        text: "Running Sneakers added to your wishlist. Get notified when on sale."
      }
    ]
  },
  {
    date: "Sun Oct 12 2025",
    notifications: [
      {
        icon: "🔔", // Placeholder
        title: "Price Drop Alert",
        text: "High Heels now at 20% off! Limited time offer in Shoes category."
      },
      {
        icon: "📱", // Placeholder
        title: "App Update",
        text: "New features added for easier shopping. Update now for personalized recommendations."
      },
      {
        icon: "🏠", // Placeholder
        title: "Restock Notice",
        text: "Table Lamp is back in stock. Add to cart before it's gone."
      }
    ]
  }
];