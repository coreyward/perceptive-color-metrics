/** @jsx jsx */
import { useState } from "react"
import ReactDOM from "react-dom"
import { jsx, Global } from "@emotion/core"
import { ChromePicker } from "react-color"
import {
  deltaE,
  perceptiveLuminance,
  wcagContrastRatio,
} from "./colorFunctions"

const simpleRound = v => Math.round(100 * v) / 100

const perceptiveDelta = (a, b) =>
  Math.abs(simpleRound(perceptiveLuminance(a) - perceptiveLuminance(b)))

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

const ContrastTest = ({ background, text }) => (
  <div css={{ marginBottom: 20 }}>
    <ContrastSwatch
      background={background}
      text={text}
      css={{ paddingBottom: 20 }}
    />
    <ContrastSwatch
      background={background}
      text="#fff"
      css={{ paddingTop: 20, paddingBottom: 20 }}
    />
    <ContrastSwatch
      background={background}
      text="#000"
      css={{ paddingTop: 20 }}
    />
  </div>
)

const ContrastSwatch = ({ background, text, className }) => (
  <div css={{ display: "flex", alignItems: "center" }}>
    <div
      css={{
        background,
        color: text,
        padding: 30,
        width: 100,
        textAlign: "center",
      }}
      className={className}
    >
      Example
    </div>

    <Metrics
      deltaE={Math.floor(deltaE(background, text))}
      plDelta={perceptiveDelta(background, text) * 100}
      contrast={Math.floor(wcagContrastRatio(background, text) * 100) / 100}
    />
  </div>
)

const Metrics = ({ deltaE, plDelta, contrast }) => (
  <div
    css={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 130px)",
      marginLeft: 20,
    }}
  >
    <Metric label="CR">{contrast} : 1</Metric>
    <Metric label="∆E*">{deltaE}%</Metric>
    <Metric label="PL∆">{plDelta}%</Metric>
  </div>
)

const Metric = ({ label, children }) => (
  <div
    css={{
      textAlign: "center",
      marginLeft: 20,
      fontFeatureSettings: "'case' 1, 'ss01' 1",
    }}
  >
    <div>{children}</div>
    <Label>{label}</Label>
  </div>
)

const Label = props => (
  <div
    css={{
      fontSize: 13,
      color: "#7E7E7E",
      letterSpacing: "0.06em",
      marginTop: 5,
    }}
    {...props}
  />
)

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
