import React from "react"
import PropTypes from "prop-types"
import {
  deltaE,
  wcagContrastRatio,
  perceptiveLuminance,
} from "lib/colorFunctions"

const perceptiveDelta = (a, b) =>
  Math.round(Math.abs(perceptiveLuminance(a) - perceptiveLuminance(b)) * 100)

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

export default ContrastTest

ContrastTest.propTypes = {
  background: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

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
      plDelta={perceptiveDelta(background, text)}
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
