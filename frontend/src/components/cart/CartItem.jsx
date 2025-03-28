import React from "react";
import { Remove, Add, Delete } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Colors } from "../../themes/index.js";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItem,
} from "../../redux/actions/cartActions";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const onRemoveItem = () => {
    dispatch(removeFromCart(item.product._id));
  };

  const onIncreaseItemQty = () => {
    if (item.quantity >= item.stock) return;
    dispatch(
      updateCartItem({
        productId: item.product._id,
        quantity: item.quantity + 1,
      })
    );
  };

  const onDecreaseItemQty = () => {
    if (item.quantity <= 1) return;
    dispatch(
      updateCartItem({
        productId: item.product._id,
        quantity: item.quantity - 1,
      })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        background: `${Colors.deepBlack}E6`,
        padding: 2,
        marginBottom: 2,
        gap: 2,
        borderRadius: "12px",
        border: `1px solid ${Colors.neonGreen}33`,
        boxShadow: `0 0 10px ${Colors.warning}80`,
        "&:hover": {
          boxShadow: `0 0 15px ${Colors.neonGreen}B3`,
        },
      }}
    >
      {/* Image and Details */}
      <Box
        sx={{
          display: "flex",
          flex: "1 1 100%",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 2,
        }}
      >
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          style={{
            width: "60px",
            height: "auto",
            background: Colors.seagreen,
            borderRadius: "8px",
            objectFit: "cover",
            boxShadow: `0 0 10px ${Colors.neonGreen}80`,
          }}
        />
        <Typography
          variant="body1"
          sx={{
            color: Colors.white,
            fontWeight: "bold",
            fontFamily: "'Orbitron', sans-serif",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {item.product.name}
        </Typography>
      </Box>

      {/* Quantity Controls */}
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton
          onClick={onDecreaseItemQty}
          disabled={item.quantity <= 1}
          sx={{
            background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
            color: Colors.white,
            borderRadius: "8px",
            boxShadow: `0 0 10px ${Colors.neonPink}80`,
            "&:hover": {
              background: `linear-gradient(90deg, ${Colors.orangered}, ${Colors.neonPink})`,
              boxShadow: `0 0 15px ${Colors.neonPink}B3`,
            },
            "&:disabled": {
              background: Colors.darkGray,
              boxShadow: "none",
            },
            transition: "all 0.3s ease",
          }}
        >
          <Remove />
        </IconButton>
        <Typography
          variant="body2"
          sx={{
            padding: "4px 8px",
            background: `${Colors.darkGray}E6`,
            color: Colors.neonGreen,
            borderRadius: "8px",
            textAlign: "center",
            minWidth: "36px",
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          {item.quantity}
        </Typography>
        <IconButton
          onClick={onIncreaseItemQty}
          disabled={item.quantity >= item.product.stock}
          sx={{
            background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
            color: Colors.white,
            borderRadius: "8px",
            boxShadow: `0 0 10px ${Colors.neonGreen}80`,
            "&:hover": {
              background: `linear-gradient(90deg, ${Colors.teal}, ${Colors.neonGreen})`,
              boxShadow: `0 0 15px ${Colors.neonGreen}B3`,
            },
            "&:disabled": {
              background: Colors.darkGray,
              boxShadow: "none",
            },
            transition: "all 0.3s ease",
          }}
        >
          <Add />
        </IconButton>
      </Box>

      {/* Price and Remove Button */}
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: Colors.neonPink,
            fontWeight: "bold",
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          ${item.product.price * item.quantity}
        </Typography>
        <IconButton
          onClick={onRemoveItem}
          sx={{
            background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
            color: Colors.white,
            borderRadius: "8px",
            boxShadow: `0 0 10px ${Colors.neonPink}80`,
            "&:hover": {
              background: `linear-gradient(90deg, ${Colors.orangered}, ${Colors.neonPink})`,
              boxShadow: `0 0 15px ${Colors.neonPink}B3`,
            },
            transition: "all 0.3s ease",
          }}
        >
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
