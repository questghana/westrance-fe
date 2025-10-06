import React, { useEffect, useState } from "react";
import { Box } from "../ui/box";
import { Stack } from "../ui/stack";
import { Flex } from "../ui/flex";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { AccordionHeader } from "@radix-ui/react-accordion";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";
import { useAuthStore } from "@/store/userInfo.store";
import { Center } from "../ui/center";
import { Loader } from "lucide-react";

interface SupportProps {
  onCreateClick: () => void;
}

interface ticketProps {
  issue: string;
  subject: string;
  createdAt: string;
}

const Support: React.FC<SupportProps> = ({ onCreateClick }) => {
  const [ticketinfo, setTicketInfo] = useState<ticketProps[]>([])
  const { loading, setLoading } = useAuthStore()
  const getRecentTickets = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/ticket/getTicket")
      // console.log(response);
      setTicketInfo(response.data.ticket)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something Went Wrong")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getRecentTickets()
  }, [])
  return (
    <Box className="bg-white px-5 py-4 rounded-2xl">
      <Stack>
        <p className="font-medium">Support & Create Your Ticket</p>
        <Box className="bg-[#F6FAFF] rounded-md lg:w-[650px] md:w-[450px] px-4 py-4">
          <p>
            Need assistance? Create a support ticket and our team will get back
            to you promptly.
          </p>
        </Box>
        <Flex className="pt-6 justify-between items-start flex-col lg:flex-row">
          <Stack className="gap-0">
            <p className="font-semibold">Your Ticket</p>
            <p>
              You have no ticket yet! Create one by hitting the <span className="text-[#1E6EE5] underline cursor-pointer">
                Create Button
              </span>
            </p>
          </Stack>
          <Button
            onClick={onCreateClick}
            className="px-10 py-6 bg-[#0A51BA] hover:bg-[#0a50bad8] cursor-pointer"
          >
            Create Ticket
          </Button>
        </Flex>
        <Box className="mt-6 bg-[#D0D8ED] ">
          <Separator />
        </Box>
      </Stack>
      <Flex className="flex-col lg:flex-row justify-between lg:items-center items-start mt-6">
        <Stack className="gap-0 ">
          <p className="font-semibold">Your Ticket Notification</p>
          <p className="text-nowrap">
            Opps sorry, There are no notification to show
          </p>
        </Stack>
        <p className="text-[#FF4961] underline cursor-pointer text-nowrap">
          Clear All Notification
        </p>
      </Flex>
      {
        loading ? (
          <Center>
            <Loader className="animate-spin" />Loading...
          </Center>
        )
          :
          <Stack>
            <p className="mt-8 font-semibold">Recent Tickets</p>
            {
              ticketinfo.length === 0 ? (
                <p className="text-gray-500 mt-2 text-center">No tickets found.</p>
              ) : (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                >
                  {
                    ticketinfo.map((ticket, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionHeader className="mt-4">
                          {ticket.subject}
                        </AccordionHeader>
                        <AccordionTrigger className="py-0 pb-4 text-[#797979]">
                          Posted on {new Date(ticket.createdAt).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                          })}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          <p>
                            {ticket.issue}
                          </p>
                          {/* <p>
                    Key features include advanced processing capabilities, and an
                    intuitive user interface designed for both beginners and
                    experts.
                  </p> */}
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  }
                </Accordion>
              )
            }
          </Stack>
      }
    </Box>
  );
};

export default Support;
