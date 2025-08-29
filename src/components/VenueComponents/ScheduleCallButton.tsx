"use client"
import React, { useState, useEffect } from 'react'
import { PopupModal } from "react-calendly";

const ScheduleCallButton = () => {
    const [isOpen, setIsOpen] = useState(false)

  const pageSettings = {
        backgroundColor: 'ffffff',
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        primaryColor: '00a2ff',
        textColor: '4d5055',
        zIndex: 9999,
      }

  // Force z-index on Calendly modal when it opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const calendlyElements = document.querySelectorAll('[class*="calendly"]');
        calendlyElements.forEach((element) => {
          if (element instanceof HTMLElement) {
            element.style.zIndex = '9999';
          }
        });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  return (
    <div id='schedule-call-button' className="relative z-[9999] flex-1">
        <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-md text-sm"
      >
        Schedule a Call
      </button>
      <PopupModal
          url="https://calendly.com/karnes-james/new-meeting"
          onModalClose={() => setIsOpen(false)}
          open={isOpen}
          pageSettings={pageSettings}
          rootElement={document.body}
        />

        {/* <InlineWidget url="https://calendly.com/karnes-james/new-meeting" /> */}
    </div>
  )
}

export default ScheduleCallButton