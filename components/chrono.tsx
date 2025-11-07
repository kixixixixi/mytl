"use client"

import { FC } from "react"

type TimelineItem = {
  title: string
  cardTitle: string
  cardDetailedText?: string
  startDate: Date
  endDate?: Date
}

type Theme = {
  primary: string
  cardBgColor: string
  titleColor: string
}

type FontSizes = {
  cardTitle: string
  cardText: string
  title: string
}

type ChronoProps = {
  items: TimelineItem[]
  theme?: Theme
  fontSizes?: FontSizes
  cardHeight?: number
}

const formatDate = (dateInput: string | Date): string => {
  if (typeof dateInput === "string") {
    return dateInput
  }
  return `${dateInput.getFullYear()}年${dateInput.getMonth() + 1}月`
}

export const Chrono: FC<ChronoProps> = ({
  items,
  theme = {
    primary: "#4a5568",
    cardBgColor: "#ffffff",
    titleColor: "#2d3748",
  },
  fontSizes = {
    cardTitle: "1rem",
    cardText: "0.9rem",
    title: "0.8rem",
  },
  cardHeight = 150,
}) => {
  const sorted = items.toSorted(
    (i1, i2) => i1.startDate.getTime() - i2.startDate.getTime()
  )
  const start = sorted[0].startDate
  const end = new Date(
    Math.max.apply(
      null,
      items.map((i) => i.endDate || i.startDate)
    )
  )
  const position = (date: Date) =>
    (date.getTime() - start.getTime()) / (end.getTime() - start.getTime())
  const length = (s: Date, e: Date) =>
    (e.getTime() - s.getTime()) / (end.getTime() - start.getTime())
  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        padding: "20px",
        width: "100%",
      }}
    >
      <div
        style={{
          height: `${items.length * 200}px`,
          margin: "0 auto",
          maxWidth: "1000px",
          padding: "20px 0",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "#999",
            bottom: 0,
            left: "50%",
            position: "absolute",
            top: 0,
            transform: "translateX(-50%)",
            width: "4px",
          }}
        />
        {sorted.map((item, index) => {
          const isLeft = index % 2 === 0
          const isRange = !!item.endDate
          return (
            <>
              {isRange ? (
                <>
                  <div
                    style={{
                      backgroundColor: "rgba(255, 0, 0, 0.2)",
                      borderRadius: "6px",
                      height: `${length(item.startDate, item.endDate) * 100}%`,
                      left: isLeft ? "calc(50% - 10px)" : "calc(50% + 10px)",
                      position: "absolute",
                      top: `${position(item.startDate) * 100}%`,
                      transform: "translateX(-50%)",
                      width: "12px",
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: theme.primary,
                        border: "3px solid #ffffff",
                        borderRadius: "50%",
                        height: "16px",
                        left: "50%",
                        position: "absolute",
                        top: "-8px",
                        transform: "translateX(-50%)",
                        width: "16px",
                        zIndex: 2,
                      }}
                    />
                  </div>
                </>
              ) : (
                <div
                  style={{
                    backgroundColor: theme.primary,
                    border: "3px solid #ffffff",
                    borderRadius: "50%",
                    height: "16px",
                    left: "50%",
                    position: "absolute",
                    top: `${position(item.startDate) * 100}%`,
                    transform: "translateX(-50%)",
                    width: "16px",
                    zIndex: 2,
                  }}
                />
              )}
              <div
                key={index}
                style={{
                  minHeight: isRange ? `40px` : "auto",
                  position: "absolute",
                  top: `${position(item.startDate) * 100}%`,
                  width: "100%",
                }}
              >
                <div
                  style={{
                    backgroundColor: theme.cardBgColor,
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    marginLeft: isLeft ? 0 : "55%",
                    marginRight: isLeft ? "55%" : 0,
                    minHeight: `${cardHeight}px`,
                    padding: "20px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: theme.titleColor,
                      fontSize: fontSizes.title,
                      fontWeight: 600,
                      marginBottom: "8px",
                      opacity: 0.8,
                    }}
                  >
                    {item.endDate && item.startDate && item.endDate
                      ? `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`
                      : item.title}
                  </div>
                  <div
                    style={{
                      color: theme.titleColor,
                      fontSize: fontSizes.cardTitle,
                      fontWeight: 700,
                      lineHeight: 1.4,
                      marginBottom: "12px",
                    }}
                  >
                    {item.cardTitle}
                  </div>
                  <div
                    style={{
                      color: theme.titleColor,
                      fontSize: fontSizes.cardText,
                      lineHeight: 1.6,
                      opacity: 0.9,
                    }}
                  >
                    {item.cardDetailedText}
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}
