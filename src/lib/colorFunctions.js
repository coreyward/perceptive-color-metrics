export const shade = (rgb, i) =>
  rgbToHex(normalizeRgb(rgb).map(v => v * (1 - 0.01 * i)))

export const tint = (rgb, i) =>
  rgbToHex(normalizeRgb(rgb).map(v => v + (255 - v) * i * 0.01))

export const mix = (base, blend, weight = 50) => {
  base = normalizeRgb(base)
  blend = normalizeRgb(blend)

  return rgbToHex(
    base.map((baseValue, i) => {
      const blendValue = blend[i]
      return clamp(
        Math.round(baseValue + (blendValue - baseValue) * (weight / 100)),
        0,
        255
      )
    })
  )
}

const normalizeRgb = value => {
  if (typeof value === "string" && value.startsWith("#")) {
    value = hexToRgb(value)
  }

  if (typeof value === "string" && value.startsWith("rgb")) {
    value = parseRgbString(value)
  }

  return value
}

export const parseRgbString = rgb =>
  /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})/
    .exec(rgb)
    .slice(1)
    .map(v => parseInt(v, 10))

export const intToHex = rgbint =>
  Math.min(Math.max(Math.round(rgbint), 0), 255)
    .toString(16)
    .padStart(2, "0")

export const rgbToHex = rgb =>
  "#" +
  normalizeRgb(rgb)
    .map(v => intToHex(v))
    .join("")

export const hexToRgb = (hex, alpha) => {
  const color = +("0x" + hex.slice(1).replace(hex.length < 5 && /./g, "$&$&"))
  const r = color >> 16
  const g = (color >> 8) & 255
  const b = color & 255

  return typeof alpha === "number"
    ? `rgba(${r}, ${g}, ${b}, ${alpha})`
    : `rgb(${r}, ${g}, ${b})`
}

export const bt601Luminance = rgb => {
  const [r, g, b] = normalizeRgb(rgb)
  return 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

export const bt709Luminance = rgb => {
  const [r, g, b] = linearizeRgb(rgb)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const wcagContrastRatio = (rgbA, rgbB) =>
  contrastRatio(bt709Luminance(rgbA), bt709Luminance(rgbB))

export const contrastRatio = (lumA, lumB) => {
  const [dark, light] = [lumA, lumB].sort()
  return (light + 0.05) / (dark + 0.05)
}

export const deltaE = (rgbA, rgbB) => {
  let labA = rgbToLab(normalizeRgb(rgbA))
  let labB = rgbToLab(normalizeRgb(rgbB))
  let deltaL = labA[0] - labB[0]
  let deltaA = labA[1] - labB[1]
  let deltaB = labA[2] - labB[2]
  let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2])
  let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2])
  let deltaC = c1 - c2
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH)
  let sc = 1.0 + 0.045 * c1
  let sh = 1.0 + 0.015 * c1
  let deltaLKlsl = deltaL / 1.0
  let deltaCkcsc = deltaC / sc
  let deltaHkhsh = deltaH / sh
  let i =
    deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh

  return i < 0 ? 0 : Math.sqrt(i)
}

export const rgbToLab = rgb => {
  let [r, g, b] = rgb.map(int => int / 255)
  let x, y, z

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)]
}

export const linearizeRgb = rgb =>
  normalizeRgb(rgb).map(value =>
    value <= 10.0164
      ? value / 3294.6
      : Math.pow((value / 255 + 0.055) / 1.055, 2.4)
  )

const clamp = (val, min, max) => Math.min(Math.max(min, val), max)
