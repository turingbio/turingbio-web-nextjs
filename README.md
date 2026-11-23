# 튜링바이오 사이트 리뉴얼

튜링바이오의 국문·영문 원페이지 회사 소개 사이트를 개발하는 저장소다. CRM, 생성형 AI·RAG, 회사 이력과 프로젝트를 소개한다.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Tech Stack

| 영역   | 구현 기준                                      |
| ------ | ---------------------------------------------- |
| 앱     | Next.js App Router, TypeScript, 정적 출력      |
| 스타일 | CSS Modules, CSS 변수                          |
| 언어   | `/ko/`, `/en/`                                 |
| 운영   | Cloudflare Pages Free, 가비아 도메인 등록 유지 |

초기화 후에는 저장소에 고정한 Node.js 버전에서 `npm ci`로 설치하고 `npm run dev`로 실행한다. `npm run build`의 배포 산출물은 `out/`이다.

## 버전 기록

| 버전 | 날짜   | 비고                              |
| ---- | ------ | --------------------------------- |
| v1.0 | 261119 | 1차 기획 및 디자인 시안 작업 완료 |

## 문서

- [디자인](https://www.figma.com/design/pJNva0ms75DrjHCgHWKYFZ/Untitled?node-id=245-575): Figma v1.0 섹션(국문·영문 × 데스크톱·모바일)
- [국문·영문 문구 데이터](i18n-ko-en.json) — Figma에서 추출한 초안. 변경된 문구는 최신 시안과 대조한다.

## Deploy

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
