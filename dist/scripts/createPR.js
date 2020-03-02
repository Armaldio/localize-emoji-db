"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var github_api_1 = tslib_1.__importDefault(require("github-api"));
var createPR = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var gh, repo, pr, e_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gh = new github_api_1.default({
                    token: process.env.GH_TOKEN
                });
                repo = gh.getRepo('Armaldio', 'localize-emoji-db');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, repo.createPullRequest({
                        "title": "Updates",
                        "body": "Changes ready",
                        "head": "updates",
                        "base": "master"
                    })];
            case 2:
                pr = _a.sent();
                return [3, 4];
            case 3:
                e_1 = _a.sent();
                console.error(e_1);
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
createPR().then(function () {
    console.log('done.');
});
//# sourceMappingURL=createPR.js.map