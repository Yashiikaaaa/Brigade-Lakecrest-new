import propertyImage from "../assets/Property.svg";
import flowers from "../assets/flowers.svg";
import lines from "../assets/homepage-lines.svg";
import { useLeadTracking, LEAD_SOURCES } from "../hooks/useLeadTracking"; // ✅ Add this import

interface PropertyPageProps {
  openModal: (source: string, propertyType?: string | null) => void;
}

export default function PropertyPage({ openModal }: PropertyPageProps) {
  const { trackButtonClick } = useLeadTracking(); // ✅ Add this hook

  return (
    <div id="overview" className="scroll-mt-24 w-full bg-white overflow-hidden md:py-14 md:relative md:z-0 ">
      <div className="flex flex-col md:flex-row items-start mx-auto md:z-1">
        <img
          src={lines}
          alt="decoline"
          className="lg:w-150 lg:absolute lg:-left-100 lg:bottom-20 hidden lg:block lg:scale-x-[-1] rotate-180"
        />

        {/* Text Section */}
        <div className="flex flex-col justify-start px-5 pt-6 md:pb-10 pb-16 text-left md:pl-14 md:pr-14 md:pt-0 md:w-1/2 md:z-1 md:bg-white">
          <h2 className="text-[#26650B] text-2xl leading-snug font-bold mb-4 md:text-3xl">
             Brigade Lakecrest – Luxury Apartments in KR Puram, Bengaluru<br /> 
          </h2>
   <h2 className="text-[#3e692c] text-xl md:text-2xl lg:text-3xl font-semibold mt-1">
     6 acre, G+28 high-rise project 
     <br />
    </h2>
          <p className="text-sm text-black mb-3 md:text-lg">
              <br />
            <li>1, 2, 2.5, 3 BHK Vastu-compliant homes</li>
              <li>73% carpet efficiency</li>
              <li>80% open space with lake views</li>
              <li>Excellent connectivity: Old Madras Road, KR-Puram station, new metro </li>  
            <li>Ready by 2025, full completion 2030 </li> 
          </p>

          <button
            onClick={() => {
              trackButtonClick(
                LEAD_SOURCES.OVERVIEW,
                "download_brochure_click",
                "Download Brochure"
              );
              openModal(LEAD_SOURCES.OVERVIEW);
            }}
            className="bg-black text-sm text-white font-semibold px-10 py-2 rounded-lg w-fit mb-4 md:px-16 cursor-pointer transition-transform duration-300 hover:scale-105 md:text-base"
          >
            Download Brochure
          </button>

          <img
            src={flowers}
            alt="flowers"
            className="w-[78px] h-[26px] md:h-[42px] md:w-[125px]"
          />
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-end items-start md:pr-0">
          <img
            src={propertyImage}
            alt="Brigade Property"
            className="w-full h-auto md:w-[780px] md:h-[520px] object-cover object-right md:rounded-br-[150px] rounded-br-[70px]"
          />
        </div>
      </div>
    </div>
  );
}