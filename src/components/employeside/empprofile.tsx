import React from "react";
import { Box } from "../ui/box";
import Personalinfo from "./personalinfo";
import Dependedform from "./dependedform";
import { useAuthStore } from "@/store/userInfo.store";

const Empprofile: React.FC = () => {
  const {employee} = useAuthStore()
  return (
    <Box className="p-2 bg-white rounded-xl w-full">
      <Box className="px-2 py-2">
        <p className="font-medium">Add New Dependent</p>
        <Box className="flex flex-col lg:flex-row justify-between lg:items-center gap-3">
          <Box className="bg-[#F6FAFF] rounded-md lg:w-[700px] md:w-[450px] px-4 py-4 mt-2">
            <p>
              Manage and update your personal and employment details to ensure
              your information stays accurate and secure within the WESTRANCE
              system.
            </p>
          </Box>
          <Box className="bg-[#FFF9E6] rounded-lg px-6 py-2 mt-2 text-center">
            <p>Total Dependent Allowed: {employee?.dependents}</p>
          </Box>
        </Box>
        <Box className="pt-4">
          <Personalinfo />
          <Dependedform />
        </Box>
      </Box>
    </Box>
  );
};

export default Empprofile;
