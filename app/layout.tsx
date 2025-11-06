import "./reset.css"

export const metadata = {
  title: "MyTL",
  description: "MyTLは自分の年表をつくって共有できるサイト",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <header
          style={{
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: ".5rem",
            position: "relative",
          }}
        >
          <h1 style={{ fontSize: "1rem" }}>MyTL</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
export default RootLayout
