import http from 'http';

const PORT = process.env.PORT;

export function createHttpServer(app: http.RequestListener): void {
    http.createServer(app).listen(PORT);

    console.log('Server now listening');
}
