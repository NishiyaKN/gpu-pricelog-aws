# Use the official Nginx image from Docker Hub
FROM nginx:alpine

# Copy static website files (excluding JSON files)
COPY index.html /usr/share/nginx/html/
COPY grafico.html /usr/share/nginx/html/
COPY grafico.js /usr/share/nginx/html/
COPY estilo.css /usr/share/nginx/html/
COPY login.css /usr/share/nginx/html/
COPY login.js /usr/share/nginx/html/
COPY pe.jpg /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
