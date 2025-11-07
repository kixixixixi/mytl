"use client"

import { FC, useEffect, useState } from "react"
import { Chrono } from "./chrono"

export const ChronoView: FC = () => {
  const [items, setItems] = useState<
    {
      title: string
      cardTitle: string
      cardDetailedText: string
      startDate?: string
      endDate?: string
      isRange?: boolean
    }[]
  >()

  useEffect(() => {
    const set = () => {
      setItems([
        {
          startDate: "1939年9月",
          endDate: "1945年9月",
          cardTitle: "第二次世界大戦",
          cardDetailedText: "ドイツのポーランド侵攻により始まり、日本の降伏により終結した世界規模の戦争",
          isRange: true,
          title: "",
        },
        {
          title: "1940年5月",
          cardTitle: "ダンケルクの戦い",
          cardDetailedText: "連合軍のフランスからの撤退作戦",
        },
        {
          startDate: "1941年6月",
          endDate: "1944年1月",
          cardTitle: "レニングラード包囲戦",
          cardDetailedText: "ドイツ軍によるレニングラード（現サンクトペテルブルク）の872日間にわたる包囲作戦",
          isRange: true,
          title: "",
        },
        {
          title: "1941年12月",
          cardTitle: "真珠湾攻撃",
          cardDetailedText: "日本軍による真珠湾への奇襲攻撃",
        },
        {
          title: "1944年6月",
          cardTitle: "ノルマンディー上陸作戦",
          cardDetailedText: "連合軍によるヨーロッパ西部への侵攻開始",
        },
        {
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
          mode="VERTICAL_ALTERNATING"
          theme={{
            primary: "#4a5568",
            secondary: "#f7fafc",
            cardBgColor: "#ffffff",
            titleColor: "#2d3748",
            titleColorActive: "#ffffff",
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
