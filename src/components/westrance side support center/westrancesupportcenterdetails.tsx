import { IoIosArrowDown } from "react-icons/io";
import { UserProfile } from "../common/userprofile";
import { Box } from "../ui/box";
import { Center } from "../ui/center";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Flex } from "../ui/flex";
import { Stack } from "../ui/stack";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useAdminStore, useTicketStore } from "@/store/admininfo";
import { toast } from "sonner";
import { axios } from "@/configs/axios.config";




export const WestranceSupportCenterDetails = () => {
  const {selectedTicket, updateStatus, clearSelectedTicket} = useTicketStore()
  const {setLoading, loading} = useAdminStore()
  const ticketId = selectedTicket?.ticketId
  const updateStatusHandle = async(ticketId: string | undefined, Status: string)=>{
    try {
      const response = await axios.patch(`/admin/updateTicketStatus/${ticketId}`, {
        Status
      })
      updateStatus(response.data.ticket)
      toast.success(response.data.message)
    } catch (error: any) {
      toast.error(error?.response?.data?.error)
    }
  }
  const HandleRemoveRequest = async ()=>{
    try {
      setLoading(true)
      const response = await axios.delete(`/admin/deleteTicket/${ticketId}`)
      toast.success(response.data.message)
      clearSelectedTicket()
    } catch (error:any) {
      toast.error(error?.response?.data?.error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box className="mt-12">
      <Flex >
        <UserProfile
          label=""
          avatarClassName="size-24"
          src={selectedTicket?.profileImage ? selectedTicket?.profileImage : "https://github.com/shadcn.png"}
          description=""
          />
        <Stack className="gap-0">
          <p className="font-medium text-xl">{selectedTicket?.companyName}</p>
          <p><span className="text-[#8E8E8E]">Summited Date:</span>{selectedTicket?.createdAt ? new Date(selectedTicket?.createdAt).toLocaleString("en-US",{
            month: "2-digit",
            year:"2-digit",
            day: "2-digit"
          }) : "N/A"}</p>
        </Stack>
        <Flex className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Center className="bg-[#1055ba] text-white cursor-pointer hover:bg-[#1055ba]/80 hover:text-white rounded-sm w-38 h-10 justify-between items-center">
                <h1 className="text-[14px] px-4">{selectedTicket?.status}</h1>
                <Center className="bg-[#0e66b7] rounded-tr-sm rounded-br-sm h-10 w-10">
                  <IoIosArrowDown className="size-4" />
                </Center>
              </Center>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-1">
              <DropdownMenuCheckboxItem className="p-2" onClick={()=> updateStatusHandle(ticketId, "Pending")}>
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="p-2" onClick={()=> updateStatusHandle(ticketId, "Approved")}>
                Approved
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={HandleRemoveRequest} className="w-42 h-10 rounded-md bg-[#FF4E4E] hover:bg-[#FF4E4E]/80 cursor-pointer">
            <Trash2 />
            {loading ? "Deleted..." : "Remove Request"}
          </Button>
        </Flex>
      </Flex>
      <Flex className="pt-6 gap-2 items-center">
        <p className="whitespace-nowrap font-medium">Details</p>
        <Box className="border-[1px] border-[#D0D8ED] w-full" />
      </Flex>
      <Stack className="mt-12 gap-4">
      <Flex className="gap-40">
        <p className="text-[#8E8E8E]">Title:</p>
        <p>{selectedTicket?.subject}</p>
      </Flex>
      <Flex className="gap-21 items-start">
        <p className="text-[#8E8E8E]">Company Type:</p>
        <p className="pb-80">
          {selectedTicket?.companyType}
        </p>
      </Flex>
      </Stack>
    </Box>
  )
};
