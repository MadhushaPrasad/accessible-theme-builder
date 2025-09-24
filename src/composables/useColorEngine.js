import chroma from 'chroma-js'

export function hexToRgb(hex){
  hex = hex.replace('#','')
  if(hex.length === 3) hex = hex.split('').map(c => c+c).join('')
  const int = parseInt(hex,16)
  return { r: (int>>16)&255, g: (int>>8)&255, b: int&255 }
}
function srgbToLinear(v){ v = v/255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4) }

export function luminance(hex){
  const {r,g,b} = hexToRgb(hex)
  return 0.2126*srgbToLinear(r) + 0.7152*srgbToLinear(g) + 0.0722*srgbToLinear(b)
}

export function contrastRatio(hexA, hexB){
  const L1 = luminance(hexA), L2 = luminance(hexB)
  const lighter = Math.max(L1,L2), darker = Math.min(L1,L2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function bestTextColor(backgroundHex, threshold=4.5){
  const black = contrastRatio(backgroundHex, '#000000')
  const white = contrastRatio(backgroundHex, '#ffffff')
  if (black >= threshold && black >= white) return '#000000'
  if (white >= threshold) return '#ffffff'
  return black > white ? '#000000' : '#ffffff'
}

export function generateShades(base, count = 9){
  // returns array from light->dark
  const scale = chroma.scale(['white', base, 'black']).mode('lab').colors(count)
  // map to 50..900
  const keys = [50,100,200,300,400,500,600,700,800,900].slice(0, scale.length)
  const obj = {}
  keys.forEach((k,i)=> obj[k]= scale[i])
  return obj
}

// helper: set CSS vars on :root
export function applyCssVars(palette, prefix='primary'){
  const root = document.documentElement
  Object.entries(palette).forEach(([k,v])=>{
    root.style.setProperty(`--${prefix}-${k}`, v)
  })
}
