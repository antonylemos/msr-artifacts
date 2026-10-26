import React from "react";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

export interface MyButtonProps extends ButtonProps {
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  children: React.ReactNode;
}

const MyMaterialButton: React.FC<MyButtonProps> = ({
  variant = "contained",
  color = "primary",
  children,
  ...rest
}) => {
  return (
    <Button variant={variant} color={color} {...rest}>
      {children}
    </Button>
  );
};

export default MyMaterialButton;
