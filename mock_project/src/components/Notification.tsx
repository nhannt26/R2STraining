import React, { useEffect } from "react";
import { errorStyle, successStyle } from "./style";

interface NotificationProps {
  message: string,
  type: "success" | "error";
  onClose: () => void
}

const Notification: React.FC<NotificationProps> = ({message, type, onClose}) => {
  useEffect(() => {
    const time = setTimeout(() => onClose(), 3000)
    return () => clearTimeout(time)
  }, [onClose])
  const styles = type === "success" ? successStyle : errorStyle
  return (
    <div style={styles}>
      {message}
    </div>
  )
}

export default Notification