import React, { useState } from "react"
import { Global } from "@emotion/core"
import { ChromePicker } from "react-color"
import ContrastTest from "components/ContrastTest"

const App = () => {
  const [background, setBackground] = useState("#FF00E4")
  const [text, setText] = useState("#440066")

  return (
    <div css={{ maxWidth: 500, margin: "0 auto" }}>
      <Global
        styles={[
          "@import url('https://rsms.me/inter/inter.css');",
          {
            html: { fontFamily: "'Inter', sans-serif" },
            "@supports (font-variation-settings: normal)": {
              html: { fontFamily: "'Inter var', sans-serif" },
            },
            a: {
              color: "#377DD3",
              textDecoration: "none",
            },
          },
        ]}
      />

      <ContrastTest background={background} text={text} />

      <div css={{ display: "flex" }}>
        <div css={{ marginRight: 20 }}>
          <h3>Background Color:</h3>
          <ChromePicker
            color={background}
            onChangeComplete={({ hex }) => setBackground(hex)}
          />
        </div>

        <div>
          <h3>Text Color:</h3>
          <ChromePicker
            color={text}
            onChangeComplete={({ hex }) => setText(hex)}
          />
        </div>
      </div>
    </div>
  )
}

export default App
