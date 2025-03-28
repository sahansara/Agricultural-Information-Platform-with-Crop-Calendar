import React from "react";
import {
  Calendar,
  Sprout,
  Headphones,
  FileText,
  MessageSquare,
} from "lucide-react";
import plantlens from "../assets/service/plantlens.jpg";
import assistance from "../assets/service/assistance.jpg";
import blog from "../assets/service/blog.jpg";
import crop from "../assets/service/crops.jpg";
import forms from "../assets/service/forms.jpg";

const ServicesSection = () => {
  const services = [
    {
      icon: <Calendar className="w-12 h-12 text-green-600" />,
      title: "Crop Calendar",
      description:
        "Plan your farming activities with precision using our intelligent crop scheduling system. Get personalized planting and harvesting dates based on your location and crop type.",
      highlight: "Optimize your harvest timing",
      image: crop, // Corrected assignment
    },
    {
      icon: <Sprout className="w-12 h-12 text-green-600" />,
      title: "PlantLens AI",
      description:
        "Advanced plant disease detection and health monitoring using artificial intelligence. Simply upload a photo of your crop to get instant analysis and treatment recommendations.",
      highlight: "Early disease detection",
      image: plantlens, // Corrected assignment
    },
    {
      icon: <Headphones className="w-12 h-12 text-green-600" />,
      title: "Agri Assistance",
      description:
        "24/7 expert agricultural support at your fingertips. Connect with experienced agronomists for personalized guidance on crop management, pest control, and soil health.",
      highlight: "Expert guidance anytime",
      image: assistance, // Corrected assignment
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-green-600" />,
      title: "Forums",
      description:
        "Join a community of farmers and agricultural experts on our 24/7 forums. Discuss crop management, pest control, and sustainable farming practices with like-minded individuals.",
      highlight: "Collaborate with the farming community",
      image: forms, // Corrected assignment
    },
    {
      icon: <FileText className="w-12 h-12 text-green-600" />,
      title: "Blogs",
      description:
        "Stay informed with the latest agricultural trends, expert tips, and in-depth articles to enhance your farming practices.",
      highlight: "Knowledge at your fingertips",
      image: blog, // Corrected assignment
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Our Services
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Empowering farmers with smart agricultural solutions for better yields
          and sustainable farming.
        </p>

        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`flex items-center gap-8 ${
                index % 2 === 1 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  {service.icon}
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-lg">{service.description}</p>
                <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  {service.highlight}
                </div>
              </div>

              <div className="flex-1">
                <div
                  className={`bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 ${
                    index % 2 === 1 ? "mr-8" : "ml-8"
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-50 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
