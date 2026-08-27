Place your TLS certificate here before running the production stack:

- `cert.pem` - the certificate chain
- `key.pem` - the private key

Example with Let's Encrypt:

```
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem docker/nginx/ssl/cert.pem
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem docker/nginx/ssl/key.pem
```

The `docker-compose.prod.yml` mounts this folder read-only at `/etc/nginx/ssl`.