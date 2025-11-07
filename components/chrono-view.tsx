"use client"

import { FC, useEffect, useState } from "react"
import { Chrono } from "./chrono"

export const ChronoView: FC = () => {
  const [items, setItems] = useState<
    {
      title: string
      cardTitle: string
      cardDetailedText?: string
      startDate: Date
      endDate?: Date
    }[]
  >()

  useEffect(() => {
    const set = () => {
      setItems([
        {
          startDate: new Date(1939, 8),
          endDate: new Date(1945, 8),
          cardTitle: "第二次世界大戦",
          cardDetailedText:
            "ドイツのポーランド侵攻により始まり、日本の降伏により終結した世界規模の戦争",
          title: "",
        },
        // {
        //   startDate: new Date(1940, 4),
        //   title: "1940年5月",
        //   cardTitle: "ダンケルクの戦い",
        //   cardDetailedText: "連合軍のフランスからの撤退作戦",
        // },
        {
          startDate: new Date(1941, 5),
          endDate: new Date(1944, 0),
          cardTitle: "レニングラード包囲戦",
          cardDetailedText:
            "ドイツ軍によるレニングラード（現サンクトペテルブルク）の872日間にわたる包囲作戦",
          title: "",
        },
        {
          startDate: new Date(1941, 11),
          title: "1941年12月",
          cardTitle: "真珠湾攻撃",
          cardDetailedText: "日本軍による真珠湾への奇襲攻撃",
        },
        {
          startDate: new Date(1944, 5), // 1944年6月
          title: "1944年6月",
          cardTitle: "ノルマンディー上陸作戦",
          cardDetailedText: "連合軍によるヨーロッパ西部への侵攻開始",
        },
        {
          startDate: new Date(1945, 7),
          title: "1945年8月",
          cardTitle: "終戦",
          cardDetailedText: "日本の降伏により第二次世界大戦が終結",
        },
      ])
    }
    set()
  }, [])

  return (
    <div style={{ width: "100%", height: "600px" }}>
      {items && (
        <Chrono
          items={items}
          theme={{
            primary: "#f76644",
            cardBgColor: "#ffffff",
            titleColor: "#2d3748",
          }}
          fontSizes={{
            cardTitle: "1rem",
            cardText: "0.9rem",
            title: "0.8rem",
          }}
          cardHeight={150}
        />
      )}
    </div>
  )
}
