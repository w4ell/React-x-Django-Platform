import React from "react";

const Features = () => {
  return (
    <section id="features">
      {/* Flex Container */}
      <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row">
        {/* What's Different */}
        <div className="flex flex-col space-y-12 md:w-1/2">
          <h2 className="max-w-md text-4xl font-bold text-center md:text-left">
            What's different about Infinite Analysis?
          </h2>
          <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
          infinite analysis provides all the functionality you need, without the complexity. 
          </p>
        </div>

        {/* Numbered List */}
        <div className="flex flex-col space-y-8 md:w-1/2">
          {/* List Item 1 */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            {/* Heading */}
            <div className="rounded-l-full bg-[#f07c62] md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-[#F25E3D]">
                  01
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                Customized Data Analysis
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
              Customized Data Analysis
              </h3>
              <p className="text-darkGrayishBlue">
              Users can import their own data and visualize it in a personalized way,
               allowing them to better understand their data and make informed decisions.
              </p>
            </div>
          </div>

          {/* List Item 2 */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            {/* Heading */}
            <div className="rounded-l-full bg-[#f07c62] md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-[#F25E3D]">
                  02
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                Accurate Forecasting
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
              Accurate Forecasting
              </h3>
              <p className="text-darkGrayishBlue">
              By using imported data history, your website can provide accurate forecasts,
               helping users anticipate future trends and make strategic decisions accordingly.
              </p>
            </div>
          </div>

          {/* List Item 3 */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            {/* Heading */}
            <div className="rounded-l-full bg-[#f07c62] md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-[#F25E3D]">
                  03
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                Ease of Use
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
              Ease of Use
              </h3>
              <p className="text-darkGrayishBlue">
              With a user-friendly and intuitive interface, 
              your website allows users to navigate easily, 
              import their data, and generate analyses without requiring advanced technical skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
