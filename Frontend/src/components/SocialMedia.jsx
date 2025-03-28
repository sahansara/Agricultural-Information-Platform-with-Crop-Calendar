import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";

const actions = [
  { icon: <FacebookIcon />, name: "Facebook", url: "https://www.facebook.com" },
  { icon: <YouTubeIcon />, name: "YouTube", url: "https://www.youtube.com" },
  { icon: <WhatsAppIcon />, name: "WhatsApp", url: "https://www.whatsapp.com" },
  { icon: <TwitterIcon />, name: "Twitter", url: "https://www.twitter.com" },
];

export default function SocialMediaSpeedDial() {
  const handleActionClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 100,
        right: 16,
        zIndex: 1000, // Ensure it appears above other content
      }}
    >
      <SpeedDial
        ariaLabel="Social Media SpeedDial"
        sx={{
          // SpeedDial background color

          "& .MuiSpeedDialIcon-icon": {
            color: "#ffffff", // Icon color
          },
          "& .MuiSpeedDialAction-fab": {
            bgcolor: "#388E3C", // Darker green for the action buttons
            color: "#ffffff",
            "&:hover": {
              bgcolor: "#66BB6A", // Lighter green on hover
            },
          },
          "& .MuiSpeedDialAction-tooltip": {
            bgcolor: "#4CAF50", // Tooltip background
            color: "#ffffff", // Tooltip text color
          },
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleActionClick(action.url)}
            sx={{
              "& .MuiSpeedDialAction-fab": {
                bgcolor: "#388E3C", // Darker green for the action buttons
                color: "#ffffff",
                "&:hover": {
                  bgcolor: "#66BB6A", // Lighter green on hover
                },
              },
              "& .MuiSpeedDialAction-tooltip": {
                bgcolor: "#4CAF50", // Tooltip background
                color: "#ffffff", // Tooltip text color
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
