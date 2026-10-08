import { DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// A dialog on desktop, a bottom sheet on phones (below 640px): full width,
// anchored to the bottom, rounded top corners, slides up, scrolls if tall.
// Only CSS differs, so the same accessible Radix dialog powers both.
export default function SheetDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      className={cn(
        "max-h-[90dvh] overflow-y-auto sm:max-w-2xl",
        "max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:max-w-full max-sm:translate-x-0 max-sm:translate-y-0",
        "max-sm:rounded-b-none max-sm:rounded-t-2xl max-sm:border-x-0 max-sm:border-b-0",
        "max-sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
        "max-sm:data-[state=open]:slide-in-from-bottom max-sm:data-[state=closed]:slide-out-to-bottom",
        className,
      )}
      {...props}
    />
  );
}
