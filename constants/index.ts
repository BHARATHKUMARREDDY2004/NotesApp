import sample from '@/assets/images/sample.png'
import check from '@/assets/icons/check.png'
import home from '@/assets/icons/home.png'
import reorder from '@/assets/icons/reorder.png'
import message from '@/assets/icons/message.png'
import loan from '@/assets/icons/loan.png'
import onboarding1 from '@/assets/images/onboarding1.png'
import onboarding2 from '@/assets/images/onboarding2.png'
import onboarding3 from '@/assets/images/onboarding3.png'
import empty from '@/assets/images/empty.png'



export const images = {
  sample,
  onboarding1,
  onboarding2,
  onboarding3,
  empty
};

export const icons = {
  check,
  home,
  loan,
  reorder,
  message
};

export const onboarding = [
  {
    id: 1,
    title: "Facilitating On-Demand Direct Delivery from Wholesalers",
    description:
      "Streamline your supply chain with fast and cost-effective deliveries to your store.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Enhancing Financial Inclusion for Retailers",
    description:
      "Empowering your business with access to credit, investments, and modern financial services.",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Revolutionizing the Retail Experience with DukaaOn",
    description:
      "A one-stop solution for inventory, logistics, and financial management. Keep your business on!",
    image: images.onboarding3,
  },
];



export const data = {
  onboarding,
};