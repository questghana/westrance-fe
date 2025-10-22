import React from "react";
import logo from "/Logo/logo.png";
import plusbtn from "/homeimg/plusbtn.png";
import { Link, useNavigate } from "react-router";
import { Card, CardHeader } from "../ui/card";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

const Navbar: React.FC = () => {
  const router = useNavigate();

  return (
    <>
      <Box className="absolute top-0 left-0 w-full">
        <Flex className="flex-row justify-between items-center px-10 sm:px-10 lg:px-20 py-4 md:py-6 gap-4">
          {/* Logo - Always visible */}
          <Link to={"/"} className="md:flex-1">
            <img
              src={logo}
              alt="Westrancelogo"
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <Box className="hidden lg:flex flex-1 justify-center">
            <ul className="list-none flex gap-4 lg:gap-8">
              {["What We Do", "What We Serve", "About Us"].map((item) => (
                <li
                  onClick={() => {
                    if (item === "What We Do") {
                      router("/#what-we-do");
                    } else if (item === "What We Serve") {
                      router("/#what-we-serve");
                    } else if (item === "About Us") {
                      router("/#about-us");
                    }
                  }}
                  key={item}
                  className="text-[#0A51BA] font-medium text-nowrap cursor-pointer"
                  // style={{
                  //   WebkitTextStroke:
                  //     item === "What We Do" ? "0.1px black" : "none",
                  //   textShadow:
                  //     item === "What We Do" ? "0 0 1px black" : "none",
                  // }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Box>

          {/* Auth Buttons - Hidden on mobile */}
          <Flex className="hidden lg:flex flex-1 justify-end gap-2 md:gap-4">
            <Link to={"/signin"}>
              <Button
                variant={"ghost"}
                className="text-[#0A51BA] cursor-pointer text-sm md:text-base"
              >
                Login
              </Button>
            </Link>
            <Link to={"/company-detail"}>
              <Button className="bg-gradient-to-r from-[#2B6AC9] to-[#0A51BA] h-8 md:h-10 px-4 md:px-8 lg:px-10 cursor-pointer text-sm md:text-base">
                Join
              </Button>
            </Link>
          </Flex>

          {/* Mobile Menu Button - Visible only on mobile */}
          <Sheet>
            <SheetTrigger>
              <MenuIcon className="size-5 lg:hidden flex" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-white w-80">
              <SheetHeader>
                <SheetTitle>
                  <Link to={"/"} className="md:flex-1">
                    <img
                      src={logo}
                      alt="Westrancelogo"
                      className="h-8 md:h-10 w-auto"
                    />
                  </Link>
                </SheetTitle>
                <SheetDescription>
                  <Box className="flex-1 justify-center">
                    <ul className="list-none flex flex-col mt-10 gap-8">
                      {["What We Do", "What We Serve", "About Us"].map((item) => (
                        <li
                          onClick={() => {
                            if (item === "What We Do") {
                              router("/#what-we-do");
                            } else if (item === "What We Serve") {
                              router("/#what-we-serve");
                            } else if (item === "About Us") {
                              router("/#about-us");
                            }
                          }}
                          key={item}
                          className="text-black font-medium text-nowrap cursor-pointer"
                        style={{
                          WebkitTextStroke:
                            item === "What We Do" ? "0.1px black" : "none",
                          textShadow:
                            item === "What We Do" ? "0 0 1px black" : "none",
                        }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </SheetDescription>
              </SheetHeader>
                <Flex className="px-2">
                  <Link to={"/signin"}>
                    <Button
                      variant={"ghost"}
                      className="text-[#0A51BA] cursor-pointer text-sm md:text-base"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to={"/company-detail"}>
                    <Button className="bg-gradient-to-r from-[#2B6AC9] to-[#0A51BA] h-8 md:h-10 px-4 md:px-8 lg:px-10 cursor-pointer text-sm md:text-base">
                      Join
                    </Button>
                  </Link>
                </Flex>
            </SheetContent>
          </Sheet>
        </Flex>

      </Box>

      <Box className="absolute top-[42%] left-[6%] hidden lg:block">
        <Card className="bg-white/70 max-w-[200px] min-w-[330px] shadow-xl">
          <CardHeader className="relative">
            <img
              src={plusbtn}
              alt="plusbtn"
              className="absolute top-[-50px] px-2"
            />
            <p className="text-[16px] text-[#484646] mt-4 tracking-wide">
              Westrance is your all-in-one solution for managing employee
              healthcare benefits — postpaid, seamless, and built for modern
              companies.
            </p>
          </CardHeader>
        </Card>
      </Box>
    </>
  );
};

export default Navbar;
