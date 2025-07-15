const FoodPreferanceBanner = () => {
  return (
    <section
      style={{ backgroundImage: `url('/food-preference.WEBP')` }}
      className="relative h-[85vh]  bg-[center_100%] bg-cover bg-no-repeat  px-5 md:px-20 py-5 md:py-10 overflow-hidden flex"
    >
      <div className="absolute inset-0 bg-black/70  z-10 " />
      <div className="absolute z-20 w-[95%] md:w-[80%] h-[90%] bg-[#1c1c1c] top-[4%] md:top-[5%] left-[3%] md:left-[10%] bg-[url('/preferance.WEBP')] bg-cover bg-[center_100%] bg-no-repeat p-6 md:p-10 flex justify-end rounded-lg">
        <div className="space-y-2 md:space-y-10"></div>
      </div>
    </section>
  );
};

export default FoodPreferanceBanner;
