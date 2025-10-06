import { ComponentProps, FC } from "react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  useSidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarContent,
  SidebarMenuSub,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarGroupContent,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { ChevronRight, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { Box } from "../ui/box";
import { Logo } from "./logo";
import { useAuthStore } from "@/store/userInfo.store";
import { toast } from "sonner";
import { axios } from "@/configs/axios.config";
import { useAdminStore } from "@/store/admininfo";

interface NavItemBase {
  icon: string;
  title: string;
  url: string;
  activeIcon?: string;
}

export interface NavItem extends NavItemBase {
  subItems?: NavItemBase[];
}

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  navItems: NavItem[];
}

const renderIcon = (
  icon: NavItem["icon"],
  isActive: boolean,
  activeIcon?: string,
  className?: string
) => {
  if (!icon) return null;

  const src = isActive && activeIcon ? activeIcon : icon;

  return (
    <Center
      className={cn(
        "items-center size-6 rounded",
        isActive ? "bg-white bg-clip-text text-clip" : ""
      )}
    >
      <img
        src={src}
        alt=""
        className={cn(
          "size-4",
          isActive ? "filter brightness-0 invert  bg-clip-content" : "",
          className
        )}
        role="img"
        aria-hidden="true"
      />
    </Center>
  );
};

export const AppSidebar: FC<AppSidebarProps> = ({ navItems, ...props }) => {
  const is768 = useMediaQuery("(max-width: 768px)");
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate()
  const Handlelogout = async () => {
    const authState = useAuthStore.getState();
    const adminState = useAdminStore.getState()
    try {
      let logoutUrl = "/logout"
      if(adminState.admin?.role === "admin"){
        logoutUrl = "/admin/admin-logout"
        await axios.get(logoutUrl)
        adminState.clearAdmin()
        setTimeout(() => {
        navigate("/admin-login");
      }, 1000);
      } else if(authState.role){
        await axios.get(logoutUrl)
        authState.clearAuth()
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }
      toast.success("Logout success");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Logout failed");
    }
  }
  return (
    <Sidebar
      className="**:data-[sidebar=sidebar]:bg-white **:data-[sidebar=sidebar]:border-0 **:data-[sidebar=sidebar]:border-white"
      variant="floating"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="relative">
        <Logo
          to="/"
          isCompact={state === "collapsed"}
          className={state === "collapsed" ? "m-auto mt-4" : undefined}
          containerClassName={cn(
            "bg-transparent py-5 rounded-md",
            state === "collapsed" ? "py-2 inset-0 bg-transparent" : ""
          )}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger
                className={`ml-auto -mr-5 -mt-14 cursor-pointer ${state === "collapsed" ? "rotate-180 -mt-12" : ""
                  }`}
              />
            </TooltipTrigger>
            <TooltipContent className="mb-2">
              <p>{state === "collapsed" ? "Open" : "Close"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarHeader>
      <SidebarContent className="overflow-auto mt-8 border-t border-[#EBEBEB] px-2">
        <h1 className="ml-3 font-[400] font-Outfit mt-3">Menu</h1>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item, index) => {
                const normalizePath = (path: string) =>
                  path.replace(/\/+$/, "").split("?")[0];

                const currentPath = normalizePath(location.pathname);
                const isActive = normalizePath(item.url) === currentPath;

                const theSubPath = item.subItems?.map((subItem) => subItem.url);
                const isSubItemActive = theSubPath?.some(
                  (subPath) => normalizePath(subPath) === currentPath
                );

                return (
                  <SidebarMenuItem key={(item.title, index)}>
                    {item.subItems ? (
                      <Collapsible className="group/collapsible">
                        <SidebarMenuButton
                          className={isSubItemActive ? "bg-[#2e6fef]" : ""}
                          tooltip={{
                            className: "p-0",
                            children: (
                              <Box>
                                {item.subItems && (
                                  <ul className="text-sm">
                                    {item.subItems.map((subItem, key) => (
                                      <Link to={subItem.url} key={key}>
                                        <li
                                          className={cn(
                                            "flex items-center gap-2 p-2 rounded-md hover:bg-white/10"
                                          )}
                                        >
                                          <span className="text-white">
                                            {renderIcon(
                                              subItem.icon,
                                              normalizePath(subItem.url) ===
                                              currentPath,
                                              subItem.activeIcon
                                            )}
                                          </span>
                                          {subItem.title}
                                        </li>
                                      </Link>
                                    ))}
                                  </ul>
                                )}
                              </Box>
                            ),
                          }}
                          asChild
                        >
                          <CollapsibleTrigger
                            asChild
                            className={
                              isActive
                                ? "bg-[#2e6fef] text-white hover:bg-red-400"
                                : ""
                            }
                          >
                            <Link
                              className="min-w-full min-h-10 flex justify-between"
                              to={item.url}
                            >
                              <Center className="gap-2">
                                {renderIcon(
                                  item.icon,
                                  isActive,
                                  item.activeIcon,
                                  `${state === "collapsed" ? "ml-1" : undefined
                                  }`
                                )}
                                <span
                                  className={cn(
                                    state === "collapsed" && !is768
                                      ? "hidden"
                                      : is768
                                        ? "block"
                                        : undefined
                                  )}
                                >
                                  {item.title}
                                </span>
                              </Center>
                              {(state === "expanded" || is768) && (
                                <ChevronRight className="ml-1 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                              )}
                            </Link>
                          </CollapsibleTrigger>
                        </SidebarMenuButton>
                        <CollapsibleContent
                          className={
                            isSubItemActive
                              ? "bg-[#2e6fef] rounded-sm mt-1"
                              : ""
                          }
                        >
                          <SidebarMenuSub className="border-none pr-0">
                            {item.subItems.map((subItem, index) => {
                              const isSubItemActive =
                                normalizePath(subItem.url) === currentPath;
                              const isLastItem =
                                index === item.subItems!.length - 1;

                              return (
                                <SidebarMenuSubItem
                                  key={subItem.title}
                                  className={cn(
                                    "relative flex items-center gap-2 p-2",
                                    isSubItemActive
                                      ? "text-black rounded-md"
                                      : "text-gray-400"
                                  )}
                                >
                                  <Box
                                    className={cn(
                                      "absolute -left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black",
                                      isSubItemActive
                                        ? "bg-black w-2 h-2"
                                        : "border border-gray-400 bg-white"
                                    )}
                                  >
                                    <Box
                                      className={cn(
                                        isLastItem
                                          ? "hidden"
                                          : "absolute left-1/2 top-full w-[1px] h-9 -translate-x-1/2",
                                        isSubItemActive
                                          ? "bg-gray-500"
                                          : "bg-gray-400"
                                      )}
                                    />
                                  </Box>
                                  <Link
                                    to={subItem.url}
                                    className="flex items-center gap-2 text-[13px]"
                                  >
                                    {renderIcon(
                                      subItem.icon,
                                      isSubItemActive,
                                      subItem.activeIcon
                                    )}
                                    <span
                                      className={cn(
                                        state === "collapsed" && !is768
                                          ? "hidden"
                                          : is768
                                            ? "block"
                                            : undefined
                                      )}
                                    >
                                      {subItem.title}
                                    </span>
                                  </Link>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        className={cn(
                          // index === 5 && "hover:bg-white cursor-default",
                          isActive
                            ? "bg-[#2e6fef] text-white hover:bg-red-400 hover:text-white"
                            : ""
                        )}
                        tooltip={{
                          children: (
                            <span className="capitalize text-[14px]">
                              {item.title}
                            </span>
                          ),
                        }}
                        asChild
                      >
                        <Link
                          className="min-w-full min-h-10 text-gray-500"
                          to={item.url}
                        >
                          {renderIcon(
                            item.icon,
                            isActive,
                            item.activeIcon,
                            `${index === 0 && state === "collapsed"
                              ? ""
                              : "transform rotate-360"
                            } ${state === "collapsed" && !is768 ? "m-auto" : ""
                            }`
                          )}
                          <span
                            className={cn(
                              state === "collapsed" && !is768
                                ? "hidden"
                                : is768
                                  ? "block"
                                  : undefined
                            )}
                          >
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={Handlelogout} className="hover:bg-[#FF8B8B] bg-[#FF4E4E] bg-gradient-to-r from-[#FF4E4E] to-[#FF8B8B] text-white hover:text-zinc-700 cursor-pointer flex flex-row gap-2 justify-start items-center text-center">
          <LogOut
            className={state === "collapsed" ? "m-auto size-4" : "size-4"}
          />
          <h1 className={state === "collapsed" ? "hidden" : undefined}>
            Logout
          </h1>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
