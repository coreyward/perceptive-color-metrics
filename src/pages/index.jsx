import React, { useState } from "react"
import { Global } from "@emotion/core"
import { ChromePicker } from "react-color"
import ContrastTest from "components/ContrastTest"

const App = () => {
  const [background, setBackground] = useState("#0075FF")
  const [text, setText] = useState("#FF3333")

  return (
    <div>
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

      <div>
        <h3>More Information</h3>

        <dl>
          <dt>CR</dt>
          <dd>
            the <i>contrast ratio</i> as determined by following the{" "}
            <a
              href="https://www.w3.org/TR/WCAG20/#contrast-ratiodef"
              target="_blank"
              rel="noopener noreferrer"
            >
              WCAG 2.0 specifications
            </a>
          </dd>
          <dt>PL∆</dt>
          <dd>
            the <i>perceptive luminance delta</i> as computed by a simpler
            approach that is found around the web
          </dd>
          <dt>∆E*</dt>
          <dd>
            (sometimes called <i>delta E</i>), this shows the difference between
            the colors as computed by{" "}
            <a
              href="https://en.wikipedia.org/wiki/Color_difference#CIEDE2000"
              target="_blank"
              rel="noopener noreferrer"
            >
              CIE DE 2000
            </a>
          </dd>
        </dl>
      </div>
    </div>
  )
}

export default App
