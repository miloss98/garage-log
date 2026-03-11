"use client";

import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  preview: string | null;
  onChange: (file: File) => void;
  onClear?: () => void;
  className?: string;
}

export default function ImageUpload({
  preview,
  onChange,
  onClear,
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium">Car Photo</label>

      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative w-full rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer group",
          preview
            ? "border-transparent"
            : "border-border hover:border-amber-400",
        )}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Car preview"
              className="w-full h-52 object-cover rounded-xl"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <ImagePlus size={18} />
                Change photo
              </div>
            </div>
            {/* Clear button */}
            {onClear && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3 group-hover:bg-amber-100 transition-colors">
              <ImagePlus
                size={22}
                className="text-muted-foreground group-hover:text-amber-500 transition-colors"
              />
            </div>
            <p className="text-sm font-medium text-foreground">
              Click to upload photo
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG or WEBP
            </p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
