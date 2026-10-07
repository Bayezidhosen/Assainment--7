"use client";

import { useState } from "react";

export default function DateDisplay() {
  const [date] = useState(() =>
    new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date())
  );

  return <span>{date}</span>;
}