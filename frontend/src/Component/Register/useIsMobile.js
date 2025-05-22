"use client"

import { useState, useEffect } from "react"

export const useIsMobile = (breakpoint = 768) => {
  // Initialize with null to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(null)

  useEffect(() => {
    // Function to check if window width is less than or equal to breakpoint
    const checkIsMobile = () => {
      return window.innerWidth <= breakpoint
    }

    // Set the initial value once mounted
    setIsMobile(checkIsMobile())

    const handleResize = () => {
      setIsMobile(checkIsMobile())
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [breakpoint])

  // Return false during SSR/initial render to match desktop layout
  return isMobile === null ? false : isMobile
}
