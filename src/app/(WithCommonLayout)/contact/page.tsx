import ContactUs from "@/components/ContactUs/ContactUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Daily Dish",
  description:
    "All Info about the contact process is here . you can direct message us, email us and will get others alternative to contact us",
};
const Contact = () => {
  return (
    <section>
      <ContactUs />
    </section>
  );
};

export default Contact;
