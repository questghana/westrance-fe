import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

export default function IOSTrackingModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const isAppleDevice =
      /iPhone|iPad|iPod|Mac/i.test(navigator.userAgent)

    const hasSeenBanner = document.cookie.includes("iosBanner2025=seen")

    if (isAppleDevice && !hasSeenBanner) {
      setOpen(true)
    }
  }, [])

  const handleDismiss = () => {
    setOpen(false)
    document.cookie = "iosBanner2025=seen; max-age=2592000; path=/"
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md bg-orange-500 text-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-bold">
            Please disable cross-site tracking in Safari
          </DialogTitle>
        </DialogHeader>
        <p className="mt-2">
          Follow these steps:<br />
          <strong>Settings → Safari → Prevent cross-site tracking → OFF</strong>
        </p>
        <p className="mt-2">
          If you are using a different browser, please adjust cross-site tracking settings to view all content.
        </p>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            className="text-orange-500 bg-white hover:bg-gray-100"
            onClick={handleDismiss}
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
