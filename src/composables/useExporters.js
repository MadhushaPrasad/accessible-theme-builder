export function toCssVars(palette, prefix='primary'){
  let out = `:root{\n`
  Object.entries(palette).forEach(([k,v])=> out += `  --${prefix}-${k}: ${v};\n`)
  return out + '}'
}
export function toScssMap(palette, name='primary'){
  return `$${name}: (\n` + Object.entries(palette).map(([k,v])=>`  ${k}: ${v},`).join('\n') + `\n);`
}
export function toTailwind(palette, name='primary'){
  const obj = Object.fromEntries(Object.entries(palette))
  return `module.exports = { theme: { extend: { colors: { ${name}: ${JSON.stringify(obj)} } } } }`
}
export function toUnoConfig(palette, name='primary'){ return `export default { theme: { colors: { ${name}: ${JSON.stringify(palette)} } } }` }
