"use client";
import React, { useState } from "react";
import Card from "../Common/Card";
import Button from "../Common/Button";
import Input from "../Common/Input";
import { toast } from "react-toastify";
import CustomToast from "../Common/CustomToast"
export default function ChangePhoneNumberModal({
  isOpen,
  onClose,
  onSuccess, 
  email,
  phoneNumber,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newNumber: string) => void;
  email: string;
  phoneNumber: string;
}) {
  const oldPhoneNumber = phoneNumber; 
  const [editNew, setEditNew] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newPhoneNumber) {
      toast(<CustomToast message="Please enter a new phone number" type="error" />);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/change-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          oldPhoneNumber,
          newPhoneNumber,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast(<CustomToast message={data.error || "Failed to update phone number"} type="error" />);
        return;
      }

      toast(<CustomToast message="Phone number updated successfully!" type="success" />);
      onSuccess(newPhoneNumber); 
      onClose(); // close modal
      setEditNew(false);
      setNewPhoneNumber("");
    } catch (error) {
      console.error("Error:", error);
      toast(<CustomToast message="Network error. Please try again." type="error" />);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <Card isOpen={isOpen} title="Change My Phone Number" onClose={onClose}>
        <div className="space-y-4">
          {/* Old Phone Number */}
          <div className="flex items-baseline gap-3 mb-1 ml-4">
            <label className="text-lg font-normal text-black">
              Old Phone Number
            </label>
            <span className="text-lg text-black font-bold">
              {oldPhoneNumber || "Not Available"}
            </span>
          </div>

          {/* New Phone Number */}
          <div className="flex items-baseline gap-3 mb-1 ml-4">
            <label className="text-lg font-normal text-black">
              New Phone Number
            </label>
            {editNew ? (
              <Input
                type="tel"
                placeholder="Enter new phone number"
                value={newPhoneNumber}
                isValid={!!newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                customClass="border-[2px] border-black bg-white"
              />
            ) : (
              <span
                className="text-lg text-primary font-bold cursor-pointer"
                onClick={() => setEditNew(true)}
              >
                Click to change
              </span>
            )}
          </div>

          {/* Submit Button */}
          {editNew && (
            <div className="mt-8 flex justify-end">
              <Button
                title={loading ? "Updating..." : "Submit"}
                variant="primary"
                size="md"
                onClick={handleSubmit}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
