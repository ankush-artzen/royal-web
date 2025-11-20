// "use client";
// import React from "react";
// import { useAuth } from "@/hooks/useAuth";
// import Card from "../Common/Card";
// import Button from "../Common/Button";

// function ConfirmBox({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) {
//   const { logout } = useAuth();
//   return (
//     <Card isOpen={isOpen} title="Confirm Logout" onClose={onClose}>
//       <div className="text-md lg:text-2xl font-light text-black">
//         <p className="text-md lg:text-lg text-gray-700 mb-6">
//           Are you sure you want to log out of your account?
//         </p>

//         {/* Buttons */}
//         <div className="flex justify-end gap-4">
//           <Button
//             title="Cancel"
//             variant="secondary"
//             size="md"
//             onClick={onClose}
//             className="border-2 border-black"
//           />

//           <Button
//             title="Logout"
//             variant="primary"
//             size="md"
//             onClick={() => {
//               logout();
//               onClose();
//             }}
//           />
//         </div>
//       </div>
//     </Card>
//   );
// }

// export default ConfirmBox;
"use client";
import React from "react";
import { signOut } from "next-auth/react";
import Card from "../Common/Card";
import Button from "../Common/Button";

function ConfirmBox({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Card isOpen={isOpen} title="Confirm Logout" onClose={onClose}>
      <div className="text-md lg:text-2xl font-light text-black">
        <p className="text-md lg:text-lg text-gray-700 mb-6">
          Are you sure you want to log out of your account?
        </p>

        <div className="flex justify-end gap-4">
          <Button
            title="Cancel"
            variant="secondary"
            size="md"
            onClick={onClose}
            className="border-2 border-black"
          />

          <Button
            title="Logout"
            variant="primary"
            size="md"
            onClick={() => {
              onClose(); // close modal first
              signOut({ callbackUrl: "/login" }); // NextAuth logout
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default ConfirmBox;
