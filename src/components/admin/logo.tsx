import { Link, type LinkProps } from "react-router";
import { motion } from "framer-motion";
import { Flex } from "../ui/flex";
import { cn } from "@/lib/utils";

interface LogoProps {
  containerClassName?: string;
  isCompact?: boolean;
  to: LinkProps["to"];
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  containerClassName,
  isCompact = false,
  className,
  to,
}) => {
  return (
    <Link to={to}>
      <Flex
        className={cn(
          !isCompact && "justify-start",
          "overflow-hidden gap-1",
          containerClassName
        )}
      >
        <motion.img
          src="/Logo/favicon.svg"
          animate={{ rotate: isCompact ? 0 : 360 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={cn("w-10 ml-4 h-10", isCompact && "m-aut", className)}
        />
        <motion.img
          src="/Logo/estrance.svg"
          className={cn("max-w-26 h-10", className)}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          animate={{
            display: isCompact ? "none" : "block",
            opacity: isCompact ? 0 : 1,
          }}
        />
      </Flex>
    </Link>
  );
};
