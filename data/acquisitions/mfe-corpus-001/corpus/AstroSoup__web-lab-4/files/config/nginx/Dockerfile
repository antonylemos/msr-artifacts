FROM nginx:latest

COPY config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY config/nginx/certs /etc/nginx/certs
COPY frontend/vite/host/dist usr/share/nginx/html/host
COPY frontend/vite/remote-inputs/dist usr/share/nginx/html/remote-inputs
COPY frontend/vite/remote-results/dist usr/share/nginx/html/remote-results


EXPOSE 80 443

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]