import AboutUs from "@/components/aboutUs/AboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Daily Dish",
  description:
    "Explore all details about daily dish. all your desire information is available here. Know more about daily dish",
};
const About = () => {
  return (
    <section>
      <AboutUs />
    </section>
  );
};

export default About;
