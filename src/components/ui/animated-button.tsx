"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const AnimatedButton = ({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  type = "button",
}: AnimatedButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm rounded-full",
    md: "px-6 py-3 text-sm rounded-full",
    lg: "px-8 py-4 text-base rounded-full",
  };

  const baseClasses = {
    primary: "bg-white text-black font-normal",
    secondary: "bg-white/10 text-white font-normal border border-white/20",
    outline: "bg-transparent text-white font-normal border border-white/20",
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer",
        sizeClasses[size],
        baseClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <motion.div
        className={cn(
          "absolute pointer-events-none rounded-full",
          variant === "primary" ? "bg-black" : "bg-white"
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovering ? 3 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0.55,
          ease: "easeInOut",
        }}
        style={{
          width: 100,
          height: 100,
          left: mousePosition.x - 50,
          top: mousePosition.y - 50,
        }}
      />

      <span
        className={cn(
          "relative z-10 flex items-center justify-center gap-2 transition-colors duration-300",
          isHovering && variant === "primary" && "text-white",
          isHovering && variant !== "primary" && "text-black"
        )}
      >
        {children}
      </span>
    </motion.button>
  );
};

export const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
