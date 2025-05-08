import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Colors } from "../../themes";
import DefImg from "../../assets/images/accessories/defImg.png";
import CustomButton from "../../utils/CustomButton";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector(
    (state) => ({ user: state.authState.user }),
    shallowEqual
  );

  return (
    <Box
      sx={{
        background: Colors.deepBlack,
        color: Colors.white,
        minHeight: "100vh",
        p: 8,
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: `linear-gradient(135deg, ${Colors.seagreen} 0%, ${Colors.orangered} 100%)`,
          clipPath: "polygon(30% 0, 100% 60%, 10% 60%, 0 100%)",
          opacity: 0.9,
          zIndex: 0,
          animation: "pulse 4s infinite alternate",
          "@keyframes pulse": {
            "0%": { opacity: 0.7, transform: "scale(1)" },
            "100%": { opacity: 1, transform: "scale(1.05)" },
          },
        },
      }}
    >
      <Box
        sx={{
          mt: 8,
          textAlign: "center",
          zIndex: 1,
          position: "relative",
        }}
      >
        {/* Row 1 - Title */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "2.8rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
              background: `linear-gradient(90deg, ${Colors.shaft}, ${Colors.neonPink})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 20px ${Colors.neonGreen}80`,
              "& span": {
                background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.seagreen})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              },
            }}
          >
            Your <span>Profile</span>
          </Typography>
        </Box>

        {/* Row 2 - FlexBox */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            background: `${Colors.darkGray}E6`,
            borderRadius: "16px",
            border: `1px solid ${Colors.neonGreen}33`,
            backdropFilter: "blur(10px)",
            boxShadow: `0 0 25px ${Colors.warning}4D`,
            padding: 4,
            "&:hover": {
              boxShadow: `0 0 35px ${Colors.neonGreen}B3`,
            },
          }}
        >
          {/* Column 1 - Profile Image */}
          <Box
            sx={{
              flexBasis: "30%",
              textAlign: "center",
            }}
          >
            <Avatar
              alt="Profile"
              src={user?.avatar || DefImg}
              sx={{
                width: 220,
                height: 200,
                borderRadius: "12px",
                mx: "auto",
                boxShadow: `0 0 20px ${Colors.warning}80`,
                transition: "transform 0.4s ease",
                "&:hover": {
                  transform: " scale(1.05)",
                  boxShadow: `0 0 30px ${Colors.neonGreen}B3`,
                },
              }}
            />
          </Box>

          {/* Column 2 - User Details */}
          {user && (
            <Box
              sx={{
                flexBasis: "30%",
                textAlign: "left",
                color: Colors.neonGreen,
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "'Orbitron', sans-serif",
                    color: Colors.white,
                  }}
                >
                  Full Name:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  {user.name}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "'Orbitron', sans-serif",
                    color: Colors.white,
                  }}
                >
                  Email Address:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "'Orbitron', sans-serif",
                    color: Colors.white,
                  }}
                >
                  Joined:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "'Orbitron', sans-serif",
                    color: Colors.neonPink,
                  }}
                >
                  {String(user.createdAt).substring(0, 10)}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Column 3 - Buttons */}
          <Box
            sx={{
              flexBasis: "30%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Link to={"/myProfile/update"}>
              <CustomButton
                label="Edit Profile"
                sx={{
                  background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
                  color: Colors.white,
                  padding: "10px 50px",
                  borderRadius: "12px",
                  boxShadow: `0 0 10px ${Colors.neonGreen}80`,
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  "&:hover": {
                    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
                    boxShadow: `0 0 15px ${Colors.neonPink}B3`,
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              />
            </Link>
            <Link to={"/myProfile/update/password"}>
              <CustomButton
                label="Change Password"
                sx={{
                  background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
                  color: Colors.white,
                  padding: "10px 20px",
                  borderRadius: "12px",
                  boxShadow: `0 0 10px ${Colors.neonGreen}80`,
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  "&:hover": {
                    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
                    boxShadow: `0 0 15px ${Colors.neonPink}B3`,
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              />
            </Link>
            <Link to={"/orders"}>
              <CustomButton
                label="My Orders"
                sx={{
                  background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
                  color: Colors.white,
                  padding: "10px 60px",
                  borderRadius: "12px",
                  boxShadow: `0 0 10px ${Colors.neonGreen}80`,
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  "&:hover": {
                    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
                    boxShadow: `0 0 15px ${Colors.neonPink}B3`,
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
