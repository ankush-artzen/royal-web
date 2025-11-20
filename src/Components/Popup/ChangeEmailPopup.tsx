"use client";
import React, { useState } from "react";
import Card from "../Common/Card";
import Button from "../Common/Button";
import Input from "../Common/Input";
import { toast } from "react-toastify";
import CustomToast from "../Common/CustomToast"; // import your custom toast

export default function ChangeEmailModal({
  isOpen,
  onClose,
  email,
  onSuccess,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newEmail: string) => void;
  email: string;
  userId: string;
}) {
  const [editNew, setEditNew] = useState(false);
  const [newEmail, setNewEmail] = useState(email);
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!userId) {
      toast(<CustomToast message="User ID not loaded yet" type="error" />);
      return;
    }

    try {
      const res = await fetch("/api/change-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ royalId: userId, password, newEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        toast(<CustomToast message="Email updated successfully" type="success" />);
        onSuccess(newEmail);
        setEditNew(false);
        setPassword("");
        onClose();
      } else {
        toast(<CustomToast message={data.error || "Something went wrong"} type="error" />);
      }
    } catch (error : unknown) {
      let message = "Network error. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      toast(<CustomToast message={message} type="error" />);
    }
  };

  return (
    <div>
      <Card isOpen={isOpen} title="Change My Email" onClose={onClose}>
        <div className="space-y-4">
          {/* Current Email */}
          <div className="flex items-baseline gap-3 mb-1 ml-4">
            <label className="text-lg font-normal text-black w-40">
              Current Email
            </label>
            <span className="text-lg text-black font-bold">{newEmail}</span>
          </div>

          {/* New Email */}
          <div className="flex items-baseline gap-3 mb-1 ml-4">
            <label className="text-lg font-normal text-black w-40">
              New Email
            </label>
            {editNew ? (
              <Input
                type="email"
                placeholder="New Email"
                value={newEmail}
                isValid={!!newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                customClass="border-[2px] border-black bg-white"
              />
            ) : (
              <span
                className="text-lg text-primary font-bold cursor-pointer sm: mb-1 ml-4"
                onClick={() => setEditNew(true)}
              >
                Click to change
              </span>
            )}
          </div>

          {/* Password for verification */}
          {editNew && (
            <div className="flex items-baseline gap-3 mb-1 ml-4">
              <label className="text-lg font-normal text-black w-40">
                Password
              </label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                isValid={!!password}
                onChange={(e) => setPassword(e.target.value)}
                customClass="border-[2px] border-black bg-white"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        {editNew && (
          <div className="mt-8 flex justify-end">
            <Button
              title="Submit"
              variant="primary"
              size="md"
              onClick={handleSubmit}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
