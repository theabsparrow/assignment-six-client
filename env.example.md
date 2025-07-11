NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1
NEXT_PUBLIC_IMGBB_API_URL=
NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY=
NEXT_PUBLIC_RECAPTCHA_SERVER_KEY=
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=

<!-- <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className={`relative h-screen  bg-center bg-cover bg-no-repeat  px-5 md:px-20 py-5 md:py-10 overflow-hidden flex ${
            registeredRole === "customer" ? "justify-start " : "justify-end "
          } items-start border`}
        >
          <div className="absolute inset-0 bg-black/60  z-10 " />
          {registeredRole === "customer" ? (
            <div className="space-y-4 ">
              <div className="flex justify-between items-center font-inter">
                <Link
                  onClick={() => {
                    localStorage.removeItem("customerForm");
                    localStorage.removeItem("mealProviderForm");
                    localStorage.removeItem("otpExpiry");
                    localStorage.removeItem("verifyOtpForm");
                    setRegisteredRole("");
                  }}
                  href="/"
                  className="cursor-pointer flex items-center gap-1 text-secondary font-Inter md:text-lg font-medium hover:underline duration-500"
                >
                  <IoHomeOutline className="text-xl" /> Back to home
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("customerForm");
                    localStorage.removeItem("mealProviderForm");
                    localStorage.removeItem("otpExpiry");
                    localStorage.removeItem("verifyOtpForm");
                    setRegisteredRole("");
                  }}
                  className="cursor-pointer"
                >
                  <FaArrowAltCircleLeft className="text-secondary text-xl" />
                </button>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary font-playfair">
                Be a Customer
              </h2>
              <RegisterCustomer setRegisteredRole={setRegisteredRole} />
              <div
                style={{ backgroundImage: `url(${bgImage})` }}
                className={`absolute z-20 w-[95%] md:w-[80%] h-[90%] bg-white top-[2%] md:top-[5%] left-[3%] md:left-[10%] bg-cover bg-center bg-no-repeat p-3 md:px-10 md:py-4 flex justify-center md:justify-start overflow-hidden`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Link
                      onClick={() => {
                        localStorage.removeItem("customerForm");
                        localStorage.removeItem("mealProviderForm");
                        localStorage.removeItem("otpExpiry");
                        localStorage.removeItem("verifyOtpForm");
                        setRegisteredRole("");
                      }}
                      href="/"
                      className="cursor-pointer flex items-center gap-1 text-primary font-Inter md:text-lg font-medium hover:underline duration-500 "
                    >
                      <IoHomeOutline className="text-xl" /> Back to home
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("customerForm");
                        localStorage.removeItem("mealProviderForm");
                        localStorage.removeItem("otpExpiry");
                        localStorage.removeItem("verifyOtpForm");
                        setRegisteredRole("");
                      }}
                      className="cursor-pointer"
                    >
                      <FaArrowLeft className="text-primary text-xl" />
                    </button>
                  </div>
                  <h2 className="text-2xl md:text-3xl text-center font-bold text-primary font-playfair">
                    Be a Customer
                  </h2>
                  <div className="overflow-y-auto max-h-[70vh] pr-2">
                    <RegisterCustomer setRegisteredRole={setRegisteredRole} />
                  </div>
                </div>
              </div>
            </div>
          ) : registeredRole === "mealProvider" ? (
            <div className="space-y-4 md:space-y-10">
              <RegisterMealProvider setRegisteredRole={setRegisteredRole} />
              <div></div>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-10">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="cursor-pointer flex items-center gap-1 text-secondary font-Inter md:text-lg font-medium hover:underline duration-500"
                >
                  <IoHomeOutline className="text-xl" /> Back to home
                </Link>
                <Link
                  href="/login"
                  className="cursor-pointer flex items-center gap-1 text-secondary font-Inter md:text-lg font-medium hover:underline duration-500"
                >
                  <IoIosLogIn className="text-xl" /> Back to Login
                </Link>
              </div>
              <h2 className="text-2xl md:text-5xl font-bold text-primary font-playfair">
                Register As
              </h2>
              <SelectOptionComponent setRegisteredRole={setRegisteredRole} />

              <div className="absolute z-20 w-[95%] md:w-[80%] h-[90%] bg-white top-[2%] md:top-[5%] left-[3%] md:left-[10%] bg-[url('/selection-banner.PNG')] bg-cover bg-center bg-no-repeat p-3 md:p-10 flex justify-center md:justify-end">
                <div className="space-y-2 md:space-y-10">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      className="cursor-pointer flex items-center gap-1 text-primary font-Inter md:text-lg font-medium hover:underline duration-500 "
                    >
                      <IoHomeOutline className="text-xl" /> Back to home
                    </Link>
                    <Link
                      href="/login"
                      className="cursor-pointer flex items-center gap-1 text-primary font-Inter md:text-lg font-medium hover:underline duration-500 "
                    >
                      <IoIosLogIn className="text-xl" /> Back to login
                    </Link>
                  </div>
                  <h2 className="text-2xl md:text-5xl font-bold text-primary font-playfair">
                    Register As
                  </h2>
                  <SelectOptionComponent
                    setRegisteredRole={setRegisteredRole}
                  />
                </div>
              </div>
            </div>
          )}
        </div> -->
