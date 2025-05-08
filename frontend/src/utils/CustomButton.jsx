import { Button } from "@mui/material";
import { Colors } from "../themes/index.js";
const CustomButton = ({ label, ...props }) => {
  return (
    <Button
      variant="contained"
      sx={{
        fontWeight: 600,
        fontFamily: "'Poppins', sans-serif",
        mt: 1,
        background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
        color: Colors.dove_gray,
        borderRadius: "4px",
        textTransform: "uppercase",
        boxShadow: `0 0 15px ${Colors.neonGreen}80`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 0 25px ${Colors.orangered}B3`,
          background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
        },
      }}
      {...props}
    >
      {label}
    </Button>
  );
};
export default CustomButton;
