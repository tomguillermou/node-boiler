import { createExpressApp } from './app';
import { connectMongo } from './database';
import { createHttpServer } from './server';

async function main(): Promise<void> {
    try {
        await connectMongo();

        const app = createExpressApp();
        createHttpServer(app);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

main();
