import React, { useEffect } from "react";

function Alerts({ alert, removeAlert }) {
  const { type, message } = alert;
  useEffect(() => {
    const hideAlertMessage = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(hideAlertMessage);
  }, []);

  return <p className={`alert alert-${type}`}>{message}</p>;
}

export default Alerts;
