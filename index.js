import { Octokit } from "@octokit/rest";

const [option, token] = process.argv.slice(2);

if ((option != "-t" && option != "--token") || !token) {
  console.log("node index.js (-t|--token) <token>");
  process.exit();
}

const octokit = new Octokit({
  auth: token,
});

(async () => {
  const messages = (
    await Promise.all(
      (
        await octokit.rest.search.repos({
          // スターの数が 10,000 個より多く、アーカイブされていないリポジトリ
          q: "stars:>10000 archived:false",

          sort: "stars",
          order: "desc",
          per_page: 100,
        })
      ).data.items
        // 言語が検出されていないリポジトリを除外する
        .filter((repo) => repo.language)

        .map(async ({ owner, name }) =>
          (
            await octokit.rest.repos.listCommits({
              owner: owner.login,
              repo: name,
              per_page: 100,
            })
          ).data
            .filter(
              ({ commit }) =>
                // オーサーがボットのコミットを除外する
                commit.author.name != "bors" &&
                commit.author.name != "dependabot[bot]" &&
                commit.author.name != "engine-flutter-autoroll"
            )
            .map(({ commit }) => commit.message.split(/\r?\n/)[0].trim())
            .filter(
              (message) =>
                // 単語が 1 つのメッセージを除外する
                message.indexOf(" ") >= 0 &&

                // 特定の文字列で始まるメッセージを除外する
                !message.startsWith("->") &&
                !message.startsWith("Merge") &&
                !message.startsWith("Revert") &&

                // ASCII 文字と絵文字以外が含まれているメッセージを除外する
                !/[^\u{00}-\u{7F}\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25B6}\u{23F8}-\u{23FA}\u{200D}]/u.test(
                  message
                )
            )
        )
    )
  ).flat();

  for (const message of messages) {
    console.log(message);
  }
})();
