import React, { useState, useEffect } from "react";
import "./AlertMessage.css";

function AlertMessage({ message, duration, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // duration 후 onClose 호출
    }, duration);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [duration, onClose]);

  return (
    <div className="alert-message">
      {message}
    </div>
  );
}

export default AlertMessage;
