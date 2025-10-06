// import { PageWrapper } from "@/components/common/pagewrapper";
// import { EmblaCarousel } from "@/components/ui/emblacarousel";
// import { Center } from "@/components/ui/center";
// import Autoplay from "embla-carousel-autoplay";
// import { Flex } from "@/components/ui/flex";
// import { Box } from "@/components/ui/box";
// import { Outlet } from "react-router";

import Footer from "@/components/footer/Footer";
import Stepper from "@/components/stepper/stepper";
import { Box } from "@/components/ui/box";
import { Outlet } from "react-router";

export const AuthenticationLayout = () => {
  return (
    <Box>
      <Box className="flex-1 px-6 py-6 flex flex-col lg:flex-row md:gap-4 gap-4 bg-[#F8F8F8]">
      <Stepper/>
      <Outlet/>
      </Box>
      <Footer prop={40}/>
    </Box>
  );
};
// <PageWrapper className="p-0 border-none flex items-center justify-center max-md:block">
//   <Flex className="max-md:flex-col size-full gap-0">
//     <Center className="self-stretch overflow-auto classic-scroll max-h-[100vh]">
//       <Outlet />
//     </Center>
//     <EmblaCarousel
//       carouselClassName="flex-1 relative self-stretch overflow-clip overflow-hidden max-md:hidden h-[100vh] "
//       dotContainerClassName="py-4 absolute bottom-0 inset-x-0"
//       plugins={[Autoplay({ stopOnInteraction: false })]}
//       dotInActiveClassName="border border-white/50"
//       slidesContainerClassName="gap-0 size-full"
//       dotActiveClassName="bg-white/50"
//       options={{ loop: true }}
//       slides={[
//         <Box className="shrink-0 size-full bg-[#1c1c1d] flex items-center justify-center p-15">
//           <img
//             className="max-h-full max-w-full object-contain"
//             src="/authform/row-cover-1.svg"
//             alt="row-cover-1.svg"
//           />
//         </Box>,
//         <Box className="shrink-0 size-full bg-[#1c1c1d] flex items-center justify-center p-15">
//           <img
//             className="max-h-full max-w-full object-contain"
//             src="/authform/row-cover-2.svg"
//             alt="row-cover-2.svg"
//           />
//         </Box>,
//         <Box className="shrink-0 size-full bg-[#1c1c1d] flex items-center justify-center p-15">
//           <img
//             className="max-h-full max-w-full object-contain"
//             src="/authform/row-cover-3.svg"
//             alt="row-cover-3.svg"
//           />
//         </Box>,
//       ]}
//     />
//   </Flex>
// </PageWrapper>
