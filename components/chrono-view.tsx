"use client"

import { FC, useEffect, useState } from "react"
import { Chrono, ChronoItem } from "./chrono"

export const ChronoView: FC = () => {
  const [items, setItems] = useState<ChronoItem[]>()

  useEffect(() => {
    const set = () => {
      setItems([
        {
          startDate: new Date(2009, 4),
          endDate: new Date(2013, 3),
          title: "大学",
          detailedText: "",
        },
        {
          startDate: new Date(2013, 4),
          endDate: new Date(2014, 8),
          title: "株式会社HALO",
          detailedText: "新卒入社",
        },
        {
          startDate: new Date(2014, 8),
          endDate: new Date(2025, 11),
          title: "株式会社リロード",
          detailedText: "Web受託会社として",
        },
        {
          startDate: new Date(2021, 6),
          endDate: new Date(2025, 11),
          title: "FFFFF Cafe 営業開始",
        },
        {
          startDate: new Date(2025, 5),
          title: "FFFFF Cafe 移転",
          detailedText: "",
        },
      ])
    }
    set()
  }, [])

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {items && (
        <Chrono
          items={items}
          theme={{
            primary: "#f76644",
            cardBgColor: "#ffffff",
            titleColor: "#2d3748",
          }}
        />
      )}
    </div>
  )
}
