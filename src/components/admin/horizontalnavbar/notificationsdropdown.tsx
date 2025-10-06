import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
// import { Flex } from "../../ui/flex";
import { Box } from "../../ui/box";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import { XCircle } from "lucide-react";
import { axios } from "@/configs/axios.config";
import { AdminInfo, useAdminStore } from "@/store/admininfo";
import { useAuthStore } from "@/store/userInfo.store";

interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const NotificationsDropdown: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const { admin, setAdmin } = useAdminStore();
  const { role } = useAuthStore();
  const hasShownErrorRef = useRef(false);

  const canNotify = (admin?.role === "admin") || role === "CompanyAdmin" || role === "Hospital Employee";
  
  const fetchNotifications = async () => {
    try {
      if (admin?.role === "admin") {
        const response = await axios.get("/admin/notifications");
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unreadCount);
        setAdmin({ ...admin, unreadNotifications: response.data.unreadCount } as AdminInfo);
        return;
      }

      if (role === "CompanyAdmin") {
        const response = await axios.get("/company/notifications");
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unreadCount);
        return;
      }

      if (role === "Hospital Employee") {
        const response = await axios.get("/company/notifications");
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unreadCount);
        return;
      }

      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      if (!hasShownErrorRef.current) {
        toast.error("Failed to load notifications.");
        hasShownErrorRef.current = true;
      }
    }
  };

  useEffect(() => {
    if (!canNotify) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    fetchNotifications();
  }, [admin?.role, role]);

  useEffect(() => {
    if (open && canNotify) {
      fetchNotifications();
    }
  }, [open, canNotify]);

  const handleMarkAsRead = async (id: string) => {
    try {
      if (admin?.role === "admin") {
        await axios.patch(`/admin/notifications/${id}`, { isRead: true });
        fetchNotifications();
        return;
      }
      if (role === "CompanyAdmin" || role === "Hospital Employee") {
        await axios.patch(`/company/notifications/${id}`, { isRead: true });
        fetchNotifications();
        return;
      }
    } catch (error) {
      toast.error("Failed to mark notification as read.");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      if (admin?.role === "admin") {
        await axios.post("/admin/notifications/mark-all-read");
        fetchNotifications();
        return;
      }
      if (role === "CompanyAdmin" || role === "Hospital Employee") {
        await axios.post("/company/notifications/mark-all-read");
        fetchNotifications();
        return;
      }
    } catch (error) {
      toast.error("Failed to mark all notifications as read.");
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      if (admin?.role === "admin") {
        await axios.delete(`/admin/notifications/${id}`);
        fetchNotifications();
        toast.success("Notification deleted.");
        return;
      }
      if (role === "CompanyAdmin" || role === "Hospital Employee") {
        await axios.delete(`/company/notifications/${id}`);
        fetchNotifications();
        toast.success("Notification deleted.");
        return;
      }
    } catch (error) {
      toast.error("Failed to delete notification.");
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className={cn(
                  "p-5 relative bg-[#F6F6F6] text-black hover:bg-[#F6F6F6] rounded-full cursor-pointer",
                  className
                )}
              >
                <Bell className="font-extralight" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 left-5.5 size-6 rounded-full bg-red-500 text-white text-[9px] font-medium border-2 border-gray-100">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent className="mt-2">
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent align="end" className="w-80 p-4">
        <DropdownMenuLabel className="mb-2 text-lg font-medium flex justify-between items-center">
          Notifications
          {notifications?.length > 0 && admin?.role === "admin" && (
            <Button variant="link" onClick={handleMarkAllAsRead} className="text-sm p-0 h-auto cursor-pointer">
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <Box className="space-y-4 max-h-[300px] overflow-y-auto">
          {(notifications?.length === 0 || (admin?.role !== "admin" && role !== "CompanyAdmin" && role !== "Hospital Employee")) ? (
            <p className="text-center text-gray-500">No new notifications</p>
          ) : (
            notifications?.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                onClick={() => handleMarkAsRead(notification.id)}
                className={cn(
                  "flex items-start gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-100",
                  { "bg-blue-50": !notification.isRead }
                )}
              >
                <Box className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </Box>
                <Button className="cursor-pointer" variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNotification(notification.id);
                }}>
                    <XCircle className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuItem>
            ))
          )}
        </Box>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
