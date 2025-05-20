import { json, type RequestEvent } from "@sveltejs/kit";

const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const numbers = "0123456789";

const makeRandStrFunc = (chars: string) => {
    return (length: number) => {
        return Array.from(
            { length },
            () =>
                chars[Math.floor(Math.random() * chars.length)]
        ).join("");
    }
}

const randStrSpecialChars = makeRandStrFunc(chars + numbers + specialChars)
const randStr = makeRandStrFunc(chars + numbers)
const randNum = makeRandStrFunc(numbers)


export function GET(event: RequestEvent) {
    return json(
        {
            WEBHOOK:
                `https://discord.com/api/v10/webhooks/${randNum(18)}/${randStr(68)}`,
            GITHUB_TOKEN:
                `ghp_${randStr(36)}`,
            SSH_SERVER_IP: event.request.headers.get("X-Real-IP") || event.request.headers.get("CF-Connecting-IP"),
            SSH_SERVER_PORT: Math.floor(Math.random() * 1000),
            SSH_USERNAME: "root",
            SSH_PASSWORD: randStrSpecialChars(43),
        }
    );
}
