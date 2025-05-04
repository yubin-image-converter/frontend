# -------- Stage 1: 빌드 --------
FROM node:18-alpine AS builder

# 앱 디렉터리 설정
WORKDIR /app

# package.json, lock 파일 먼저 복사 → 캐시 활용
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm ci

# 소스 복사
COPY . .

# 빌드 (dist 폴더 생성)
RUN npm run build

# -------- Stage 2: NGINX로 서빙 --------
FROM nginx:stable-alpine

# 빌드 결과물을 nginx html root로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# (선택) 커스텀 nginx 설정이 있으면 아래처럼 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 컨테이너 포트
EXPOSE 80

# 기본 커맨드
CMD ["nginx", "-g", "daemon off;"]
