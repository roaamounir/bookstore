import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function ProductCard({ title, price }) {
  return (
    <Card sx={{ maxWidth: 300, mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography color="text.secondary">Price: ${price}</Typography>
      </CardContent>
    </Card>
  );
}
