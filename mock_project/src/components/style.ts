export const inputStyles = {
  marginTop: '20px',
  display: 'flex',
  flex: 1,
};

export const drawerStyles = {
  width: '250px',
  
}

export const notificationStyles: React.CSSProperties = {
  position: "fixed",
  top: "20px",
  right: "20px",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  minWidth: "200px",
  textAlign: "center",
};

export const successStyle: React.CSSProperties = {
  ...notificationStyles,
  backgroundColor: "green",
  color: "white",
};

export const errorStyle: React.CSSProperties = {
  ...notificationStyles,
  backgroundColor: "red",
  color: "white",
};