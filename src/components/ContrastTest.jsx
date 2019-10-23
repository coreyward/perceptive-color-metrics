import React from "react"
import PropTypes from "prop-types"
import { deltaE as computeDeltaE, wcagContrastRatio } from "lib/colorFunctions"

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

    <Metrics a={background} b={text} />
  </div>
)

const Metrics = ({ a, b }) => {
  const contrast = Math.floor(wcagContrastRatio(a, b) * 100) / 100
  const deltaE = Math.floor(computeDeltaE(a, b))

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 130px)",
        justifyItems: "center",
        marginLeft: 20,
      }}
    >
      <Metric label="W3C Ratio" satisfied={contrast >= 4.5}>
        {contrast} : 1
      </Metric>
      <Metric label="CIE ∆E*" satisfied={deltaE > 50}>
        {deltaE}%
      </Metric>
    </div>
  )
}

const Metric = ({ label, satisfied, children }) => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      fontFeatureSettings: "'case' 1, 'ss01' 1",
    }}
  >
    <div css={{ width: 16, marginRight: 8 }}>
      {satisfied ? <PassIcon /> : <FailIcon />}
    </div>
    <div>
      <div>{children}</div>
      <Label>{label}</Label>
    </div>
  </div>
)

const Label = props => (
  <div
    css={{
      fontSize: 11,
      color: "#7E7E7E",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginTop: 5,
    }}
    {...props}
  />
)

const PassIcon = () => (
  <svg viewBox="0 0 38 32" fill="none">
    <path d="M1 19.5L13 29.5L36 1" stroke="#11E365" strokeWidth="3" />
  </svg>
)

const FailIcon = () => (
  <svg viewBox="0 0 30 30" fill="none">
    <path
      d="M2 2L15 15M28 28L15 15M15 15L28 2M15 15L2 28"
      stroke="#DA0505"
      strokeWidth="3"
    />
  </svg>
)
