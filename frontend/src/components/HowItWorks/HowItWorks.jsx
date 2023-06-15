import {
  FaMousePointer,
  FaSearch,
  FaArrowAltCircleRight,
  FaICursor,
} from "react-icons/fa";

export default function HowItWorks() {
  return (
    <div className="border-2 border-black rounded-lg">
      <div className="md:container md:mx-auto h-full container mt-10 pb-16">
        <p className="text-3xl lg:text-4xl mb-6 lg:mb-10 text-center ">
          Your first step towards a better future
        </p>

        <div className="box-border flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-10 justify-center">
          <div className="flex flex-col items-center justify-center">
            <FaICursor className="text-2xl" />
            <br />
            <p className="text-xl font-bold">STEP 1</p>
            <p className="text-xl">Search for a company</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <FaArrowAltCircleRight className="text-3xl" />
          </div>

          <div className="flex flex-col items-center justify-center">
            <FaMousePointer className="text-2xl" />
            <br />
            <p className="text-xl font-bold">STEP 2</p>
            <p className="text-xl">Click on the company</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <FaArrowAltCircleRight className="text-3xl" />
          </div>

          <div className="flex flex-col items-center justify-center">
            <FaSearch className="text-2xl" />
            <br />
            <p className="text-xl font-bold">STEP 3</p>
            <p className="text-xl">Click on "Get Started"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
