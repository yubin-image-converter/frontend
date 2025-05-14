# 1단계: 빌드용 스테이지
FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# 2단계: nginx로 정적 파일 서빙
FROM nginx:alpine

# 빌드된 파일을 nginx 디렉토리로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 사용자 정의 nginx 설정이 있다면 덮어쓰기
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
