"use client";
import React from "react";
import Card from "../Common/Card";

function ErrorPopup({
  isOpen,
  onClose,
  message, 
}: {
  isOpen: boolean;
  onClose: () => void;
  message?: string; 
}) {
  return (
    <div>
      <Card isOpen={isOpen} title="Error!" onClose={onClose}>
        <div className="text-md lg:text-2xl font-light text-black">
          {message || (
            <>
              Sorry! You cannot change your Royal ID number. If you need more
              assistance with your account please contact us at{" "}
              <strong>HELP@ROYALAPP.COM.</strong>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default ErrorPopup;
