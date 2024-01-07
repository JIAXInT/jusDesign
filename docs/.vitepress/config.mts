import { defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';
import {
  containerPreview,
  componentPreview,
} from '@vitepress-demo-preview/plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'JusDesign',
  description: '适用于vue的组件库',
  // srcDir: 'components',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
      },
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '开始使用', link: '/components/button' },
    ],

    sidebar: [
      {
        text: '基础组件',
        items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Input 输入框', link: '/components/input' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JIAXInT/jusDesign' },
    ],
  },
});
