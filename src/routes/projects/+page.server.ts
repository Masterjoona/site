import { GITHUB_TOKEN } from "$env/static/private";
import type { PageServerLoad } from "./$types";

import { createAsyncCache } from "$lib/util";

async function getPluginInfo(repoUrl: string): Promise<[string, string, string]> {
    function buildRawUrl(file: string) {
        return repoUrl
            .replace("https://github.com/", "https://raw.githubusercontent.com/")
            .replace(/\/$/, "") + `/refs/heads/main/${file}`;
    }

    const filesToTry = ["index.ts", "index.tsx"];
    for (const file of filesToTry) {
        const rawUrl = buildRawUrl(file);
        if (!rawUrl) continue;
        const resp = await fetch(rawUrl, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
        });
        if (resp.ok) {
            const content = await resp.text();
            const match = content.match(/export default definePlugin\({\s*name: ?"(.+?)",.+?description: ?"(.+?)",/s);
            const readmeResp = await fetch(buildRawUrl("README.md"), {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    "Content-Type": "application/json",
                },
            });

            if (!readmeResp.ok) {
                return ["unknown plugin", "no description", "no readme"];
            }

            if (match && match[1] && match[2]) {
                return [match[1], match[2], await readmeResp.text()];
            }
        }
    }
    console.error(`oh no ${repoUrl}`);
    return ["unknown plugin", "no description", "no readme"];
}

const getPublicPluginRepos = createAsyncCache(async () => {
    const resp = await fetch("https://api.github.com/user/repos?visibility=public", {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
    });

    if (!resp.ok) {
        console.error("not good:", await resp.text());
        return [];
    }

    const repos = await resp.json();
    return (await Promise.all(
        repos
            .filter((repo: any) => repo.name.startsWith("vc-") && !repo.fork)
            .map(async (repo: any) => {
                const [name, description, readme] = await getPluginInfo(repo.html_url);
                return {
                    name,
                    description,
                    readme,
                    source: repo.html_url,
                    stars: repo.stargazers_count,
                };
            })
    )) as { name: string; description: string; readme: string; source: string; stars: number }[];
}, 6 * 60 * 60 * 1000)

export const load: PageServerLoad = async () => {
    const repos = await getPublicPluginRepos();
    if (!repos || repos.length === 0) {
        return { pluginRepos: [] };
    }
    repos.sort((a, b) => b.stars - a.stars);
    return { pluginRepos: repos };
};
