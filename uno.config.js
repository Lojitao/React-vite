// uno.config.ts
import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';
// import { presetWind } from 'unocss';
export default defineConfig({
  presets: [
    //presetWind(), // 使用 Tailwind 风格的预设
    presetUno(), // 基础的原子化CSS预设
    presetAttributify(), // 可选：支持属性模式 (e.g., <div text="sm white" />)
    presetIcons(), // 可选：支持图标
  ],
});