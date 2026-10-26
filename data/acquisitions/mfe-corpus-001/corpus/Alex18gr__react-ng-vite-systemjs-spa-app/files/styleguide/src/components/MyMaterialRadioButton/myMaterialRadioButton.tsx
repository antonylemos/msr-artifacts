import React from "react";
import { Radio, FormControlLabel } from "@mui/material";
import type { RadioProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export interface MyRadioProps extends RadioProps {
  label: string;
  myExtraProp?: string;
}

const StyledRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.primary.main,
  "&.Mui-checked": {
    color: theme.palette.secondary.main,
  },
}));

const MyMaterialRadio: React.FC<MyRadioProps> = ({
  label,
  myExtraProp,
  ...rest
}) => {
  // You can use myExtraProp however you need here
  console.log("Extra prop:", myExtraProp);

  return <FormControlLabel control={<StyledRadio {...rest} />} label={label} />;
};

export default MyMaterialRadio;
