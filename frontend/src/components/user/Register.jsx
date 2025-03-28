import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/userActions";
import { FormControl } from "@mui/material";
import DefImg from "../../assets/images/accessories/defImg.png";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../utils/CustomSnackbar.jsx";
import CustomButton from "../../utils/CustomButton.jsx";
import {
  AvatarBox,
  AvatarLabel,
  AvatarPreview,
  FileInput,
  RegisterContainer,
  RegisterForm,
  RegisterFormSection,
  RegisterImage,
  RegisterInput,
  RegisterTitle,
  RegisterWrapper,
} from "../../styles/register/index.js";
import { clearError } from "../../redux/slices/authSlice.js";
import { Colors } from "../../themes/index.js";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(DefImg);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => ({
      loading: state.authState.loading,
      error: state.authState.error,
      isAuthenticated: state.authState.isAuthenticated,
    }),
    shallowEqual
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files.length) {
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(files[0]);
      setAvatar(files[0]);
    } else {
      setUserData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (avatar) formData.append("avatar", avatar);
      dispatch(registerUser(formData));
    },
    [userData, avatar, dispatch]
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else if (error) {
      setSnackbar({ open: true, message: error, severity: "error" });
      dispatch(clearError());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <RegisterContainer maxWidth="lg">
      <RegisterWrapper>
        <RegisterImage />
        <RegisterFormSection>
          <RegisterTitle variant="h5">
            Reg<span>is</span>ter
          </RegisterTitle>
          <RegisterForm
            component="form"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <RegisterInput
              name="name"
              label="Name"
              type="text"
              id="name_field"
              variant="outlined"
              value={userData.name}
              onChange={handleChange}
            />
            <RegisterInput
              name="email"
              label="Email"
              type="email"
              id="email_field"
              variant="outlined"
              value={userData.email}
              onChange={handleChange}
            />
            <RegisterInput
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={userData.password}
              onChange={handleChange}
            />
            <AvatarBox>
              <AvatarPreview alt="Avatar" src={avatarPreview} />
              <FormControl fullWidth>
                <AvatarLabel htmlFor="avatar">Choose Avatar</AvatarLabel>
                <FileInput
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={handleChange}
                />
              </FormControl>
            </AvatarBox>
            <CustomButton
              label={loading ? "Registering..." : "REGISTER"}
              type="submit"
              fullWidth
              disabled={loading}
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
                "&:disabled": {
                  background: Colors.darkGray,
                  boxShadow: "none",
                  cursor: "not-allowed",
                },
                transition: "all 0.3s ease",
              }}
            />
          </RegisterForm>
        </RegisterFormSection>
      </RegisterWrapper>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={handleCloseSnackbar}
      />
    </RegisterContainer>
  );
};

export default Register;
