# Frontend

이 프로젝트는 React와 Vite를 기반으로 개발된 프론트엔드 애플리케이션입니다. 사용자는 이미지를 업로드하고 ASCII 아트로 변환된 결과를 실시간으로 확인할 수 있으며, 변환이 완료되면 다운로드 링크를 통해 결과를 저장할 수 있습니다.


---

## Links
<p>
  <a href="https://image-converter.yubinshin.com/" target="_blank">
    <img src="https://github.com/user-attachments/assets/6662efe8-3793-4128-aaf0-39d46b08a67e" width="600" alt="Image Converter Thumbnail" />
  </a>
</p>


- View Live Demo: [https://image-converter.yubinshin.com/](https://image-converter.yubinshin.com/)
- Architecture Overview: [Project README](https://github.com/yubin-image-converter)

---


## Tech Stack

* **React (TypeScript)**: SPA 기반 사용자 인터페이스
* **Vite**: 빠른 번들링과 핫리로딩
* **Tailwind CSS**: 유틸리티 기반 스타일링
* **Jotai**: 전역 상태 관리
* **Socket.IO**: 실시간 변환 상태 수신
* **Radix UI**: 접근성과 스타일을 고려한 UI 컴포넌트
* **Sonner**: 커스터마이징 가능한 토스트 알림

---

## Features

* 이미지 업로드 및 50MB 제한 설정
* 변환 요청 진행 상황(Progress Bar) 실시간 표시
* 변환 완료 시 ASCII 아트 프리뷰 및 다운로드
* WebSocket을 통한 실시간 처리 상태 업데이트
* 로그인 상태에 따라 UI 조건부 렌더링 (Google OAuth 기반)
* ASCII 아트 렌더링 중 Typewriter 효과 제공
* 워커(백엔드) 상태 패널 UI
* ASCII 아트 렌더링 - fetch를 통해 .txt 파일을 불러와 직접 렌더링
* 로그인 상태 및 요청 상태 등 주요 상태는 Jotai atom으로 구성되어 전역에서 공유 및 제어됨
* 워커 상태 패널은 API 서버로 주기적인 HTTP polling을 통해 각 워커의 연결 여부를 갱신함(구현 예정)

---

## Directory Structure

```sh
src/
├── app/                 # App 컴포넌트 및 프로바이더 모듈
├── components/ui/       # 재사용 가능한 UI 컴포넌트 (Button, Dialog 등)
├── features/            # 도메인 단위 기능 (askii-convert, auth)
├── shared/              # 공통 훅, 컴포넌트, 컨텍스트, store, lib 등
├── types/               # 전역 타입 선언
├── utils/               # 유틸 함수 모음
├── hooks/               # 전역 훅
└── main.tsx             # 앱 진입점
```

---

## Build & Run

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

---

## Deployment

* `vite.config.ts`를 기반으로 빌드 후 `dist/` 폴더를 Nginx에서 정적 서빙
* `nginx.conf` 포함되어 있음

---

## Etc

* 이 프로젝트는 전체 인프라가 Kubernetes 환경에서 GitOps 방식으로 운영됩니다.
* WebSocket 서버, 인증 서버, API 서버는 각각 독립된 마이크로서비스로 구성되어 있으며, 이 프론트엔드는 그들과 통신하는 역할을 수행합니다.
* 환경변수는 Vite의 `.env` 형식을 따릅니다.

---

## Configuration
```env
VITE_API_SERVER_URL=https://api.example.com
VITE_AUTHENTICATION_SERVER_URL=https://auth.example.com
VITE_SOCKET_SERVER_URL=wss://ws.example.com
VITE_GOOGLE_CLIENT_ID=...
```
