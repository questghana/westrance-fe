import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Stack } from "../ui/stack";
import { Flex } from "../ui/flex";

export const DelectAccountSettings = () => {
  return (
    <Flex className="max-sm:flex-col gap-6 justify-between w-full bg-white border border-gray-400/50  p-8 rounded-md max-md:px-3">
      <Stack>
        <h1 className="text-2xl font-semibold">Delect your account</h1>
        <p className="max-sm:text-sm">
          If you wish to proceed, confirm by clicking the button.
        </p>
      </Stack>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-red-600 min-h-12 w-40 cursor-pointer hover:bg-red-500">
            Delete My Account
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Account Alert</DialogTitle>
            <DialogDescription>
              Are your sure you want to delete your account?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="submit">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Flex>
  );
};
