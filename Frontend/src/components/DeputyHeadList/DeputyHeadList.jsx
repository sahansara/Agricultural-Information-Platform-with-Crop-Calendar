import React, { useState } from "react";
import DeputyHeadDetails from "../DeputyHeadList/DeputyHeadDetails";
import { User, Tractor } from "lucide-react";

const deputyHeads = [
  {
    Name: "Mr. P. M. Wikramarathna",
    District: "Colombo",
    Office: "+94 114 885 105",
    Mobile: "+94 717 890 516",
    Fax: "+94 112 695 537",
    Email: "agrariancol@gmail.com",
  },
  {
    Name: "Mr. D. A. Ahangangoda",
    District: "Gampaha",
    Office: "+94 332 222 698",
    Mobile: "+94 719 078 247",
    Fax: "+94 332 239 555",
    Email: "addogampaha@gmail.com / agrarian.dmn@gmail.com",
  },
  {
    Name: "Mr. W.M.L.K. Wijethunga",
    District: "Gampaha",
    Mobile: "+94 777 031 747",
    Email: "addogampaha@gmail.com",
  },
  {
    Name: "Mr. L. D. I. Udaya Kumara",
    District: "Kaluthara",
    Office: "+94 342 222 404",
    Mobile: "+94 772 370 868",
    Fax: "+94 342 222 407",
    Email: "agrarian.kalutara@gmail.com",
  },
  {
    Name: "Mr. T. A. Ranasinghe",
    District: "Kandy",
    Office: "+94 812 388 753",
    Mobile: "+94 702 048 526",
    Fax: "+94 812 388 753",
    Email: "-",
  },
  {
    Name: "Mrs. Anusha Dewapriya",
    District: "Kandy",
    Mobile: "+94 759 455 948",
    Fax: "+94 812 388 753",
    Email: "anushadewapriya1231@gmail.com",
  },
  {
    Name: "Mrs. B. H. A. Dilhani",
    District: "Nuwaraeliya",
    Office: "+94 812 388 753",
    Mobile: "+94 712 839 812",
    Fax: "+94 812 388 753",
    Email: "ag6nuwaraeliya@yahoo.com",
  },
  {
    Name: "Mr. D. M. R. C. Dasanayaka",
    District: "Matale",
    Office: "+94 662 222 284",
    Mobile: "+94 712 763 650",
    Fax: "+94 662 050 065",
    Email: "dadmatale@gmail.com",
  },
  {
    Name: "Mr. D.W.A Pushpakumara",
    District: "Matale",
    Office: "+94 662 222 284",
    Mobile: "+94 759 105 330",
    Fax: "+94 662 050 065",
    Email: "dadmatale@gmail.com",
  },
  {
    Name: "Mr. J. W. S. Priyanjan",
    District: "Galle",
    Office: "+94 914 935 463",
    Mobile: "+94 774 322 164 / +94 717 169 366",
    Fax: "+94 912 223 239",
    Email: "dadgalle@gmail.com",
  },
  {
    Name: "Mr. W. Hemapala De Silva",
    District: "Galle",
    Office: "+94 914 935 463",
    Mobile: "-",
    Fax: "+94 912 223 239",
    Email: "dadgalle@gmail.com",
  },
  {
    Name: "Mrs. S. M. P. S. Niroshani",
    District: "Matara",
    Office: "+94 412 222 115",
    Mobile: "+94 714 549 572",
    Fax: "+94 412 237 815",
    Email: "dadmatara@yahoo.com",
  },
  {
    Name: "Mr. E.P Sugathapala",
    District: "Matara",
    Mobile: "+94 718 173 859",
    Email: "-",
  },
  {
    Name: "Mr. P. S. Ramanayake",
    District: "Hambanthota",
    Office: "+94 474 928 613",
    Mobile: "+94 714 406 585",
    Fax: "+94 472 220 191",
    Email: "addohambanthota@gmail.com",
  },
  {
    Name: "Mrs. W. M. D. M. Weearwansa",
    District: "Kurunegala",
    Office: "+94 372 222 914",
    Mobile: "+94 716 726 618",
    Fax: "+94 372 225 487",
    Email: "dadkurunegala@gmail.com / dadkurunegalaest01@gmail.com",
  },
  {
    Name: "Mr. D. P. D. N. K. Gunasekara",
    District: "Kurunegala",
    Office: "+94 372 222 914",
    Mobile: "+94 702 602 850",
    Fax: "+94 372 225 487",
    Email: "dadkurunegala@gmail.com / dadkurunegalaest01@gmail.com",
  },
  {
    Name: "Mr. -",
    District: "Anuradhapura",
    Office: "+94 252 222 812",
    Mobile: "+94",
    Fax: "+94 252 053 550",
    Email: "dadanurapura@gmail.com",
  },
  {
    Name: "Mrs. P. G. S. N. Priyadarshani",
    District: "Anuradhapura",
    Office: "+94 252 222 812",
    Mobile: "+94 768 344 051",
    Fax: "+94 252 053 550",
    Email: "dadanurapura@gmail.com",
  },
  {
    Name: "Mr. W. M. A. N. Weerakoon",
    District: "Polonnaruwa",
    Office: "+94 272 222 183",
    Mobile: "+94 713 760 071",
    Fax: "+94 272 222 183",
    Email: "acpolonnaruwa@gmail.com",
  },
  {
    Name: "Mr. G. K. S. Pushpakumara",
    District: "Putttalam",
    Mobile: "+94 713 934 313",
    Email: "dadchilaw@gmail.com",
  },
  {
    Name: "Mr. -",
    District: "Badulla",
    Office: "+94 552 222 458",
    Mobile: "+94",
    Fax: "+94 552 231 458",
    Email: "badulladad@gmail.com / www.hennayakenc@gmail.com",
  },
  {
    Name: "Mr. J. M. N. S. Jayasekara",
    District: "Monaragala",
    Office: "+94 552 276 115",
    Mobile: "+94 717 667 446",
    Fax: "+94 552 276 033",
    Email: "agrarianmonaragala@yahoo.com",
  },
  {
    Name: "Mr. -",
    District: "Rathnapura",
    Office: "+94 452 222 439",
    Mobile: "+94",
    Fax: "+94 452 226 639",
    Email: "dadrnp@gmail.com",
  },
  {
    Name: "Mr. B.A.C.P.Kumara",
    District: "Kegalle",
    Office: "+94 352 222 567",
    Mobile: "+94 714 237 145",
    Fax: "+94 352 222 567",
    Email: "dadkeg@gmail.com / smediwaka@gmail.com",
  },
  {
    Name: "Mrs. L. G. Chamini Somadasa",
    District: "Ampara",
    Office: "+94 632 222 472",
    Mobile: "+94 779 303 593",
    Fax: "+94 632 223 198",
    Email: "academpara@gmail.com / chaminisomadasa@gmail.com",
  },
  {
    Name: "Mr. N. Vishnudasan",
    District: "Vavuniya",
    Office: "+94 242 222 362",
    Mobile: "+94 773 535 916",
    Fax: "+94 242 228 069",
    Email: "dadvavuniya@gmail.com",
  },
  {
    Name: "Mr. S. R. Paraneeharan",
    District: "Mullaitivu",
    Office: "+94 212 290 048",
    Mobile: "+94 706 905 269",
    Fax: "+94 212 290 049",
    Email: "academullaitivu@gmail.com",
  },
  {
    Name: "Mr. B. Thewadaran",
    District: "Kilinochchi",
    Office: "+94 212 285 904",
    Mobile: "+94 778 448 625",
    Fax: "+94 212 285 904",
    Email: "dad.kili@yahoo.com",
  },
  {
    Name: "Mr. K. Jahannath",
    District: "Batticaloa",
    Office: "+94 652 222 471",
    Mobile: "+94 777 512 266",
    Fax: "+94 652 222 912",
    Email: "acadbatticaloa@gmail.com / kjahannath@gmail.com",
  },
  {
    Name: "Mr. A. Marinkumar",
    District: "Mannar",
    Office: "+94 232 222 162",
    Mobile: "+94 767 784 842",
    Fax: "+94 232 251 762",
    Email: "dadmannar@gmail.com",
  },
  {
    Name: "Mr. N. Vishnudashan",
    District: "Trincomalee",
    Office: "+94 264 925 291",
    Mobile: "+94 773 535 916",
    Fax: "+94 262 222 657",
    Email: "dadtrinc@yahoo.com",
  },
];

const DeputyHeadList = () => {
  // State for search term
  const [search, setSearch] = useState("");

  // Filter the deputyHeads based on search term in Name or District
  const filteredDeputyHeads = deputyHeads.filter(
    (deputy) =>
      deputy.Name.toLowerCase().includes(search.toLowerCase()) ||
      deputy.District.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <Tractor className="text-xl text-green-600 mr-4 w-7 h-7" />
          <h1 className="text-3xl font-bold text-green-800">
            Deputy Head Details
          </h1>
        </div>
        <p className="text-gray-600">
          Below is the list of Deputy Heads with their contact information. You
          can search by Name or District.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mx-auto mb-4 w-2/3">
        {" "}
        {/* Centering the search box */}
        <input
          type="text"
          placeholder="Search by Name or District"
          className="border p-2 pr-10 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search by Name or District" // Accessibility improvement
        />
      </div>

      {/* Display filtered deputy heads */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeputyHeads.map((deputy, index) => (
          <DeputyHeadDetails key={index} deputy={deputy} />
        ))}
      </div>
    </div>
  );
};

export default DeputyHeadList;
