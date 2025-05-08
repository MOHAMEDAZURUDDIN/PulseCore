import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  Typography,
  Fade,
} from "@mui/material";
import React from "react";
import { Colors } from "../../themes";
import { footerLinks, socialMedia } from "../../utils";
import { Copyright } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, ${Colors.inverse} 0%, #1a1a1a 100%)`,
        color: Colors.white,
        py: 2,
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: `linear-gradient(90deg, ${Colors.seagreen}, ${Colors.muted})`,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 2fr",
            },
            gap: 4,
            alignItems: "start",
          }}
        >
          {/* Brand Section */}
          <Fade in timeout={800}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${Colors.seagreen}, ${Colors.muted})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                Pulse Core
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: Colors.shaft,
                  mb: 3,
                  lineHeight: 1.6,
                  maxWidth: "280px",
                }}
              >
                Elevate your style with premium men's accessories crafted for
                the modern individual.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {socialMedia.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: Colors.muted,
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      "&:hover": {
                        color: Colors.seagreen,
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Fade>

          {/* Links Section */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: "repeat(auto-fit, minmax(120px, 1fr))",
              },
              gap: 3,
            }}
          >
            {footerLinks.map((section, index) => (
              <Fade in timeout={1000 + index * 200} key={section.title}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: Colors.white,
                      mb: 2,
                      fontWeight: 600,
                      position: "relative",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: -4,
                        left: 0,
                        width: "24px",
                        height: "2px",
                        bgcolor: Colors.seagreen,
                      },
                    }}
                  >
                    {section.title}
                  </Typography>
                  {section.links.map((link) => (
                    <Typography key={link.name} variant="body2" sx={{ mb: 1 }}>
                      <Link
                        href={link.link}
                        sx={{
                          color: Colors.shaft,
                          "&:hover": {
                            color: Colors.seagreen,
                            paddingLeft: "4px",
                          },
                          transition: "all 0.3s ease",
                        }}
                        underline="none"
                      >
                        {link.name}
                      </Link>
                    </Typography>
                  ))}
                </Box>
              </Fade>
            ))}
          </Box>
        </Box>

        <Divider
          sx={{
            my: 2,
            borderColor: "rgba(255, 255, 255, 0.1)",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          }}
        />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Copyright sx={{ fontSize: "1rem", color: Colors.muted }} />
            <Typography variant="body2" sx={{ color: Colors.shaft }}>
              {new Date().getFullYear()} Pulse Core. All rights reserved.
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: Colors.dim_gray,
              fontWeight: 500,
              "&:hover": { color: Colors.seagreen },
              transition: "color 0.3s ease",
            }}
          >
            AjStackDevelopers
          </Typography>
          <Link
            href="#"
            variant="body2"
            sx={{
              color: Colors.muted,
              "&:hover": { color: Colors.seagreen },
              transition: "color 0.3s ease",
            }}
            underline="none"
          >
            Terms & Conditions
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
