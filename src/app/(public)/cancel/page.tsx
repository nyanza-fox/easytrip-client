"use client";

import { useEffect } from "react";
import { API_URL } from "@/constants/url";
import stripe from "@/utils/stripe";

const Cancel = () => {
  const updateStatus = async (sessionId: any) => {
    try {
      const body = {
        id: sessionId,
        status: "cancelled",
      };

      const updateResponse = await fetch(`${API_URL}/orders/updateStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await updateResponse.json();
      return data;
    } catch (error) {
      throw new Error(`Gagal memperbarui status: `);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");
    console.log(sessionId, "masuk 42");

    if (sessionId) {
      handleUpdate(sessionId);
    }
  }, []);

  const handleUpdate = async (sessionId: any) => {
    try {
      const result = await updateStatus(sessionId);
      console.log("Hasil pembaruan:", result);
    } catch (error) {
      console.error("Pembaruan gagal:", error);
    }
  };

  return (
    <div className="m-8">
      <h1>Pembayaran Dicancel</h1>
    </div>
  );
};

export default Cancel;