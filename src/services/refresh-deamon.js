// const trophyService = require("~/services/TrophyService");

await trophyService.refresh();

setInterval(async () => {
  await trophyService.refresh();
}, 60 * 60 * 24 * 7 * 1000);
