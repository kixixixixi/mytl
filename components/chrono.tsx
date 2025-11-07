"use client"

import { FC } from "react"

interface TimelineItem {
  title: string
  cardTitle: string
  cardDetailedText: string
  startDate?: string
  endDate?: string
  isRange?: boolean
}

interface Theme {
  primary: string
  secondary: string
  cardBgColor: string
  titleColor: string
  titleColorActive: string
}

interface FontSizes {
  cardTitle: string
  cardText: string
  title: string
}

interface ChronoProps {
  items: TimelineItem[]
  mode?: "VERTICAL_ALTERNATING"
  theme?: Theme
  fontSizes?: FontSizes
  cardHeight?: number
}

const parseDate = (dateStr: string): Date => {
  const [year, month] = dateStr.split('年')
  const monthNum = month ? parseInt(month, 10) : 1
  return new Date(parseInt(year, 10), monthNum - 1)
}

const checkOverlap = (item1: TimelineItem, item2: TimelineItem): boolean => {
  const getStartDate = (item: TimelineItem) => 
    item.isRange && item.startDate ? parseDate(item.startDate) : 
    item.title ? parseDate(item.title) : new Date()
  
  const getEndDate = (item: TimelineItem) => 
    item.isRange && item.endDate ? parseDate(item.endDate) : 
    item.title ? parseDate(item.title) : new Date()

  const start1 = getStartDate(item1)
  const end1 = getEndDate(item1)
  const start2 = getStartDate(item2)
  const end2 = getEndDate(item2)

  return start1 <= end2 && start2 <= end1
}

export const Chrono: FC<ChronoProps> = ({
  items,
  mode: _mode = "VERTICAL_ALTERNATING",
  theme = {
    primary: "#4a5568",
    secondary: "#f7fafc",
    cardBgColor: "#ffffff",
    titleColor: "#2d3748",
    titleColorActive: "#ffffff",
  },
  fontSizes = {
    cardTitle: "1rem",
    cardText: "0.9rem",
    title: "0.8rem",
  },
  cardHeight = 150,
}) => {
  const itemsWithOverlap = items.map((item, index) => {
    const overlaps = items.filter((otherItem, otherIndex) => 
      index !== otherIndex && checkOverlap(item, otherItem)
    )
    return { ...item, overlaps: overlaps.length > 0, overlapCount: overlaps.length }
  })
  return (
    <div className="timeline-container">
      <div className="timeline">
        <div className="timeline-line" style={{ backgroundColor: theme.primary }} />
        {itemsWithOverlap.map((item, index) => (
          <div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"} ${
              item.isRange ? "range-item" : ""
            } ${item.overlaps ? "overlapping" : ""}`}
          >
            {item.isRange ? (
              <>
                <div
                  className="timeline-range-start"
                  style={{ backgroundColor: theme.primary }}
                />
                <div
                  className="timeline-range-line"
                  style={{ 
                    backgroundColor: item.overlaps ? "#e53e3e" : theme.primary,
                    width: item.overlaps ? "8px" : "6px"
                  }}
                />
                <div
                  className="timeline-range-end"
                  style={{ backgroundColor: theme.primary }}
                />
              </>
            ) : (
              <div
                className="timeline-marker"
                style={{ 
                  backgroundColor: item.overlaps ? "#e53e3e" : theme.primary,
                  width: item.overlaps ? "20px" : "16px",
                  height: item.overlaps ? "20px" : "16px"
                }}
              />
            )}
            <div
              className="timeline-content"
              style={{
                backgroundColor: theme.cardBgColor,
                minHeight: `${cardHeight}px`,
                borderLeft: item.overlaps ? "4px solid #e53e3e" : "1px solid #e2e8f0",
                borderWidth: item.overlaps ? "2px" : "1px",
                borderColor: item.overlaps ? "#e53e3e" : "#e2e8f0"
              }}
            >
              <div
                className="timeline-title"
                style={{
                  color: theme.titleColor,
                  fontSize: fontSizes.title,
                }}
              >
                {item.isRange && item.startDate && item.endDate
                  ? `${item.startDate} - ${item.endDate}`
                  : item.title}
                {item.overlaps && (
                  <span className="overlap-indicator" style={{ 
                    color: "#e53e3e", 
                    fontSize: "0.7rem", 
                    marginLeft: "8px",
                    fontWeight: "600"
                  }}>
                    ⚠ 同時期
                  </span>
                )}
              </div>
              <div
                className="timeline-card-title"
                style={{
                  color: theme.titleColor,
                  fontSize: fontSizes.cardTitle,
                }}
              >
                {item.cardTitle}
              </div>
              <div
                className="timeline-card-text"
                style={{
                  color: theme.titleColor,
                  fontSize: fontSizes.cardText,
                }}
              >
                {item.cardDetailedText}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .timeline-container {
            width: 100%;
            height: 100%;
            padding: 20px;
            overflow-y: auto;
          }

          .timeline {
            position: relative;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px 0;
          }

          .timeline-line {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 4px;
            transform: translateX(-50%);
          }

          .timeline-item {
            position: relative;
            margin: 40px 0;
            width: 100%;
          }

          .timeline-item.left .timeline-content {
            margin-right: 55%;
          }

          .timeline-item.right .timeline-content {
            margin-left: 55%;
          }

          .timeline-marker {
            position: absolute;
            left: 50%;
            top: 20px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            transform: translateX(-50%);
            z-index: 2;
            border: 3px solid #ffffff;
          }

          .timeline-range-start {
            position: absolute;
            left: 50%;
            top: 10px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            transform: translateX(-50%);
            z-index: 3;
            border: 2px solid #ffffff;
          }

          .timeline-range-end {
            position: absolute;
            left: 50%;
            bottom: 10px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            transform: translateX(-50%);
            z-index: 3;
            border: 2px solid #ffffff;
          }

          .timeline-range-line {
            position: absolute;
            left: 50%;
            top: 16px;
            bottom: 16px;
            width: 6px;
            transform: translateX(-50%);
            z-index: 2;
            border-radius: 3px;
          }

          .timeline-item.range-item {
            min-height: 120px;
          }

          .timeline-item.overlapping .timeline-content {
            box-shadow: 0 4px 12px rgba(229, 62, 62, 0.2);
          }

          .timeline-item.overlapping .timeline-range-start,
          .timeline-item.overlapping .timeline-range-end {
            border-color: #e53e3e;
            box-shadow: 0 0 8px rgba(229, 62, 62, 0.3);
          }

          .timeline-item.overlapping .timeline-marker {
            border-color: #e53e3e;
            box-shadow: 0 0 8px rgba(229, 62, 62, 0.3);
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% {
              box-shadow: 0 0 8px rgba(229, 62, 62, 0.3);
            }
            50% {
              box-shadow: 0 0 16px rgba(229, 62, 62, 0.6);
            }
            100% {
              box-shadow: 0 0 8px rgba(229, 62, 62, 0.3);
            }
          }

          .timeline-content {
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            position: relative;
          }

          .timeline-item.left .timeline-content::after {
            content: "";
            position: absolute;
            right: -10px;
            top: 20px;
            width: 0;
            height: 0;
            border-left: 10px solid ${theme.cardBgColor};
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
          }

          .timeline-item.right .timeline-content::after {
            content: "";
            position: absolute;
            left: -10px;
            top: 20px;
            width: 0;
            height: 0;
            border-right: 10px solid ${theme.cardBgColor};
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
          }

          .timeline-title {
            font-weight: 600;
            margin-bottom: 8px;
            opacity: 0.8;
          }

          .timeline-card-title {
            font-weight: 700;
            margin-bottom: 12px;
            line-height: 1.4;
          }

          .timeline-card-text {
            line-height: 1.6;
            opacity: 0.9;
          }

          @media (max-width: 768px) {
            .timeline-line {
              left: 30px;
            }

            .timeline-item.left .timeline-content,
            .timeline-item.right .timeline-content {
              margin-left: 60px;
              margin-right: 0;
            }

            .timeline-marker {
              left: 30px;
            }

            .timeline-range-start,
            .timeline-range-end {
              left: 30px;
            }

            .timeline-item.left .timeline-content::after,
            .timeline-item.right .timeline-content::after {
              left: -10px;
              right: auto;
              border-right: 10px solid ${theme.cardBgColor};
              border-left: none;
              border-top: 10px solid transparent;
              border-bottom: 10px solid transparent;
            }
          }
        `
      }} />
    </div>
  )
}