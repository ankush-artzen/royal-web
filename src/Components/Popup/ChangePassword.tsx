"use client";

import React, { useState } from "react";
import Card from "../Common/Card";
import Button from "../Common/Button";
import Input from "../Common/Input";
import { toast } from "react-toastify";
import CustomToast from "../Common/CustomToast"

export default function ChangePasswordModal({
  isOpen,
  onClose,
  royalId,
}: {
  isOpen: boolean;
  onClose: () => void;
  royalId: string;
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [editOld, setEditOld] = useState(false);
  const [editNew, setEditNew] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    // toast(<CustomToast message="User ID not loaded yet" type="error" />);

    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ royalId, oldPassword, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) {
      toast(<CustomToast message={data.error || "Something went wrong"} type="error" />);
      return;
    }

    toast(<CustomToast message="Password updated successfully!" type="success" />);
    setOldPassword("");
    setNewPassword("");
    setEditOld(false);
    setEditNew(false);
    onClose();
  };

  return (
    <div>
      <Card isOpen={isOpen} title="Change My Password" onClose={onClose}>
        <div className="space-y-6">
          {/* Old Password */}
          <div
            className="flex items-baseline gap-2 mb-1 ml-4 cursor-pointer"
            onClick={() => setEditOld(true)}
          >
            <label className="text-lg font-normal text-black w-30">
              Old Password
            </label>
            {editOld ? (
              <Input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                isValid={!!oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                customClass="border-[2px] border-black bg-white"
              />
            ) : (
              <span className="text-lg text-black font-bold">**********</span>
            )}
          </div>

          {/* New Password */}
          <div
            className="flex items-baseline gap-3 mb-1 ml-4 cursor-pointer"
            onClick={() => setEditNew(true)}
          >
            <label className="text-lg font-normal text-black w-30">
              New Password
            </label>
            {editNew ? (
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                isValid={!!newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
