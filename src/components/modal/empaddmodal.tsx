import React, { useState } from "react";
// import { Box } from '../ui/box'
import empadd from "/companyside/empadd.png";
// import { Alert, AlertDescription } from '../ui/alert'
// import { Button } from '../ui/button'
// import { Flex } from '../ui/flex'
import { IoCopyOutline } from "react-icons/io5";
import { Stack } from "@/components/ui/stack";
import { Box } from "@/components/ui/box";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Flex } from "@/components/ui/flex";
import { Button } from "@/components/ui/button";
import { CopyCheck } from "lucide-react";
import { useAuthStore } from "@/store/userInfo.store";
// import { Stack } from '../ui/stack'

type EmpaddmodalProps = {
  copytxt: string;
  setCopytxt: React.Dispatch<React.SetStateAction<string>>;
  onGoToList: () => void;
};

const Empaddmodal: React.FC<EmpaddmodalProps> = ({ copytxt, setCopytxt, onGoToList }) => {
  const [isCopied, setIsCopied] = useState(false);
  const {newEmployeeId} = useAuthStore()
  const handleCopy = () => {
    setCopytxt(copytxt);
    navigator.clipboard.writeText(copytxt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Stack className="gap-4">
      <Box className="flex justify-center -mt-28">
        <img src={empadd} alt="Regsuccess" className="h-60" />
      </Box>
      <Box>
        <p className="text-[#0A51BA] text-center font-bold lg:text-3xl">
          Employee Successfully Added!
        </p>
      </Box>
      <Box className="py-4">
        <Alert className="bg-[#F6FAFF] border-none">
          <AlertDescription className="flex justify-center text-center text-[#0C1F3C] font-semibold text-[16px]">
            Employee has been successfully registered in the system.
          </AlertDescription>
        </Alert>
        <Flex className="items-center justify-center flex-col lg:flex-row mt-4">
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
      <Box className="text-center">
        <p className="text-[#0C1F3C] lg:text-md md:text-[16px] text-[14px] text-nowrap">
          You can now manage this employee’s profile and <br /> benefits.
        </p>
      </Box>
      <Box className="flex justify-center pb-4">
        <Button onClick={() => onGoToList()} className="h-12 px-12 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer">
          Go to Employee List
        </Button>
      </Box>
    </Stack>
  );
};

export default Empaddmodal;
