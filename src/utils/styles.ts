export const box = {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const card = {
  maxHeight: "max-content",
  minWidth: "500px",
  maxWidth: "700px",
  mx: "auto",
};

export const cardContent = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
  gap: 1.5,
  marginTop: 2,
};

export const commonGrid = { gridColumn: "1/-1" };
