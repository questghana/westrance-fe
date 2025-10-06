import React, { useEffect, useState } from "react";
import { Box } from "../ui/box";
import { Input } from "../ui/input";
import { IoCopyOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import PhoneInput from "react-phone-number-input";
// import "react-phone-input-2/lib/style.css";
import "react-phone-number-input/style.css";
import { Flex } from "../ui/flex";
import { CopyCheck } from "lucide-react";
import { useAuthStore } from "@/store/userInfo.store";


const Personalinfo: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [copytxt, setCopytxt] = useState("");
  const { employee, newEmployeeId } = useAuthStore()
  const registerationNumber = employee?.registrationNumber.slice(4, 16)
  useEffect(() => {
    if (employee?.registrationNumber) {
      setPhone(employee.registrationNumber.slice(0, 4));
    }
    if (newEmployeeId) {
      setCopytxt(newEmployeeId);
    }
  }, [employee?.registrationNumber, newEmployeeId]);

  const handleCopy = () => {
    if (!copytxt) return;
    navigator.clipboard.writeText(copytxt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };


  return (
    <Box>
      <Box className="flex gap-2 items-center">
        <p className="whitespace-nowrap font-medium">
          Your Personal Information
        </p>
        <Box className="border-[1px] border-[#D0D8ED] w-full" />
      </Box>
      <Box className="flex flex-col lg:flex-row justify-between items-center pt-4 gap-4">
        <Box className="flex flex-col lg:flex-row gap-6">
          <Box>
            <label className="text-sm font-medium">
              First Name: <span className="text-red-500">*</span>
            </label>
            <Input className="md:w-70 py-6 bg-[#F8F8F8]" value={employee?.firstName} />
          </Box>
          <Box>
            <label className="text-sm font-medium">
              Last Name: <span className="text-red-500">*</span>
            </label>
            <Input className="md:w-70 py-6 bg-[#F8F8F8]" value={employee?.lastName} />
          </Box>
        </Box>
        <Flex className="items-center justify-center lg:flex-row flex-col mt-4 gap-6 lg:gap-2">
          <p>Unique ID:</p>
          <Flex className="items-center bg-[#ECFBEC] rounded-lg px-6 py-2">
            <p>{newEmployeeId}</p>
            <Box className="border-1 border-[#3C503C] h-6" />
            {isCopied === false ? (
              <IoCopyOutline
                size={20}
                className="cursor-pointer"
                onClick={handleCopy}
              />
            ) : (
              <CopyCheck />
            )}
          </Flex>
        </Flex>
      </Box>
      <Box className="pt-3 flex flex-col lg:flex-row justify-between items-center gap-4">
        <Box className="flex flex-col gap-2">
          <Box>
            <label className="text-sm font-medium">Email Address:</label>
            <Input className="lg:w-90 py-6 bg-[#F8F8F8]" value={employee?.emailAddress} />
          </Box>
          <Box>
            <label className="text-sm font-medium">
              Company Registration Number:
            </label>
            <Box className="flex flex-col lg:flex-row items-center gap-2 w-[100%]">
              <Box className="bg-[#F4F4F4] text-[#222] py-3 px-3 rounded-md text-sm relative border border-[#DCDEE2]">
                <PhoneInput
                  international
                  defaultCountry="PK"
                  countryCallingCodeEditable={false}
                  value={phone}
                  onChange={(value) => setPhone(value || "")}
                  className="custom-phone-input lg:w-18 md:w-65 py-1.5"
                />
              </Box>
              <Input
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none lg:w-70 md:w-70  bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                value={registerationNumber}
                readOnly
              />
            </Box>

          </Box>
        </Box>
        <Box>
          <Avatar className="rounded-lg h-50 w-50">
            <AvatarImage src={employee?.profileImage || ""} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
};

export default Personalinfo;
