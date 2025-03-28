import React from "react";
import {
  MapPin,
  Phone,
  Smartphone,
  Mail,
  User,
  Leaf,
  Tractor,
  Wheat,
} from "lucide-react";

const DeputyHeadDetails = ({ deputy }) => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-lg p-6 mb-6 border border-green-200 hover:shadow-xl transition-shadow duration-300">
      {/* Header with Agriculture Icon */}
      <div className="flex items-center mb-4">
        <User className="w-6 h-6 text-green-700 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">{deputy.Name}</h2>
      </div>

      <div className="space-y-3">
        {/* District */}
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 text-green-600 mr-2" />
          <span>
            <strong>District:</strong> {deputy.District}
          </span>
        </div>

        {/* Office */}
        {deputy.Office && (
          <div className="flex items-center text-gray-600">
            <Phone className="w-5 h-5 text-green-600 mr-2" />
            <span>
              <strong>Office:</strong>{" "}
              <a
                href={`tel:${deputy.Office}`}
                className="text-green-700 hover:underline"
              >
                {deputy.Office}
              </a>
            </span>
          </div>
        )}

        {/* Mobile */}
        {deputy.Mobile && (
          <div className="flex items-center text-gray-600">
            <Smartphone className="w-5 h-5 text-green-600 mr-2" />
            <span>
              <strong>Mobile:</strong>{" "}
              <a
                href={`tel:${deputy.Mobile}`}
                className="text-green-700 hover:underline"
              >
                {deputy.Mobile}
              </a>
            </span>
          </div>
        )}

        {/* Fax */}
        {deputy.Fax && (
          <div className="flex items-center text-gray-600">
            <Wheat className="w-5 h-5 text-green-600 mr-2" />{" "}
            {/* Agriculture-themed icon */}
            <span>
              <strong>Fax:</strong>
              {deputy.Fax}
            </span>
          </div>
        )}

        {/* Email */}

        {deputy.Email && (
          <div className="flex items-center text-gray-600">
            <Mail className="w-5 h-5 text-green-600 mr-2 mb-5" />
            <span>
              <strong>Email:</strong>{" "}
              {deputy.Email.split("/").map((email, index) => (
                <div key={index}>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email.trim()}`}
                    className="text-green-700 hover:underline"
                    target="_blank"
                  >
                    {email.trim()}
                  </a>
                </div>
              ))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeputyHeadDetails;
