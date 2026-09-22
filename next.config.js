/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // CSS 를 <style> 로 HTML 에 인라인해 렌더 차단 요청(CSS 2~3개, 모바일 약 300ms)을 없앤다
    inlineCss: true,
  },
}

module.exports = nextConfig
