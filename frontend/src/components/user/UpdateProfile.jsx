import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import DefImg from "../../assets/images/accessories/defImg.png";
import { PhotoCamera, Person, Email } from "@mui/icons-material";
import CustomSnackbar from "../../utils/CustomSnackbar";
import { Colors } from "../../themes/index.js";
import { updateProfile } from "../../redux/actions/userActions";
import { clearError, clearUpdate } from "../../redux/slices/authSlice";

export default function UpdateProfile() {
  const { loading, error, user, isUpdated, isAuthenticated } = useSelector(
    (state) => ({
      loading: state.authState.loading,
      error: state.authState.error,
      user: state.authState.user,
      isUpdated: state.authState.isUpdated,
      isAuthenticated: state.authState.isAuthenticated,
    }),
    shallowEqual
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(DefImg);
  const [hasChanged, setHasChanged] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(file);
          setHasChanged(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "name" && value !== user?.name) setHasChanged(true);
    if (field === "email" && value !== user?.email) setHasChanged(true);
    if (field === "name" && value === user?.name && !avatar)
      setHasChanged(false);
    if (field === "email" && value === user?.email && !avatar)
      setHasChanged(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (avatar) formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
    if (snackbar.severity === "success") dispatch(clearUpdate());
    if (snackbar.severity === "error") {
      dispatch(clearError());
      if (
        error === "Login first to handle this resource" ||
        error === "User not found"
      ) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      if (user.avatar) setAvatarPreview(user.avatar);
    }

    if (isUpdated) {
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
      setHasChanged(false);
    }

    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
    }
  }, [user, isUpdated, error, dispatch, isAuthenticated, navigate]);

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
            Update <span>Profile</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            background: `${Colors.darkGray}E6`,
            borderRadius: "16px",
            border: `1px solid ${Colors.neonGreen}33`,
            backdropFilter: "blur(10px)",
            boxShadow: `0 0 25px ${Colors.warning}4D`,
            padding: 4,
            maxWidth: 600,
            mx: "auto",
            "&:hover": {
              boxShadow: `0 0 35px ${Colors.neonGreen}B3`,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={avatarPreview}
              sx={{
                width: 120,
                height: 120,
                borderRadius: "12px",
                boxShadow: `0 0 20px ${Colors.warning}80`,
                transition: "transform 0.4s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: `0 0 30px ${Colors.neonGreen}B3`,
                },
              }}
            />
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
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
            >
              Choose Avatar
              <input type="file" hidden onChange={onChangeAvatar} />
            </Button>
          </Box>

          <Box
            component="form"
            onSubmit={submitHandler}
            encType="multipart/form-data"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
            }}
          >
            <TextField
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleInputChange("name", e.target.value);
              }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: Colors.neonGreen }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: `${Colors.deepBlack}E6`,
                  color: Colors.white,
                  "& fieldset": { borderColor: Colors.neonGreen },
                  "&:hover fieldset": { borderColor: Colors.neonPink },
                  "&.Mui-focused fieldset": { borderColor: Colors.orangered },
                },
                "& .MuiInputLabel-root": { color: Colors.neonGreen },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: Colors.orangered,
                },
              }}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange("email", e.target.value);
              }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: Colors.neonGreen }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: `${Colors.deepBlack}E6`,
                  color: Colors.white,
                  "& fieldset": { borderColor: Colors.neonGreen },
                  "&:hover fieldset": { borderColor: Colors.neonPink },
                  "&.Mui-focused fieldset": { borderColor: Colors.orangered },
                },
                "& .MuiInputLabel-root": { color: Colors.neonGreen },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: Colors.orangered,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!hasChanged || loading}
              sx={{
                background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
                color: Colors.white,
                padding: "10px 0",
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
                "&:disabled": {
                  background: Colors.darkGray,
                  cursor: "not-allowed",
                  boxShadow: "none",
                },
                transition: "all 0.3s ease",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </Box>
        </Box>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={handleSnackbarClose}
      />
    </Box>
  );
}
